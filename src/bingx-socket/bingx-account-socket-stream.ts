import { ReplaySubject, Subject } from 'rxjs';
import { AccountInterface } from '@app/bingx/account/account.interface';
import {
  BingxGenerateListenKeyEndpoint,
  HttpRequestExecutor,
  pong,
  RequestExecutorInterface,
} from '@app/bingx';
import { webSocket } from 'rxjs/webSocket';
import { BingxWebsocketDeserializer } from '@app/bingx-socket/bingx-websocket-deserializer';
import { BingxWebsocketSerializer } from '@app/bingx-socket/bingx-websocket-serializer';
import { HeartbeatInterface } from '@app/bingx-socket/interfaces/heartbeat.interface';

export class BingxAccountSocketStream {
  public readonly onConnect$ = new Subject();
  public readonly onDisconnect$ = new Subject();
  public readonly heartbeat$ = new ReplaySubject<HeartbeatInterface>(1);

  constructor(
    private readonly account: AccountInterface,
    private readonly requestExecutor: RequestExecutorInterface = new HttpRequestExecutor(),
  ) {
    this.connect(this.account, this.requestExecutor);
  }

  private async connect(
    account: AccountInterface,
    requestExecutor: RequestExecutorInterface,
  ): Promise<void> {
    const {
      data: { listenKey },
    } = await requestExecutor.execute(
      new BingxGenerateListenKeyEndpoint(account),
    );

    const url = new URL('/swap-market', 'wss://open-api-swap.bingx.com');
    url.searchParams.set('listenKey', listenKey);

    const socket$ = webSocket({
      ...new BingxWebsocketDeserializer(),
      ...new BingxWebsocketSerializer(),
      url: url.toString(),
      WebSocketCtor: WebSocket,
      openObserver: this.onConnect$,
      closeObserver: this.onDisconnect$,
    });

    socket$.pipe(pong(socket$, this.heartbeat$)).subscribe();
  }
}

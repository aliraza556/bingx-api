### Bingx API NodeJS Client
This library implements [Bingx API](https://bingx-api.github.io/docs/#/swapV2/introduce) for nodejs applications

### Getting started
* Install via npm
```shell
npm i bingx-api -S
```
* Initialize Client
```shell
import { ApiAccount, BingxApiClient } from 'bingx-api';
const account = new ApiAccount('xxx', 'xxx');

const client = new BingxApiClient();
```

* Make any requests from api to bingx
```shell
const userBalance = await client
                  .getAccountService()
                  .getPerpetualSwapAccountAssetInformation();
```

### Features supports

* Account Interface
    - [x] Get Perpetual Swap Account Asset Information
    - [x] Perpetual Swap Positions
    - [ ] Get Account Profit and Loss Fund Flow
    - [ ] Export fund flow
    - [ ] User fee rate
* Trade Interface
    - [ ] Trade order test
    - [x] Trade order
    - [ ] Bulk order
    - [x] One-Click Close All Positions
    - [ ] Cancel an Order
    - [ ] Cancel a Batch of Orders
    - [ ] Cancel All Orders
    - [ ] Query all current pending orders
    - [ ] Query Order
    - [ ] Query Margin Mode
    - [ ] Switch Margin Mode
    - [ ] Query Leverage
    - [ ] Switch Leverage
    - [ ] User's Force Orders
    - [ ] User's History Orders
    - [ ] Adjust isolated margin
    - [ ] Query historical transaction orders
* Listen Key
    - [x] Generate Listen Key
    - [ ] Extend Listen Key Validity period
    - [ ] Delete Listen Key
* Socket API
    * Market Data
        - [ ] Subscribe Market Depth Data
        - [ ] Subscribe the Latest Trade Detail
        - [ ] Subscribe K-Line Data
    * Account Data
        - [ ] Listen Key expired push
        - [ ] Account balance and position update push
        - [ ] Order update push
        - [ ] Configuration updates such as leverage and margin mode

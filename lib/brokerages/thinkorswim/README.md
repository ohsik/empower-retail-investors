## Thinkorswim Stocks and Options data format:

```
 [
   {
       "session": "NORMAL",
       "duration": "DAY",
       "orderType": "LIMIT",
       "complexOrderStrategyType": "NONE",
       "quantity": 2,
       "filledQuantity": 2,
       "remainingQuantity": 0,
       "requestedDestination": "AUTO",
       "destinationLinkName": "SIGQ",
       "price": 0.24,
       "orderLegCollection": [
           {
               "orderLegType": "OPTION",
               "legId": 1,
               "instrument": {
                   "assetType": "OPTION",
                   "cusip": "0CGC..AH50000500",
                   "symbol": "CGC_011725C.5",
                   "description": "CGC Jan 17 2025 0.5 Call",
                   "type": "VANILLA",
                   "putCall": "CALL",
                   "underlyingSymbol": "CGC"
               },
               "instruction": "SELL_TO_CLOSE",
               "positionEffect": "CLOSING",
               "quantity": 2
           }
       ],
       "orderStrategyType": "SINGLE",
       "orderId": 11261793242,
       "cancelable": false,
       "editable": false,
       "status": "FILLED",
       "enteredTime": "2023-07-17T17:01:23+0000",
       "closeTime": "2023-07-17T17:13:41+0000",
       "tag": "API_TOS:SGW:TOSWeb",
       "accountId": <ACCOUNT_ID>,
       "orderActivityCollection": [
           {
               "activityType": "EXECUTION",
               "activityId": 57719560263,
               "executionType": "FILL",
               "quantity": 2,
               "orderRemainingQuantity": 0,
               "executionLegs": [
                   {
                       "legId": 1,
                       "quantity": 2,
                       "mismarkedQuantity": 0,
                       "price": 0.24,
                       "time": "2023-07-17T17:13:41+0000"
                   }
               ]
           }
       ]
   },
   {
       "session": "NORMAL",
       "duration": "DAY",
       "orderType": "LIMIT",
       "complexOrderStrategyType": "NONE",
       "quantity": 2,
       "filledQuantity": 2,
       "remainingQuantity": 0,
       "requestedDestination": "AUTO",
       "destinationLinkName": "CDRG",
       "price": 0.23,
       "orderLegCollection": [
           {
               "orderLegType": "OPTION",
               "legId": 1,
               "instrument": {
                   "assetType": "OPTION",
                   "cusip": "0CGC..AH50000500",
                   "symbol": "CGC_011725C.5",
                   "description": "CGC Jan 17 2025 0.5 Call",
                   "type": "VANILLA",
                   "putCall": "CALL",
                   "underlyingSymbol": "CGC"
               },
               "instruction": "BUY_TO_OPEN",
               "positionEffect": "OPENING",
               "quantity": 2
           }
       ],
       "orderStrategyType": "SINGLE",
       "orderId": 11258341301,
       "cancelable": false,
       "editable": false,
       "status": "FILLED",
       "enteredTime": "2023-07-17T14:12:35+0000",
       "closeTime": "2023-07-17T14:12:36+0000",
       "tag": "API_TOS:IPHONE",
       "accountId": <ACCOUNT_ID>,
       "orderActivityCollection": [
           {
               "activityType": "EXECUTION",
               "activityId": 57704930230,
               "executionType": "FILL",
               "quantity": 1,
               "orderRemainingQuantity": 0,
               "executionLegs": [
                   {
                       "legId": 1,
                       "quantity": 1,
                       "mismarkedQuantity": 0,
                       "price": 0.23,
                       "time": "2023-07-17T14:12:36+0000"
                   }
               ]
           },
           {
               "activityType": "EXECUTION",
               "activityId": 57704930228,
               "executionType": "FILL",
               "quantity": 1,
               "orderRemainingQuantity": 1,
               "executionLegs": [
                   {
                       "legId": 1,
                       "quantity": 1,
                       "mismarkedQuantity": 0,
                       "price": 0.23,
                       "time": "2023-07-17T14:12:36+0000"
                   }
               ]
           }
       ]
   },
   {
       "session": "NORMAL",
       "duration": "DAY",
       "orderType": "LIMIT",
       "complexOrderStrategyType": "NONE",
       "quantity": 100,
       "filledQuantity": 100,
       "remainingQuantity": 0,
       "requestedDestination": "AUTO",
       "destinationLinkName": "NITE",
       "price": 0.4533,
       "orderLegCollection": [
           {
               "orderLegType": "EQUITY",
               "legId": 1,
               "instrument": {
                   "assetType": "EQUITY",
                   "cusip": "138035100",
                   "symbol": "CGC"
               },
               "instruction": "BUY",
               "positionEffect": "OPENING",
               "quantity": 100
           }
       ],
       "orderStrategyType": "SINGLE",
       "orderId": 11207568346,
       "cancelable": false,
       "editable": false,
       "status": "FILLED",
       "enteredTime": "2023-07-10T15:34:41+0000",
       "closeTime": "2023-07-10T15:49:57+0000",
       "tag": "API_TOS:SGW:TOSWeb",
       "accountId": <ACCOUNT_ID>,
       "orderActivityCollection": [
           {
               "activityType": "EXECUTION",
               "activityId": 57484029730,
               "executionType": "FILL",
               "quantity": 100,
               "orderRemainingQuantity": 0,
               "executionLegs": [
                   {
                       "legId": 1,
                       "quantity": 100,
                       "mismarkedQuantity": 0,
                       "price": 0.4533,
                       "time": "2023-07-10T15:49:57+0000"
                   }
               ]
           }
       ]
   }
 ]
 ```
# Robinhood API and Data structure
```
/lib
  /brokerages
    /robinhood
      endpoints.ts
      index.ts
    /webull
  README.md
  index.ts
    ...
```

- `endpoints.ts` file contains all neccessary endpoints for the brokerage.
- `const GET_AUTH_TOKEN_URLS` is needed to get header token to make http request. You will need to find URLs on the brokerage web app for this chrome extension to listen and grab authorization token. `i.g. export const GET_AUTH_TOKEN_URLS = ["https://api.robinhood.com/user/", "https://api.robinhood.com/accounts/"];`
- `BROKERAGES_URLS` will be used to get authorization token and make http requests to get trading history data

### Convert Robinhood trading data for Empower Retail Investor Reports
TBD

List of stock brockerages: `lib/consts/brokerages.ts`
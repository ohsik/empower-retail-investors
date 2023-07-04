# Robinhood API and Data structure
```
/lib
  /brokerages
    /robinhood
      ...
    /webull
      ...
    /<More_Brokerages_To_Come>
      ...
  README.md
  index.ts
    ...
```

- `endpoints.ts` file contains all neccessary endpoints for the brokerage.
- `const GET_AUTH_TOKEN_URLS` is needed to get header token to make http request. You will need to find URLs on the brokerage web app for this chrome extension to listen and grab authorization token. `i.g. export const GET_AUTH_TOKEN_URLS = ["https://api.robinhood.com/user/", "https://api.robinhood.com/accounts/"];` (This works on Robinhood but other brokerages have different ways to fetch data)
- `BROKERAGES_VARS` will be used to expose all enpoints and related functions to get data from brokerages
### Convert Robinhood trading data for Empower Retail Investor Reports
TBD

List of stock brockerages: `lib/consts/brokerages.ts`
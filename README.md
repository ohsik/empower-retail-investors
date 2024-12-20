![version](https://img.shields.io/badge/version-0.0.21-green.svg)

# 🚀 Empower retail investors
Empowering retail investors by providing them with the right tools is crucial for enabling their participation and success in financial markets.

**Chrome web store:** https://chromewebstore.google.com/detail/empower-retail-investors/jaaadkebnilhpenhmljnbegnfcpdgghk

## How it works
1. Chrome extension popup will sync data from your trading brokerages
2. Trading data will be saved in chrome storage
3. Saved local trading data will be converted to generic data structure
4. Trading reports will be generated from the converted data


## Run the app
1. Clone this repo and run `npm install`
2. Run `npm run dev` for development mode
3. Run `npm run build` to build the Chrome extension
4. Import /dist folder in the Chrome extension page

## Dev setup
**React / Typescript / Tailwind**


## Project file structure
This project is based on Webpack + React setup from https://www.youtube.com/watch?v=8OCEfOKzpAw


```
/lib
  /brokerages
  /consts
  /helpers
  /profit-loss-calculator
  /types
  /ui
/src
  /chrome-services
  /popup
    popup.html
    popup.tsx
  /dashboard
    ... // Main app componenets/routing
  app.html
  app.tsx
/public
  manifest.json // Chrome extension manifest
  /images
```

Empower retail investors is an open source project.
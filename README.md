![version](https://img.shields.io/badge/version-0.0.1-green.svg)

# 🚀 Empower retail investors
Empowering retail investors by providing them with the right tools is crucial for enabling their participation and success in financial markets.

## How it works
1. Chrome extension popup will sync data from your trading brockages
2. Trading data will be saved in chrome storage
3. Saved local trading data will be converted to generic data structure
4. Trading reports will be generated from the converted data


## Run the app
1. Clone this repo and run `npm install`
2. Run `npm run dev` for development mode
3. Run `npm run build` to build the Chrome extension
4. Import /dist folder in the Chrome extension page

## Dev setup
**Next js / Typescript / Tailwind**


## Dev issue
Content Security Policy (CSP), a security mechanism implemented by web browsers to mitigate certain types of attacks, such as cross-site scripting (XSS).


## Project file structure
This project is following Next v13 structure with;
- pages/popup for the Chrome extension popup window
- the main app/ will be the main report app

```
/src
  /chrome-services
  /popup
    popup.html
    popup.tsx
  app.html
  app.tsx
/public
  manifest.json // Chrome extension manifest
  /images
```

The build command will output chrome exrtension ready files to /out folder

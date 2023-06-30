import { BROKERAGES_URLS } from "../../lib/brokerages";
import { Brokerages, brokerageUrls } from "../../lib/consts/brokerages";
import { localAuthTokenName } from "../../lib/consts/local-storage-var";
/*
  background.ts listens to the active tab URL and defines currentBrokerage.
  currentBrokerage is used in popup.tsx to fetch data from the correct brokerage API.
*/
let currentTab;
let currentBrokerage: Brokerages | undefined;

// Function to get the current active tab
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// Find current brokerage from the current URL
function getCurrentBrokerage(currentUrl: string | null | undefined) {
  const currentBrokage = (Object.keys(brokerageUrls) as Array<keyof typeof brokerageUrls>).find(
    (brokerage) => currentUrl?.includes(brokerageUrls[brokerage])
  );
  return currentBrokage;
}

// Event listener for tab activation change
chrome.tabs.onActivated.addListener(async () => {
  currentTab = await getCurrentTab();
  currentBrokerage = getCurrentBrokerage(currentTab.url);
  console.log(currentTab.url, currentBrokerage);
});

// Event listener for tab URL change
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    currentTab = tab;
    currentBrokerage = getCurrentBrokerage(currentTab.url);
    console.log(currentTab.url, currentBrokerage);
  }
});

// Get the current active tab when the popup is opened
getCurrentTab().then(tab => {
  currentTab = tab;
  currentBrokerage = getCurrentBrokerage(currentTab.url);
  console.log(currentTab.url, currentBrokerage);
});


/*
  TODO: From here, this can be brokerage specific file. May need to move to different file.
  Only works with Robinhood for now. since it can grab authentication token from the request headers and use it to fetch data.

  Getting the authToken from the request headers.
  and storing it in the local storage.
  which will be used in popup.tsx to fetch data from the brokerage API.
*/
function getAuthToken(details: any){
  if(currentBrokerage) {
    const authHeader = details.requestHeaders?.filter((item: { name: string }) => item.name === 'Authorization');
    const authOrgin = details.requestHeaders?.filter((item: { name: string }) => item.name === 'Origin' || item.name === 'Referer');
    const isAuthOriginMatchesCurrentBrokerage = authOrgin[0] && authOrgin[0].value.includes(brokerageUrls[currentBrokerage]);

    if(authHeader && isAuthOriginMatchesCurrentBrokerage) {
      const authToken = authHeader[0] && authHeader[0].value;
      chrome.storage.local.set({ [localAuthTokenName(currentBrokerage)]: authToken })
    }
  }
}

// Grab authentication token from the request headers
chrome.webRequest.onBeforeSendHeaders.addListener(getAuthToken, 
  { 
    urls: currentBrokerage ? BROKERAGES_URLS[currentBrokerage]?.getAuthTokenUrls : [],
    types: ["xmlhttprequest"]
  },
  ["requestHeaders", "extraHeaders"]
);

// Listen to popup.tsx Syne Data button's message and send response back
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (message)=>  {
    if(message.FETCH_USER_DATA) {
      const authToken = await new Promise<string>((resolve) => {
        chrome.storage.local.get(localAuthTokenName(currentBrokerage), ({ [localAuthTokenName(currentBrokerage)]: authToken }) => {
          resolve(authToken);
        });
      });

      const reponse = currentBrokerage && await BROKERAGES_URLS[currentBrokerage]?.getUserData(currentBrokerage, authToken);

      if(reponse) {
        port.postMessage(reponse);
      }
    }
  });
});
  

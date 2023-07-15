import { BROKERAGES_VARS } from "../../lib/brokerages";
import { Brokerages, brokerageUrls } from "../../lib/consts/brokerages";
import { localAuthTokenName } from "../../lib/consts/local-storage-var";
import { getCurrentBrokerageFromURL } from "../../lib/helpers/get-current-brokerage-from-url";
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

// Event listener for tab activation change
chrome.tabs.onActivated.addListener(async () => {
  currentTab = await getCurrentTab();
  currentBrokerage = getCurrentBrokerageFromURL(currentTab?.url);
});

// Event listener for tab URL change
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    currentTab = tab;
    currentBrokerage = getCurrentBrokerageFromURL(currentTab?.url);
  }
});

// Get the current active tab when the popup is opened
getCurrentTab().then(tab => {
  currentTab = tab;
  currentBrokerage = getCurrentBrokerageFromURL(currentTab?.url);
});


/*
  ------------------------------------------------------------------------------------------
  TODO: This block of code is only apply to Robinhood for now. 
  Since it can grab authentication token from the request headers and use it to fetch data.

  📣 Use this if the brokerage does not save authToken in the session/local storage and consistently sends it in the request headers.

  Getting the authToken from the request headers.
  and storing it in the local storage.
  which will be used in popup.tsx to fetch data from the brokerage API.
*/

function getAuthToken(details: any) {
  if(currentBrokerage === 'robinhood') {
    const authHeader = details.requestHeaders?.filter((item: { name: string }) => item.name === 'Authorization');
    const authOrgin = details.requestHeaders?.filter((item: { name: string }) => item.name === 'Origin' || item.name === 'Referer');
    const isAuthOriginMatchesCurrentBrokerage = authOrgin[0] && authOrgin[0].value.includes(brokerageUrls[currentBrokerage as keyof typeof brokerageUrls]);

    if(authHeader && isAuthOriginMatchesCurrentBrokerage) {
      const authToken = authHeader[0] && authHeader[0].value;
      chrome.storage.local.set({ [localAuthTokenName(currentBrokerage)]: authToken })
    }
  }
}

// Grab authentication token from the request headers
chrome.webRequest.onBeforeSendHeaders.addListener(getAuthToken, 
  { 
    urls: currentBrokerage ? BROKERAGES_VARS[currentBrokerage]?.getAuthTokenUrls : [],
    types: ["xmlhttprequest"]
  },
  ["requestHeaders", "extraHeaders"]
);

/*
  Robinhood specific code ends here.
  ------------------------------------------------------------------------------------------
*/


// Listen to popup.tsx Syne Data button's message and send response back
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (message)=>  {
    if(message.FETCH_USER_DATA) {
      const authToken = await new Promise<string>((resolve) => {
        chrome.storage.local.get(localAuthTokenName(currentBrokerage), ({ [localAuthTokenName(currentBrokerage)]: authToken }) => {
          resolve(authToken);
        });
      });

      if(!authToken) {
        const error = {
          error: `${currentBrokerage} authToken is missing.`
        }
        port.postMessage(error);
      }

      // Make sure to define function name to "getUserData" in lib/brokerages/<BROKERAGE>/data-access.ts
      const reponse = currentBrokerage && await BROKERAGES_VARS[currentBrokerage]?.getUserData(currentBrokerage, authToken);

      if(reponse) {
        port.postMessage(reponse);
      }
    }
  });
});
  

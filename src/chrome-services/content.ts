import { localAuthTokenName } from "../../lib/consts/local-storage-var";
import { getCurrentBrokerageFromURL } from "../../lib/helpers/get-current-brokerage-from-url";

const currentUrl = window.location.href;
const currentBrokerage = getCurrentBrokerageFromURL(currentUrl);

/*
  Thinkorswim saves authToken in the session storage.
  
  📣 Use this if the brokerage does authToken in the session/local storage.
*/
if(currentBrokerage === 'thinkorswim') {
  const authToken = sessionStorage.getItem('authToken');

  if(authToken) {
    chrome.storage.local.set({ [localAuthTokenName(currentBrokerage)]: `Bearer ${authToken}` })
  }
}
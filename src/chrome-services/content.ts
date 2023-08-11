import { localAuthTokenName, localRefreshTokenName } from "../../lib/consts/local-storage-var";
import { getCurrentBrokerageFromURL } from "../../lib/helpers/get-current-brokerage-from-url";

const currentUrl = window.location.href;
const currentBrokerage = getCurrentBrokerageFromURL(currentUrl);

/*
  Thinkorswim saves authToken in the session storage.
  
  📣 Use this if the brokerage does authToken in the session/local storage.
*/
if(currentBrokerage === 'thinkorswim') {
  const authToken = sessionStorage.getItem('authToken');
  const refreshToken = sessionStorage.getItem('refreshToken');

  if(authToken) {
    chrome.storage.local.set({ [localAuthTokenName(currentBrokerage)]: `Bearer ${authToken}` })
  }

  if(refreshToken) {  
    chrome.storage.local.set({ [localRefreshTokenName(currentBrokerage)]: `${refreshToken}` })
  }
}

/*
  ------------------------------------------------------------------------------------------
  Ask AI services
  ------------------------------------------------------------------------------------------
*/

// Extract and process URL parameters (assuming 'message' is the parameter of interest)
const urlParams = new URLSearchParams(window.location.search);
const messageParam = urlParams.get('messageFromERI');

// console.log('Empower Retail Investor question: ', messageParam);

const textareaChatGPT = document.getElementById('prompt-textarea'); // ChatGPT
const textareaBard = document.querySelector('textarea[placeholder="Enter a prompt here"]'); // Bard
const textareaClaude = document.querySelector('div[contenteditable="true"]'); // Claude

// Function to set the value of the textarea and trigger an input event
function setValueAndTriggerInput(element: Element | null, value: string | null) {
  if (element instanceof HTMLTextAreaElement) {
    element.value = value ? value : '';
    var inputEvent = new Event('input', { bubbles: true });
    element.dispatchEvent(inputEvent);
  } else if (element instanceof HTMLDivElement) {
    setTimeout(() => {
      element.innerHTML = value ? `<p>${value}</p>` : '';
      var inputEvent = new Event('input', { bubbles: true });
      element.dispatchEvent(inputEvent);
    }, 500);
  }
}

// Set values for ChatGPT, Bard, and Claude with a 500 milliseconds delay
setValueAndTriggerInput(textareaChatGPT, messageParam);
setValueAndTriggerInput(textareaBard, messageParam);
setValueAndTriggerInput(textareaClaude, messageParam);

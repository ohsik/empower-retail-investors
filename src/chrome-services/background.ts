console.log("this is chrome background.ts")


function getAuthToken(details: any){
  const authHeader = details.requestHeaders?.filter((item: { name: string }) => item.name === 'Authorization');
  const authToken = authHeader[0] && authHeader[0].value;
  chrome.storage.local.set({ authToken: authToken })
}

chrome.webRequest.onBeforeSendHeaders.addListener(getAuthToken, 
  { 
    urls: ["https://api.robinhood.com/user/", "https://api.robinhood.com/accounts/"],
    types: ["xmlhttprequest"]
  },
  ["requestHeaders", "extraHeaders"]
);

chrome.runtime.onConnect.addListener((port) => {

  // Listen to the event
  port.onMessage.addListener((message)=>  {
    console.log(message)
    if(message.FETCH_USER_DATA) {
      chrome.storage.local.get(["authToken"], async ({ authToken }) => {
        console.log({authToken})
        // Just send fetch successful reponse back to popup.tsx
        // const reponse = await getUserData(authToken)
        
        // if(reponse) {
        //   port.postMessage(reponse);
        // }
      });

    }
  });
});
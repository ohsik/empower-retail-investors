import { brokerageUrls, supportedBrokerages } from '../../lib/consts/brokerages';

type CurrentUrlReturn = {
  currentUrl: string | null;
  currentBrokerage: keyof typeof brokerageUrls | undefined;
  isCurrentBrokerageSupported: boolean;
};

export function getCurrentBrokerage(): Promise<CurrentUrlReturn> {
  return new Promise((resolve) => {
    // chrome.tabs.onActivated.addListener((activeInfo) => {
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
        let currentUrl: string | null | undefined = null;
        let currentBrokerage: keyof typeof brokerageUrls | undefined = undefined;
        let isCurrentBrokerageSupported: boolean = false;

        if (tabs.length > 0) {
          currentUrl = tabs[0].url ?? '';
  
          currentBrokerage = (Object.keys(brokerageUrls) as Array<keyof typeof brokerageUrls>).find(
            (brokerage) => currentUrl?.includes(brokerageUrls[brokerage])
          );
  
          isCurrentBrokerageSupported = supportedBrokerages.includes(currentBrokerage as keyof typeof brokerageUrls);
        }
  
        const result: CurrentUrlReturn = {
          currentUrl,
          currentBrokerage,
          isCurrentBrokerageSupported,
        };
  
        resolve(result);
      });
  // });
  });
}
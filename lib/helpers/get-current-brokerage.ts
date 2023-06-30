import { brokerageUrls, supportedBrokerages } from '../../lib/consts/brokerages';

type CurrentUrlReturn = {
  currentUrl: string | null;
  currentBrokage: keyof typeof brokerageUrls | undefined;
  isCurrentBrokageSupported: boolean;
};

export function getCurrentBrokerage(): Promise<CurrentUrlReturn> {
  return new Promise((resolve) => {
    // chrome.tabs.onActivated.addListener((activeInfo) => {
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
        let currentUrl: string | null | undefined = null;
        let currentBrokage: keyof typeof brokerageUrls | undefined = undefined;
        let isCurrentBrokageSupported: boolean = false;

        if (tabs.length > 0) {
          currentUrl = tabs[0].url ?? '';
  
          currentBrokage = (Object.keys(brokerageUrls) as Array<keyof typeof brokerageUrls>).find(
            (brokerage) => currentUrl?.includes(brokerageUrls[brokerage])
          );
  
          isCurrentBrokageSupported = supportedBrokerages.includes(currentBrokage as keyof typeof brokerageUrls);
        }
  
        const result: CurrentUrlReturn = {
          currentUrl,
          currentBrokage,
          isCurrentBrokageSupported,
        };
  
        resolve(result);
      });
  // });
  });
}
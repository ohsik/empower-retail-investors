import { brokerageUrls } from "../consts/brokerages";

// Find current brokerage from the current URL
export function getCurrentBrokerageFromURL(currentUrl: string | null | undefined) {
  const currentBrokerage = (Object.keys(brokerageUrls) as Array<keyof typeof brokerageUrls>).find(
    (brokerage) => currentUrl?.includes(brokerageUrls[brokerage])
  );
  return currentBrokerage;
}
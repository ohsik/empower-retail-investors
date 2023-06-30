// TODO: list of Webull endpoints

// TODO: learn more about Webull's API and auth
// Seems like WeBull does not use the same authentication as Robinhood. 
// requestHeaders
// {name: 'User-Agent', value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'} 
// {name: 'Accept', value: '*/*'} 
// {name: 'Sec-Fetch-Site', value: 'same-origin'}
// {name: 'Sec-Fetch-Mode', value: 'cors'}
// {name: 'Sec-Fetch-Dest', value: 'empty'}
// {name: 'Referer', value: 'https://app.webull.com/static/indicator-worker.8533.js'}
// {name: 'Accept-Encoding', value: 'gzip, deflate, br'}
// {name: 'Accept-Language', value: 'en-US,en;q=0.9'}
// {name: 'Cookie', value: 'web_did=cuuq9yq60en7ee9lqz5a6g1r483g7e92; web_lt=d…k=1pr5oks|1688088030719|48|0|o.clarity.ms/collect'}

export const GET_AUTH_TOKEN_URLS = ["https://trade.webullfintech.com/api/trading/v1/global/tradetab/display", "https://u1suser.webullfintech.com/api/user/v1/userInfo/queryUserInfo/v2"];
export const API_URL = 'https://api.webull.com/api';
export function requestHeaders(token: any): Headers {
  const requestHeaders = new Headers();

  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Authorization', token);

  return requestHeaders
}
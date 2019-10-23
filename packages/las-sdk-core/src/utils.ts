export function buildURL(url: string, params?: { [ key: string ]: string }) {
  if (!params) {
    return url;
  }

  const queryString = new URLSearchParams(params);
  return `${url}?${queryString}`;
}

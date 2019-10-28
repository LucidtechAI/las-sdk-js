export function buildURL(url: string, params?: { [ key: string ]: string|Array<string> }) {
  if (!params) {
    return url;
  }

  const queryString = Object.entries(params).map((param) => {
    const [ key, value ] = param;

    if (typeof value === 'string') {
      return `${key}=${encodeURIComponent(value)}`;
    }

    return `${key}=${encodeURIComponent(value.join(','))}`;
  }).join('&');

  return `${url}?${queryString}`;
}

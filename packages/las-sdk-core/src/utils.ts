export function buildURL(url: string, params?: { [ key: string ]: string|Array<string> }) {
  if (!params) {
    return url;
  }

  const queryString = Object.entries(params).map((param) => {
    const [ key, value ] = param;

    if (typeof value === 'string') {
      return `${key}=${value}`;
    }

    return `${key}=${value.join(',')}`;
  }).join('&');

  const searchParams = new URLSearchParams(queryString);
  return `${url}?${searchParams}`;
}

export function buildURL(url: string, params?: { [ key: string ]: string|Array<string> }) {
  if (!params) {
    return url;
  }

  const searchParams = new URLSearchParams();
  const queryString = Object.entries(params).forEach((param) => {
    const [ key, value ] = param;

    if (typeof value === 'string') {
      searchParams.set(key, value);
      return;
    }

    searchParams.append(key, value.join(','));
  });

  return `${url}?${searchParams}`;
}

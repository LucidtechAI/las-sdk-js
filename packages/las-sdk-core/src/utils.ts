export type buildURLParams = Record<string, undefined|string|Array<string>|number>

export function buildURL(url: string, params?: buildURLParams): string {
  if (!params) {
    return url;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach((param) => {
    const [key, value] = param;
    if (value === undefined) {
      return;
    }

    if (typeof value === 'number') {
      searchParams.set(key, value.toString());
      return;
    }

    if (typeof value === 'string') {
      searchParams.set(key, value);
      return;
    }

    searchParams.append(key, value.join(','));
  });

  return `${url}?${searchParams}`;
}

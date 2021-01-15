export type BuildURLParams = Record<string, undefined|string|Array<string>|number>

export function buildURL(url: string, params?: BuildURLParams): string {
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

    if (Array.isArray(value)) {
      value.forEach((val) => {
        searchParams.append(key, val);
      });
    }
  });

  return `${url}?${searchParams}`;
}

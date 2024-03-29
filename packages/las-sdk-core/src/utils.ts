import { Base64 } from 'js-base64';

export type BuildURLParams = Record<string, undefined | string | Array<string> | number>;

export function buildURL(url: string, params?: BuildURLParams): string {
  if (!params || Object.keys(params).length === 0) {
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

  // Input contained keys, but all were undefined
  if (searchParams.entries().next().done) {
    return url;
  }

  return `${url}?${searchParams}`;
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  const contentAsB64 = Base64.fromUint8Array(bytes);
  return contentAsB64;
}

import { TokenStorage, Token } from '@lucidtech/las-sdk-core';

export class SessionStorage implements TokenStorage<Token> {
  private keyName: string;

  constructor(keyName?: string) {
    this.keyName = keyName || 'AuthToken';
  }

  getPersistentToken() {
    const tokenString = window.sessionStorage.getItem(this.keyName);

    if (!tokenString) {
      return null;
    }

    const { accessToken, expiration, refreshToken } = JSON.parse(tokenString);

    if (!(accessToken && expiration && refreshToken)) {
      return null;
    }

    return new Token(accessToken, expiration, refreshToken);
  }

  setPersistentToken(value: Token) {
    const tokenString = JSON.stringify(value);
    window.sessionStorage.setItem(this.keyName, tokenString);
  }
}

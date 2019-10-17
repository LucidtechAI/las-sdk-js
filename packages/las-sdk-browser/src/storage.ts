import { ITokenStorage, Token } from '@lucidtech/las-sdk-core';


export class SessionStorage implements ITokenStorage<Token> {
  private _keyName: string;

  constructor(keyName?: string) {
    this._keyName = keyName || 'AuthToken';
  }

  getPersistentToken() {
    const tokenString = window.sessionStorage.getItem(this._keyName);

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
    window.sessionStorage.setItem(this._keyName, tokenString);
  }
}

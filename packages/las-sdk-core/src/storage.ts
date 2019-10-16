import { Token } from './credentials';


export interface ITokenStorage<T extends Token> {
  getPersistentToken: () => T|null;
  setPersistentToken: (value: T) => void;
}

import { Token } from './credentials';


export interface TokenStorage<T extends Token> {
  getPersistentToken: () => T|null;
  setPersistentToken: (value: T) => void;
}

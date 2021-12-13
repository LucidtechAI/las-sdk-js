export class MockStorage {
  private storage: { [key: string]: string | null };

  constructor() {
    this.storage = {};
  }

  getItem(key: string) {
    return this.storage[key];
  }

  setItem(key: string, value: string | null) {
    this.storage[key] = value;
  }
}

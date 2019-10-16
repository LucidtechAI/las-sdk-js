export class MockStorage {
    private _storage: { [key: string]: string|null };

    constructor() {
        this._storage = {};
    }

    getItem(key: string) {
        return this._storage[key];
    }

    setItem(key: string, value: string|null) {
        this._storage[key] = value;
    }
}

test('Loading browser helpers', () => {});

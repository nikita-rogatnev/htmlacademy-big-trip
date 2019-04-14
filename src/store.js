export default class Store {
  constructor({key, storage}) {
    this._storage = storage;
    this._storeKey = key;
  }

  setItem({key, item}) {
    const ITEMS = this.getAll();
    ITEMS[key] = item;
    this._storage.setItem(this._storeKey, JSON.stringify(ITEMS));
  }

  getItem({key}) {
    const ITEMS = this.getAll();
    return ITEMS[key];
  }

  removeItem({key}) {
    const ITEMS = this.getAll();
    delete ITEMS[key];

    this._storage.setItem(this._storeKey, JSON.stringify(ITEMS));
  }

  getAll() {
    const EMPTY_ITEMS = {};
    const ITEMS = this._storage.getItem(this._storeKey);

    if (!ITEMS) {
      return EMPTY_ITEMS;
    }

    try {
      return JSON.parse(ITEMS);
    } catch (e) {
      window.console.log(`Error parse items. Error: ${e}. Items: ${ITEMS}`);
      return EMPTY_ITEMS;
    }
  }
}

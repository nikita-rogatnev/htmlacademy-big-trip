import ModelTripPoint from "./models/model-trip-point";

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export default class Provider {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;
  }

  getTripPoints() {
    if (Provider._isOnline()) {
      return this._api.getTripPoints()
        .then((points) => {
          points.map((item) => this._store.setItem({key: item.id, item: item.toRAW()}));
          return points;
        });
    } else {
      const rawPointsMap = this._store.getAll();
      const rawPoints = objectToArray(rawPointsMap);
      const points = ModelTripPoint.parseTripPoints(rawPoints);
      return Promise.resolve(points);
    }
  }

  getDestinations() {
    return this._api.getDestinations()
      .then((destinations) => destinations);
  }

  getOffers() {
    return this._api.getOffers()
      .then((offers) => offers);
  }

  createTripPoint({tripPoint}) {
    if (Provider._isOnline()) {
      return this._api.createTripPoint({point: tripPoint.toRAW()})
        .then((response) => {
          this._store.setItem({key: response.id, item: response.toRAW()});
          return response;
        });
    }
    tripPoint.id = this._generateId();
    this._needSync = true;
    this._store.setItem({key: tripPoint.id, item: tripPoint});
    return Promise.resolve(ModelTripPoint.parseTripPoint(tripPoint));
  }

  updateTripPoint({id, data}) {
    if (Provider._isOnline()) {
      return this._api.updateTripPoint({id, data})
        .then((tripPoint) => {
          this._store.setItem({key: tripPoint.id, item: tripPoint.toRAW()});
          return tripPoint;
        });
    } else {
      const tripPoint = data;
      this._needSync = true;
      this._store.setItem({key: tripPoint.id, item: tripPoint});
      return Promise.resolve(ModelTripPoint.parseTripPoint(tripPoint));
    }
  }

  deleteTripPoint({id}) {
    if (Provider._isOnline()) {
      return this._api.deleteTripPoint({id})
        .then(() => {
          this._store.removeItem({key: id});
        });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  syncTripPoints() {
    return this._api.syncPoints({
      points: objectToArray(this._store.getAll()),
    });
  }

  static _isOnline() {
    return window.navigator.onLine;
  }
}

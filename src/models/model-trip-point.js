class ModelTripPoint {
  constructor(data) {
    this._types = [
      {icon: `🏨`, name: `Check-in`, transport: false},
      {icon: `🚗`, name: `Drive`, transport: true},
      {icon: `🚌`, name: `Bus`, transport: true},
      {icon: `🚂`, name: `Train`, transport: true},
      {icon: `🛳️`, name: `Ship`, transport: true},
      {icon: `🚊`, name: `Transport`, transport: true},
      {icon: `🏛️`, name: `Sightseeing`, transport: false, title: ``},
      {icon: `🍴`, name: `Restaurant`, transport: false},
      {icon: `🚕`, name: `Taxi`, transport: true},
      {icon: `✈️`, name: `Flight`, transport: true}
    ];
    this.id = data.id;
    this.type = this._getType(data.type);
    this.destination = data[`destination`] ? data[`destination`].name : ``;
    this.description = data[`destination`] ? data[`destination`].description : ``;
    this.pictures = data[`destination`] ? data[`destination`].pictures : [];
    this.price = data[`base_price`] || 0;
    this.dateStart = data[`date_from`] || Date.now();
    this.dateEnd = data[`date_to`] || Date.now();
    this.isFavorite = data[`is_favorite`] || false;
    this.offers = data.offers;
  }

  _getType(dataType) {
    for (let type of this._types) {
      if (type.name.toLocaleLowerCase() === dataType) {
        return type;
      }
    }
    return dataType;
  }

  toRAW() {
    return {
      'id': this.id,
      'is_favorite': this.isFavorite,
      'type': this.type,
      'base_price': this.price,
      'date_from': this.dateStart,
      'date_to': this.dateEnd,
      'destination': this.destination,
      'offers': this.offers,
    };
  }

  static parseTripPoint(data) {
    return new ModelTripPoint(data);
  }

  static parseTripPoints(data) {
    return data.map(ModelTripPoint.parseTripPoint);
  }
}

export default ModelTripPoint;

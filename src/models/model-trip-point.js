class ModelTripPoint {
  constructor(data) {
    this.id = data.id;
    this.isFavorite = data[`is_favorite`] || false;
    this.type = data.type;
    this.city = data[`destination`][`name`] || ``;
    this.description = data[`destination`][`description`] || ``;
    this.pictures = data[`destination`][`pictures`] || [];
    this.dateStart = data[`date_from`] || Date.now();
    this.dateEnd = data[`date_to`] || Date.now();
    this.price = data[`base_price`] || 0;
    this.fullPrice = this._calculateFullPrice(data[`base_price`], data.offers) || 0;
    this.offers = data.offers;
  }

  _calculateFullPrice(price, offers) {
    let offersPrice = 0;

    for (let offer of offers) {
      if (offer.accepted) {
        offersPrice += offer.price;
      }
    }

    offersPrice += price;

    return offersPrice;
  }

  toRAW() {
    return {
      'id': this.id,
      'is_favorite': this.isFavorite,
      'type': this.type,
      'base_price': this.price,
      'date_from': this.dateStart,
      'date_to': this.dateEnd,
      'destination': {
        'name': this.city,
        'description': this.description,
        'pictures': this.pictures,
      },
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

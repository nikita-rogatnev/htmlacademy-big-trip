class ModelOffers {
  constructor(data) {
    this.type = data.type;
    this.offers = ModelOffers._changeOffers(data.offers);
  }

  static _changeOffers(offers) {
    offers = offers.map((offer) => {
      const newOffers = {};
      newOffers.accepted = false;
      newOffers.title = offer.name;
      newOffers.price = offer.price;
      return newOffers;
    });

    return offers;
  }

  static parseOffer(data) {
    return new ModelOffers(data);
  }

  static parseOffers(data) {
    return data.map(ModelOffers.parseOffer);
  }
}

export default ModelOffers;

export default class TripPointModel {
  constructor(data) {
    this.id = data[`id`];
    this.travelWay = data[`type`];
    this.destination = data[`destination`][`name`];
    this.destinationText = data[`destination`][`description`];
    this.picture = data[`destination`][`pictures`];
    this.offer = data[`offers`];
    this.price = data[`base_price`];
    this.dateStart = data[`date_from`];
    this.dateEnd = data[`date_to`];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.travelWay,
      'offers': this.offer,
      'base_price': this.price,
      'date_from': this.dateStart,
      'date_to': this.dateEnd,
      'is_favorite': this.isFavorite,
      'destination': {
        'name': this.destination
      }
    };
  }

  static parseTrip(data) {
    return new TripPointModel(data);
  }

  static parseTrips(data) {
    return data.map(TripPointModel.parseTrip);
  }
}

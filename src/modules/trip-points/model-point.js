import moment from 'moment';

export default class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`title`] || ``;
    this.dueDate = new Date(data[`due_date`]);
    this.dueTime = moment(new Date(data[`due_date`])).format(`H:mm a`);
    this.tags = new Set(data[`tags`] || []);
    this.picture = data[`picture`] || ``;
    this.repeatingDays = data[`repeating_days`];
    this.color = data[`color`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isDone = Boolean(data[`is_done`]);
  }
  this._favorite = data.favorite;
  this._travelWay = data.travelWay;
  this._destination = data.destination;
  this._dateStart = data.dateStart;
  this._dateEnd = data.dateEnd;
  this._price = data.price;
  this._offer = data.offer;
  // this._destinationText = data.destinationText;

  toRAW() {
    return {
      'id': this.id,
      'title': this.title,
      'due_date': this.dueDate,
      'tags': [...this.tags.values()],
      'picture': this.picture,
      'repeating_days': this.repeatingDays,
      'color': this.color,
      'is_favorite': this.isFavorite,
      'is_done': this.isDone,
    };
  }

  static parseTripPoint(data) {
    return new ModelPoint(data);
  }

  static parseTripPoints(data) {
    return data.map(ModelPoint.parseTask);
  }
}

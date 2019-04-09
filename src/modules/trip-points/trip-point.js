import Component from '../../helpers/component';
import {getDurationTime} from '../../helpers/utils';
import * as moment from 'moment/moment';

// Trip Point Class
class TripPoint extends Component {
  constructor(data) {
    super();
    this._types = [
      {icon: `🏨`, name: `Hotel`, transport: false},
      {icon: `🚗`, name: `Drive`, transport: true},
      {icon: `🚌`, name: `Bus`, transport: true},
      {icon: `🚂`, name: `Train`, transport: true},
      {icon: `🛳️`, name: `Ship`, transport: true},
      {icon: `🚊`, name: `Transport`, transport: true},
      {icon: `🏛️`, name: `Sightseeing`, transport: false},
      {icon: `🍴`, name: `Restaurant`, transport: false},
      {icon: `🚕`, name: `Taxi`, transport: true},
      {icon: `✈️`, name: `Flight`, transport: true},
    ];
    this._id = data.id;
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._destination = data.destination;
    this.description = data.description;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._pictures = data.pictures;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onEdit = null;
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onClick(fn) {
    this._onEdit = fn;
  }

  _renderTripPointOffers() {
    const offersArray = [];
    for (let offer of this._offers) {
      if (offer.accepted) {
        offersArray.push(`<li><button class="trip-point__offer">${offer.title} +&euro;&nbsp;${offer.price}</button></li>`);
      }
    }
    return `<ul class="trip-point__offers">${offersArray.join(``)}</ul>`;
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${this._type.icon}</i>
        <h3 class="trip-point__title">${this._destination}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${moment(this._dateStart).format(`HH:mm`)} — ${moment(this._dateEnd).format(`HH:mm`)}</span>
          <span class="trip-point__duration">${moment(getDurationTime(this._dateStart, this._dateEnd)).format(`H[H] mm[M]`)}</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp; ${this._price}</p>
        <ul class="trip-point__offers">
          ${this._renderTripPointOffers()}
        </ul>
      </article>`.trim();
  }

  bind() {
    this._element
      .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._destination = data.destination;
  }
}

export default TripPoint;

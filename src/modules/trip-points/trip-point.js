import Component from '../../helpers/component';
import {getDurationTime, travelTypes} from '../../helpers/utils';
import * as moment from 'moment/moment';

// Trip Point Class
class TripPoint extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._destination = data.destination;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offers = data.offers;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onEdit = null;
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    if (typeof fn === `function`) {
      this._onEdit = fn;
    }
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
        <i class="trip-icon">${travelTypes[this._type]}</i>
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
    this._element.querySelector(`.trip-icon`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.trip-icon`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._destination = data.destination;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offers = data.offers;
  }
}

export default TripPoint;

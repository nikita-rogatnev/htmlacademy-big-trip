import Component from '../../helpers/component';
import {getDurationTime, TravelType} from '../../helpers/utils';
import * as moment from 'moment/moment';

// Trip Point Class
class TripPoint extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._city = data.city;
    this._description = data.description;
    this._pictures = data.pictures;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._fullPrice = data.fullPrice;
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
    return `<ul class="trip-point__offers">${offersArray.slice(0, 3).join(``)}</ul>`;
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
    this._id = data.id;
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._city = data.city;
    this._description = data.description;
    this._pictures = data.pictures;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._fullPrice = data.fullPrice;
    this._offers = data.offers;
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${TravelType[this._type.toUpperCase()]}</i>
        <h3 class="trip-point__title">${this._city}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${moment(this._dateStart).format(`HH:mm`)} — ${moment(this._dateEnd).format(`HH:mm`)}</span>
          <span class="trip-point__duration">${moment(getDurationTime(this._dateStart, this._dateEnd)).format(`H[H] mm[M]`)}</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp; ${this._fullPrice}</p>
        <ul class="trip-point__offers">
          ${this._renderTripPointOffers()}
        </ul>
      </article>`.trim();
  }
}

export default TripPoint;

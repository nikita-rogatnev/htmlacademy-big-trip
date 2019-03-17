import {Component} from '../../component';
import {emojiList} from '../../helpers/emoji-list';
import {getDurationTime} from '../../helpers/get-duration-time';
import moment from 'moment';

// Trip Point Class
export class TripPoint extends Component {
  constructor(data) {
    super();
    this._travelType = data.travelType;
    this._destinationTitle = data.destinationTitle;
    this._timeTableFrom = data.timeTableFrom;
    this._timeTableTo = data.timeTableTo;
    this._price = data.price;
    this._offers = data.offers;
    this._picture = data.picture;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onEdit = null;
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${emojiList[this._travelType]}</i>
        <h3 class="trip-point__title">${this._destinationTitle}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${moment(this._timeTableFrom, `MM-DD-YYYY`).format(`HH:mm`)} &nbsp;&mdash; ${moment(this._timeTableTo, `MM-DD-YYYY`).format(`HH:mm`)}</span>
          <span class="trip-point__duration">${getDurationTime(this._timeTableFrom, this._timeTableTo)}</span>
          <img src="${this._picture}" alt="${this._destinationTitle}" width="100" height="100">
        </p>
        <p class="trip-point__price">&euro;&nbsp; ${this._price}</p>
        <ul class="trip-point__offers">
          ${(Array.from(this._offers).map((offer) => (`<li><button class="trip-point__offer">${offer.split(`-`).join(` `).toLocaleLowerCase()}</button></li>`.trim()))).join(``)}
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
    this._destinationTitle = data.destinationTitle;
    this._price = data.price;
    this._offers = data.offers;
  }
}

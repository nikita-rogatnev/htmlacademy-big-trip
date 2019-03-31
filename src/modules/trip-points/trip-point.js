import {Component} from '../../component';
import {emojiList} from '../../helpers/emoji-list';
import {getDurationTime} from '../../helpers/get-duration-time';
import moment from 'moment';

// Trip Point Class
export class TripPoint extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._isDone = data.isDone;
    this._isFavorite = data.isFavorite;
    this._travelWay = data.travelWay;
    this._destination = data.destination;
    this._destinationText = data.destinationText;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offer = data.offer;
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

  get offersList() {
    return Object.keys(this._offer)
      .filter((key) => this._offer[key])
      .map((offer) => `<li><button class="trip-point__offer">${offer.split(`-`).join(` `).toLocaleLowerCase()}</button></li>`)
      .join(``);
  }

  get template() {
    return `
      <article class="trip-point ${this._isFavorite ? `trip-point--favorite` : ``}">
        <i class="trip-icon">${emojiList[this._travelWay.toLocaleLowerCase()]}</i>
        <h3 class="trip-point__title">${this._destination}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${this._dateStart} — ${this._dateEnd}</span>
            <span class="trip-point__duration">${moment(getDurationTime(this._dateStart, this._dateEnd)).format(`H[H] mm[M]`)}</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp; ${this._price}</p>
        <ul class="trip-point__offers">
          ${this.offersList}
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
    this._travelWay = data.travelWay;
    this._destination = data.destination;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offer = data.offer;
    // this._destinationText = data.destinationText;
    // this._picture = data.picture;
  }
}

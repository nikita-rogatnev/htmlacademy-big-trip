import {Component} from '../../component';
import {emojiList} from '../../helpers/emoji-list';
import {getDurationTime} from '../../helpers/get-duration-time';

// Trip Point Class
export class TripPoint extends Component {
  constructor(data) {
    super();
    this._icon = data.icon;
    this._title = data.title;
    this._timeTableFrom = data.timeTable.from;
    this._timeTableTo = data.timeTable.to;
    this._price = data.price;
    this._offers = data.offers;
    this._picture = data.picture;

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
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
        <i class="trip-icon">${emojiList[this._icon]}</i>
        <h3 class="trip-point__title">${this._title}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${this._timeTableFrom} &nbsp;&mdash; ${this._timeTableTo}</span>
          <span class="trip-point__duration">
            ${getDurationTime(this._timeTableFrom, this._timeTableTo)}
          </span>
          <img src="${this._picture}" alt="${this._title}" width="100" height="100">
        </p>
        <p class="trip-point__price">&euro;&nbsp; ${this._price}</p>
        <ul class="trip-point__offers">
          ${this._offers}
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
}

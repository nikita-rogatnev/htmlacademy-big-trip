import {Component} from '../../component';
import {emojiList} from '../../helpers/emoji-list';

// Trip Point Class
export class TripPoint extends Component {
  constructor(data) {
    super();
    this._favorite = data.favorite;
    this._travelWay = data.travelWay;
    this._destination = data.destination;
    this._destinationText = data.destinationText;
    this._time = data.time;
    this._timeDuration = data.timeDuration;
    this._price = data.price;
    this._totalPrice = data.totalPrice;
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
    const list = this._offer;
    const active = Object.keys(list).filter(function (id) {
      return list[id];
    });

    return active.map((element) => `<li><button class="trip-point__offer">${element.split(`-`).join(` `).toLocaleLowerCase()}</button></li>`).join(``);
  }

  get template() {
    return `
      <article class="trip-point ${this._favorite ? `trip-point--favorite` : ``}">
        <i class="trip-icon">${emojiList[this._travelWay.toLocaleLowerCase()]}</i>
        <h3 class="trip-point__title">${this._destination}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${this._time}</span>
          <span class="trip-point__duration">${this._timeDuration}</span>
          <img src="${this._picture}" alt="${this._destination}" width="100" height="100">
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
    this._favorite = data.favorite;
    this._destination = data.destination;
    this._day = data.day;
    this._time = data.time;
    this._timeDuration = data.timeDuration;
    this._price = data.price;
    this._offer = data.offer;
  }
}

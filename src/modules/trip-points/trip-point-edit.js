import {Component} from '../../component';
import moment from 'moment';
import flatpickr from 'flatpickr';
import "../../../node_modules/flatpickr/dist/flatpickr.css";
import "../../../node_modules/flatpickr/dist/themes/dark.css";

// Trip Point Edit Class
export class TripPointEdit extends Component {
  constructor(data) {
    super();
    this._favorite = data.favorite;
    this._travelType = data.travelType;
    this._destinationTitle = data.destinationTitle;
    this._destinationText = data.destinationText;
    this._timeTableFrom = data.timeTableFrom;
    this._timeTableTo = data.timeTableTo;
    this._price = data.price;
    this._offers = data.offers;
    this._picture = data.picture;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onSubmit = null;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onDelete = null;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);
    typeof this._onSubmit === `function` && this._onSubmit(newData);

    console.log(newData);

    this.update(newData);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onDeleteButtonClick() {
    return (typeof this._onDelete === `function`) && this._onDelete();
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _processForm(formData) {
    const entry = {
      destinationTitle: ``,
      timeTableFrom: this._timeTableFrom,
      timeTableTo: this._timeTableTo,
      price: 0,
      offers: new Set(),
    };

    const tripPointEditMapper = TripPointEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (tripPointEditMapper[property]) {
        tripPointEditMapper[property](value);
      }
    }

    return entry;
  }

  update(data) {
    this._destinationTitle = data.destination;
    this._price = data.price;
    this._offers = data.offer;
  }

  static createMapper(target) {
    return {
      destination: (value) => {
        target.destinationTitle = value;
      },
      price: (value) => {
        target.price = value;
      },
      offer: (value) => {
        target.offers.add(value);
      },
    };
  }

  get template() {
    return `
      <article class="point">
        <form action="" method="get">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day">
            </label>
      
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">✈️</label>
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
              
              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
                  <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
                  <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
                  <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" checked>
                  <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
                </div>
      
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                  <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
                  <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">Flight to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._destinationTitle}" name="destination">
              <datalist id="destination-select">
                <option value="airport"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
                <option value="hotel"></option>
              </datalist>
            </div>
      
            <label class="point__time">
              choose time
              <input class="point__input" type="text" value="${this._timeTableFrom} TO ${this._timeTableTo}" name="time" placeholder="00:00 — 00:00">
            </label>
      
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>
      
            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>
      
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._state.isFavorite ? `checked` : ``}>
               <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
            
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
              
              <div class="point__offers-wrap">
                ${(Array.from(this._offers).map((offer) => (`
                  <input class="point__offers-input visually-hidden" type="checkbox" name="offer" 
                    id="${offer.split(` `).join(`-`).toLocaleLowerCase()}" 
                    value="${offer.split(` `).join(`-`).toLocaleLowerCase()}">
                  <label for="${offer.split(` `).join(`-`).toLocaleLowerCase()}" class="point__offers-label">
                    <span class="point__offer-service">${offer.split(`-`).join(` `).toLocaleLowerCase()}</span> + €<span class="point__offer-price">${Math.floor(Math.random() * Math.floor(100))}</span>
                  </label>`.trim()))).join(``)}
              </div>
                  
            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._destinationText}</p>
              <div class="point__destination-images">
                <img src="${this._picture}" alt="picture from place" class="point__destination-image">
              </div>
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.point form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__button[type="reset"]`)
      .addEventListener(`click`, this._onDeleteButtonClick);

    this._element.querySelector(`.point__time .point__input`).flatpickr({
      mode: `range`,
      enableTime: true,
      dateFormat: `H:i`,
      onClose: this._onCloseFlatpickr
    });
  }

  _onCloseFlatpickr(selectedDates) {
    this._timeTableFrom = moment(selectedDates[0]);
    this._timeTableTo = moment(selectedDates[1]);
  }

  unbind() {
    this._element.querySelector(`.point form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__buttons button[type="reset"]`)
      .removeEventListener(`click`, this._onDeleteButtonClick);
  }
}

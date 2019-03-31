import {Component} from '../../component';
import {emojiList} from '../../helpers/emoji-list';
import moment from 'moment';
import flatpickr from 'flatpickr';
import "../../../node_modules/flatpickr/dist/flatpickr.css";
import "../../../node_modules/flatpickr/dist/themes/dark.css";

// Trip Point Edit Class
export class TripPointEdit extends Component {
  constructor(data) {
    super();
    this._favorite = data.favorite;
    this._travelWay = data.travelWay;
    this._destination = data.destination;
    this._destinationText = data.destinationText;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offer = data.offer;
    this._picture = data.picture;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onSubmit = null;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onDelete = null;

    this._onTravelWayChange = this._onTravelWayChange.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);
    typeof this._onSubmit === `function` && this._onSubmit(newData);

    // TODO: remove - Помогает для отладки, пусть будет до конца разработки
    console.log(newData);

    this.update(newData);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onDeleteButtonClick() {
    return (typeof this._onDelete === `function`) && this._onDelete();
  }

  _onTravelWayChange(event) {
    const travelWayCheckbox = this._element.querySelector(`.travel-way__toggle`);
    const travelWayLabel = this._element.querySelector(`.travel-way__label`);
    const travelWayLabelContent = event.srcElement.textContent.split(` `)[1];
    const destinationLabel = this._element.querySelector(`.point__destination-label`);

    this._travelWay = travelWayLabelContent.toLocaleLowerCase();
    travelWayCheckbox.checked = false;
    travelWayLabel.innerHTML = emojiList[this._travelWay];
    destinationLabel.innerHTML = `${travelWayLabelContent} to`;

    this.unbind();
    this.bind();
  }

  _travelWayList() {
    const travelWaySelectList = [];

    for (const key in emojiList) {
      if (emojiList.hasOwnProperty(key)) {
        travelWaySelectList.push(`
          <input class="travel-way__select-input visually-hidden" 
            type="radio" 
            id="travel-way-${key.toLowerCase()}" 
            name="travelWay" 
            value="${key.toLowerCase()}" 
            ${(this._travelWay === key) ? `checked` : ``}>
          <label class="travel-way__select-label" for="travel-way-${key.toLowerCase()}">${emojiList[key] + ` ` + key.toLowerCase()}</label>
        `);
      }
    }

    return travelWaySelectList.join(``);
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _processForm(formData) {
    const entry = {
      favorite: false,
      travelWay: ``,
      destination: ``,
      dateStart: ``,
      dateEnd: ``,
      price: 0,
      totalPrice: 0,
      offer: {
        'add-luggage': false,
        'switch-to-comfort-class': false,
        'add-meal': false,
        'choose-seats': false,
      },
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
    this._favorite = data.favorite;
    this._travelWay = data.travelWay;
    this._destination = data.destination;
    this._destinationText = data.destinationText;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offer = data.offer;
    this._picture = data.picture;
  }

  static createMapper(target) {
    return {
      favorite: (value) => {
        target.favorite = (value === `on`);
      },
      travelWay: (value) => {
        target.travelWay = value;
      },
      destination: (value) => {
        target.destination = value;
      },
      "date-start": (value) => {
        target.dateStart = value;
      },
      "date-end": (value) => {
        target.dateEnd = value;
      },
      price: (value) => {
        target.price = parseInt(value, 10);
      },
      offer: (value) => {
        target.offer[value] = true;
      },
    };
  }

  get template() {
    return `
      <article class="point">
        <form action="" method="get">
          <header class="point__header">
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">
                ${emojiList[this._travelWay.toLocaleLowerCase()]}
              </label>
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
              
              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  ${this._travelWayList()}
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${this._travelWay} to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
              <datalist id="destination-select">
                <option value="airport"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
                <option value="hotel"></option>
              </datalist>
            </div>
      
            <div class="point__time">
              choose time
              <input class="point__input" type="text" name="date-start" placeholder="19:00">
              <input class="point__input" type="text" name="date-end" placeholder="21:00">
            </div>
      
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
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._favorite ? `checked` : ``}>
               <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
            
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
              
              <div class="point__offers-wrap">
                <input class="point__offers-input visually-hidden" type="checkbox" id="add-luggage" name="offer" value="add-luggage" ${this._offer[`add-luggage`] && `checked`}>
                <label for="add-luggage" class="point__offers-label">
                  <span class="point__offer-service">Add luggage</span> + €<span class="point__offer-price">30</span>
                </label>
      
                <input class="point__offers-input visually-hidden" type="checkbox" id="switch-to-comfort-class" name="offer" value="switch-to-comfort-class" ${this._offer[`switch-to-comfort-class`] && `checked`}>
                <label for="switch-to-comfort-class" class="point__offers-label">
                  <span class="point__offer-service">Switch to comfort class</span> + €<span class="point__offer-price">100</span>
                </label>
      
                <input class="point__offers-input visually-hidden" type="checkbox" id="add-meal" name="offer" value="add-meal" ${this._offer[`add-meal`] && `checked`}>
                <label for="add-meal" class="point__offers-label">
                  <span class="point__offer-service">Add meal </span> + €<span class="point__offer-price">15</span>
                </label>
      
                <input class="point__offers-input visually-hidden" type="checkbox" id="choose-seats" name="offer" value="choose-seats" ${this._offer[`choose-seats`] && `checked`}>
                <label for="choose-seats" class="point__offers-label">
                  <span class="point__offer-service">Choose seats</span> + €<span class="point__offer-price">5</span>
                </label>
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

    this._element.querySelector(`.travel-way__select-group`)
      .addEventListener(`click`, this._onTravelWayChange);

    // Time Range
    this._element.querySelector(`.point__time .point__input:nth-child(1)`).flatpickr({
      time_24hr: true,
      enableTime: true,
      noCalendar: true,
      dateFormat: `H:i`,
      defaultDate: this._dateStart,
    });

    this._element.querySelector(`.point__time .point__input:nth-child(2)`).flatpickr({
      time_24hr: true,
      enableTime: true,
      noCalendar: true,
      dateFormat: `H:i`,
      defaultDate: this._dateEnd,
    });
  }

  unbind() {
    this._element.querySelector(`.point form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__buttons button[type="reset"]`)
      .removeEventListener(`click`, this._onDeleteButtonClick);

    this._element.querySelector(`.travel-way__select-group`)
      .removeEventListener(`click`, this._onTravelWayChange);
  }
}

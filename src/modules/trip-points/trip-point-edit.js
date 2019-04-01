import {Component} from '../../component';
import {emojiList} from '../../utils';
import moment from 'moment';
import flatpickr from 'flatpickr';
import "../../../node_modules/flatpickr/dist/flatpickr.css";
import "../../../node_modules/flatpickr/dist/themes/dark.css";

// Trip Point Edit Class
export class TripPointEdit extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._isFavorite = data.isFavorite;
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

    // TODO: remove
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
      isFavorite: false,
      travelWay: ``,
      destination: ``,
      dateStart: ``,
      dateEnd: ``,
      price: 0,
      totalPrice: 0,
      offer: [],
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

  static createMapper(target) {
    return {
      'favorite': (value) => {
        target.isFavorite = (value === `on`);
      },
      'travelWay': (value) => {
        target.travelWay = value;
      },
      'destination': (value) => {
        target.destination = value;
      },
      'date-start': (value) => {
        target.dateStart = value * 1000;
      },
      'date-end': (value) => {
        target.dateEnd = value * 1000;
      },
      'price': (value) => {
        target.price = parseInt(value, 10);
      },
      'offer': (value) => {
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
              <button class="point__button point__button--delete" type="reset">Delete</button>
            </div>
      
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
               <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
            
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
              
              <div class="point__offers-wrap">
                ${this._offer.map((offer, i) => `
                <input class="point__offers-input visually-hidden" type="checkbox" name="offer" id="offer-${i}" value="${offer.title} + €${offer.price}" ${offer.accepted && `checked`}>
                <label for="offer-${i}" class="point__offers-label">
                  <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
                </label>`.trim()).join(``)}
              </div>
                      
            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._destinationText}</p>
              <div class="point__destination-images">
                ${this._picture.map((picture) => `<img src="${picture.src}" alt="${picture.description}" class="point__destination-image">`.trim()).join(``)}
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

    this._element.querySelector(`.point__button--delete`)
      .addEventListener(`click`, this._onDeleteButtonClick);

    this._element.querySelectorAll(`.travel-way__select-label`).forEach((select) => {
      select.addEventListener(`click`, this._onTravelWayChange);
    });

    this._buttonSave = this._element.querySelector(`.point__button--save`);
    this._buttonDelete = this._element.querySelector(`.point__button--delete`);

    // Time Range
    this._element.querySelector(`.point__time .point__input[name="date-start"]`).flatpickr({
      'time_24hr': true,
      'enableTime': true,
      'noCalendar': true,
      'altInput': true,
      'altFormat': `H:i`,
      'dateFormat': `U`,
      'defaultDate': this._dateStart,
    });

    this._element.querySelector(`.point__time .point__input[name="date-end"]`).flatpickr({
      'time_24hr': true,
      'enableTime': true,
      'noCalendar': true,
      'altInput': true,
      'altFormat': `H:i`,
      'dateFormat': `U`,
      'defaultDate': this._dateEnd,
    });
  }

  unbind() {
    this._element.querySelector(`.point form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__button--delete`)
      .removeEventListener(`click`, this._onDeleteButtonClick);

    this._element.querySelector(`.travel-way__select-label`)
      .removeEventListener(`click`, this._onTravelWayChange);
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  block(method) {
    console.log(method);
    this._buttonSave.disabled = true;
    this._buttonDelete.disabled = true;

    if (method === `save`) {
      this._buttonSave.innerText = `Saving...`;
    } else {
      this._buttonDelete.innerText = `Deleting...`;
    }
  }

  unblock() {
    this._buttonSave.disabled = false;
    this._buttonDelete.disabled = false;

    this._buttonSave.innerText = `Save`;
    this._buttonDelete.innerText = `Delete`;
  }

  showBorder(isShown) {
    if (isShown) {
      this._element.style.border = `1px solid red`;
    } else {
      this._element.style.border = `none`;
    }
  }
}

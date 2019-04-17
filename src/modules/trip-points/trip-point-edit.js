import Component from '../../helpers/component';
import * as moment from 'moment/moment';
import flatpickr from 'flatpickr';
import "../../../node_modules/flatpickr/dist/flatpickr.css";
import "../../../node_modules/flatpickr/dist/themes/dark.css";
import {TravelType} from '../../helpers/utils';

// Trip Point Edit Class
class TripPointEdit extends Component {
  constructor(data, offersList, destinations) {
    super();
    this._id = data.id;
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._city = data.city;
    this._description = data.description;
    this._pictures = data.pictures;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._pictures = data.pictures;
    this._destinations = destinations;

    this._price = data.price;
    this._fullPrice = data.fullPrice;
    this._offers = data.offers;
    this._offersList = offersList;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onSubmit = null;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onDelete = null;

    this._onKeydownEsc = this._onKeydownEsc.bind(this);
    this._onEsc = null;

    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeDestination = this._onChangeDestination.bind(this);
    this._onChangeOffers = this._onChangeOffers.bind(this);
  }

  _createPictures() {
    const picturesList = this._pictures.map((picture) => `<img src="${picture.src}" alt="${picture.description}" class="point__destination-image">`);
    return `<div class="point__destination-images">${picturesList.join(``)}</div>`;
  }

  _onChangeType(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {
      this._type = evt.target.value;

      for (let item of this._offersList) {
        if (item.type === this._type) {
          this._offers = item.offers.map((offer) => {
            return {
              title: offer.name,
              price: offer.price,
            };
          });
        }
      }
      this._partialUpdate();
    }
  }

  _onChangeOffers(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {
      const offerTitle = evt.target.value.split(`-`)[0];
      const offerPrice = +evt.target.value.split(`-`)[1];

      if (evt.target.checked) {
        for (let offer of this._offers) {
          if (offerPrice === offer.price && offerTitle === offer.title) {
            this._fullPrice += +offerPrice;
            offer.accepted = true;
            break;
          }
        }
        this._partialUpdate();
      } else {
        for (let offer of this._offers) {
          if (offerPrice === offer.price && offerTitle === offer.title) {
            this._fullPrice -= offerPrice;
            offer.accepted = false;
            break;
          }
        }

        this._partialUpdate();
      }
    }
  }

  _createOffers() {
    let offers = [];

    // Array of offers from _offersList without active
    const currentTypeOffers = this._offersList.find((offer) => offer.type === this._type);
    const currentTypeOffersArray = currentTypeOffers.offers;

    // Array of offers from _offers with active
    const currentTypeOffersAccepted = this._offers.find((offer) => offer.accepted === true);

    if (currentTypeOffersAccepted) {
      let currentTypeOffersActiveArray = [];
      currentTypeOffersActiveArray.push(currentTypeOffersAccepted);
      currentTypeOffersActiveArray = currentTypeOffersActiveArray.map((item) => {
        return {
          name: item.title,
          price: item.price,
          accepted: item.accepted
        };
      });

      // Arrays merge
      function mergeArrays(arrays, prop) {
        const merged = {};

        arrays.forEach((arr) => {
          arr.forEach((item) => {
            merged[item[prop]] = Object.assign({}, merged[item[prop]], item);
          });
        });

        return Object.values(merged);
      }

      offers = mergeArrays([currentTypeOffersArray, currentTypeOffersActiveArray], `name`);
      this._offers = offers;
    } else {
      this._offers = currentTypeOffersArray;
    }

    return this._offers.map((offer) => `<input class="point__offers-input visually-hidden" type="checkbox" id="${offer.name}-${this._id}" name="offer" value="${offer.name}-${offer.price}" ${offer.accepted ? `checked` : ``}>
      <label for="${offer.name}-${this._id}" class="point__offers-label">
        <span class="point__offer-service">${offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
      </label>`.trim()).join(``);
  }

  _onChangeDestination(evt) {
    const value = evt.target.value;

    for (let destination of this._destinations) {
      if (destination.name === value) {
        this._city = destination.name;
        this._description = destination.description;
        this._pictures = destination.pictures;
      }
    }

    this._partialUpdate();
  }

  _createDestinations() {
    const options = this._destinations.map((destinations) => `<option value="${destinations.name}"></option>`).join(``);
    return `<datalist id="destination-select">${options}</datalist>`;
  }

  _partialUpdate() {
    this.unbind();
    const oldElement = this._element;
    this._element.parentNode.replaceChild(this.render(), oldElement);
    oldElement.remove();
    this.bind();
  }

  update(data) {
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._city = data.city;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._fullPrice = data.fullPrice;
    this._offers = data.offers;
  }

  _processForm(formData) {
    const entry = {
      id: this._id,
      isFavorite: false,
      type: ``,
      city: ``,
      dateStart: ``,
      dateEnd: ``,
      price: this._price,
      fullPrice: 0,
      offers: this._offers,
      pictures: this._pictures,
      description: this._description
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

  static createMapper(target) {
    return {
      'favorite': (value) => {
        target.isFavorite = (value === `on`);
      },
      'travel-way': (value) => {
        target.type = value;
      },
      'destination': (value) => {
        target.city = value;
      },
      'date-start': (value) => {
        target.dateStart = value * 1000;
      },
      'date-end': (value) => {
        target.dateEnd = value * 1000;
      },
      'price': (value) => {
        target.fullPrice = parseInt(value, 10);
      },
      'offers': (value) => {
        target.offers = value;
      },
    };
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onDeleteButtonClick() {
    return (typeof this._onDelete === `function`) && this._onDelete(this._id);
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _onKeydownEsc(evt) {
    if (typeof this._onEsc === `function` && evt.keyCode === 27) {
      this._onEsc();
    }
  }

  set onKeydownEsc(fn) {
    this._onEsc = fn;
  }

  bind() {
    this._element.querySelector(`.point form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__button--delete`)
      .addEventListener(`click`, this._onDeleteButtonClick);

    this._element.querySelector(`.point__destination-input`)
      .addEventListener(`change`, this._onChangeDestination);

    this._element.querySelector(`.point__offers-wrap`)
      .addEventListener(`click`, this._onChangeOffers);

    this._element.querySelector(`.travel-way__select`)
      .addEventListener(`change`, this._onChangeType);

    document
      .addEventListener(`keydown`, this._onKeydownEsc);

    // Form Buttons
    this._buttonSave = this._element.querySelector(`.point__button--save`);
    this._buttonDelete = this._element.querySelector(`.point__button--delete`);

    const dateStartInput = this._element
      .querySelector(`.point__time .point__input[name="date-start"]`);

    const dateEndInput = this._element
      .querySelector(`.point__time .point__input[name="date-end"]`);

    // Date Field For New Trip Point
    this._element.querySelector(`.point__date .point__input`).flatpickr({
      'altInput': true,
      'altFormat': `M d`,
      'dateFormat': `U`,
      'defaultDate': this._dateStart,
      'onChange': function (data, string) {
        const selectedDate = moment.unix(Number(string));

        const newYear = parseInt(moment(selectedDate).format(`YYYY`), 10);
        const newMonth = parseInt(moment(selectedDate).format(`MM`), 10);
        const newDay = parseInt(moment(selectedDate).format(`DD`), 10);

        const newDateStartInput = moment.unix(dateStartInput.value)
          .set(`year`, newYear)
          .set(`month`, newMonth - 1)
          .set(`date`, newDay)
          .format(`X`);

        const newDateEndInput = moment.unix(dateEndInput.value)
          .set(`year`, newYear)
          .set(`month`, newMonth - 1)
          .set(`date`, newDay)
          .format(`X`);

        dateStartInput.value = newDateStartInput;
        dateEndInput.value = newDateEndInput;
      }
    });

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

    this._element.querySelector(`.point__destination-input`)
      .removeEventListener(`change`, this._onChangeDestination);

    this._element.querySelector(`.point__offers-wrap`)
      .removeEventListener(`click`, this._onChangeOffers);

    this._element.querySelector(`.travel-way__select`)
      .removeEventListener(`change`, this._onChangeType);

    document
      .removeEventListener(`keydown`, this._onKeydownEsc);
  }

  lockSave() {
    this._buttonDelete.disabled = true;
    this._buttonSave.disabled = true;
    this._buttonSave.textContent = `Saving...`;
  }

  unlockSave() {
    this._buttonDelete.disabled = false;
    this._buttonSave.disabled = false;
    this._buttonSave.textContent = `Save`;
  }

  lockDelete() {
    this._buttonDelete.disabled = true;
    this._buttonDelete.textContent = `Deleting...`;
  }

  unlockDelete() {
    this._buttonSave.disabled = false;
    this._buttonSave.textContent = `Delete`;
  }

  error() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  get template() {
    return `
      <article class="point">
        <form action="" method="get">
          <header class="point__header">
            <label class="point__date">
              choose day <input class="point__input" type="text" placeholder="MAR 18" name="day">
            </label>
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle-${this._id}">${TravelType[this._type.toUpperCase()]}</label>
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle-${this._id}">
              
              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi-${this._id}" name="travel-way" value="taxi" ${this._type === `taxi` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-taxi-${this._id}">🚕 taxi</label>
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus-${this._id}" name="travel-way" value="bus" ${this._type === `bus` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-bus-${this._id}">🚌 bus</label>
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train-${this._id}" name="travel-way" value="train" ${this._type === `train` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-train-${this._id}">🚂 train</label>
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight-${this._id}" name="travel-way" value="flight" ${this._type === `flight` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-flight-${this._id}">✈️ flight</label>
                </div>
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in-${this._id}" name="travel-way" value="check-in" ${this._type === `check-in` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-check-in-${this._id}">🏨 check-in</label>
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing-${this._id}" name="travel-way" value="sightseeing" ${this._type === `sightseeing` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-sightseeing-${this._id}">🏛 sightseeing</label>
                </div>
              </div>
            </div>
            
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${this._type} to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._city}" name="destination">
              ${this._createDestinations()}
            </div>
            
            <div class="point__time">
              choose time
              <input class="point__input" type="text" name="date-start" placeholder="19:00" data-time="${this._dateStart}">
              <input class="point__input" type="text" name="date-end" placeholder="21:00" data-time="${this._dateEnd}">
            </div>

            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._fullPrice}" name="price">
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
              <h3 class="point__details-title">Offers</h3>
              <div class="point__offers-wrap">
                ${this._createOffers()}
              </div>
            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._description}</p>
              ${this._createPictures()}
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>`.trim();
  }
}

export default TripPointEdit;

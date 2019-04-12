import Component from '../../helpers/component';
import flatpickr from 'flatpickr';
import {travelTypes} from '../../helpers/utils';
import "../../../node_modules/flatpickr/dist/flatpickr.css";
import "../../../node_modules/flatpickr/dist/themes/dark.css";

// Trip Point Edit Class
class TripPointEdit extends Component {
  constructor(data, destinations, allOffers) {
    super();
    this._id = data.id;
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._destination = data.destination;
    this._description = data.description;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._pictures = data.pictures;

    this._allOffers = allOffers;
    this._destinations = destinations;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onSubmit = null;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onDelete = null;
  }

  _createPictures() {
    const picturesList = this._pictures.map((picture) => `<img src="${picture.src}" alt="${picture.description}" class="point__destination-image">`);
    return `<div class="point__destination-images">${picturesList.join(``)}</div>`;
  }

  _createOffers() {
    const allOffers = [];
    for (let offerItem of this._offers) {
      const offerName = offerItem.title.split(` `).join(`-`).toLowerCase();
      allOffers.push(`<input class="point__offers-input visually-hidden" type="checkbox" id="${offerName}" name="offer" value="${offerName}" ${offerItem.accepted ? `checked` : ``}>
        <label for="${offerName}" class="point__offers-label">
        <span class="point__offer-service">${offerItem.title}</span> + €<span class="point__offer-price">${offerItem.price}</span>
      </label>`);
    }
    return `<div class="point__offers-wrap">${allOffers.join(``)}</div>`.trim();
  }

  _createDestination() {
    let options = [];
    let selectedOption;
    let destinationLabel;

    if (this._type.transport) {
      for (let destination of this._destinations) {
        options.push(destination.name);
      }
      selectedOption = this._destination;
      destinationLabel = `${this._type.name} to`;
    } else {
      options = travelTypes.filter((item) => !item.transport).map((item) => item.name.toLowerCase());
      selectedOption = (this._type.name === `Check-in`) ? `hotel` : this._type.name.toLowerCase();
      destinationLabel = `Check into`;
    }

    options = options.map((item) => `<option value="${item}">`);
    return `<div class="point__destination-wrap">
     <label class="point__destination-label" for="destination">${destinationLabel}</label>
      <input class="point__destination-input" list="destination-select" id="destination" value="${selectedOption}" name="destination">
      <datalist id="destination-select">${options.join(``)}</datalist>
    </div>`;
  }

  _createTravelWays(arrayTravelWays, selectedIcon) {
    const firstGroup = arrayTravelWays.filter((groupItem) => groupItem.transport)
      .map((groupItem) => {
        const itemName = groupItem.name.toLowerCase();
        return `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${itemName}" name="travel-way" value="${itemName}" ${selectedIcon === groupItem.icon ? `checked` : ``}>
        <label class="travel-way__select-label" for="travel-way-${itemName}">${groupItem.icon} ${itemName}</label>`.trim();
      }).join(``);
    const secondGroup = arrayTravelWays.filter((groupItem) => !groupItem.transport)
      .map((groupItem) => {
        const itemName = groupItem.name.toLowerCase();
        return `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${itemName}" name="travel-way" value="${itemName}" ${selectedIcon === groupItem.icon ? `checked` : ``}>
        <label class="travel-way__select-label" for="travel-way-${itemName}">${groupItem.icon} ${itemName}</label>`.trim();
      }).join(``);

    return `<div class="travel-way__select">
      <div class="travel-way__select-group">${firstGroup}</div>
      <div class="travel-way__select-group">${secondGroup}</div>
    </div>`.trim();
  }

  _onChangeType(evt) {
    // if (evt.target.classList.contains(`travel-way__select-input`)) {
    //   let val = evt.target.value;
    //   val = val[0].toUpperCase() + val.slice(1);
    //   for (let key of travelTypes) {
    //     if (key.name === val) {
    //       this._type = key;
    //       this._offers = this._allOffers.find((el) => {
    //         return el.type === key.name.toLocaleLowerCase();
    //       });
    //       if (!this._offers) {
    //         this._offers = [];
    //       } else {
    //         this._offers = this._offers.offers;
    //       }
    //       this._partialUpdate();
    //     }
    //   }
    // }
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
              <label class="travel-way__label" for="travel-way__toggle">${this._type.icon}</label>
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
              ${this._createTravelWays(travelTypes, this._type.icon)}
            </div>
            
            ${this._createDestination()}
        
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
              <h3 class="point__details-title">Offers</h3>
              ${this._createOffers()}
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

  update(data) {
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._destination = data.destination;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offers = data.offers;
  }

  _processForm(formData) {
    const entry = {
      id: this._id,
      isFavorite: false,
      type: ``,
      destination: ``,
      dateStart: ``,
      dateEnd: ``,
      price: 0,
      offers: this._offers,
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
      'type': (value) => {
        target.type = value;
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

    // TODO: remove
    console.log(newData);

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

  bind() {
    this._element.querySelector(`.point form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__button--delete`)
      .addEventListener(`click`, this._onDeleteButtonClick);

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
  }

  deleteError() {
    this._element.style.border = ``;
  }

  error() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    this._element.style.border = `1px solid red`;
    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }
}

export default TripPointEdit;

import Component from '../../helpers/component';
import * as moment from 'moment/moment';
import flatpickr from 'flatpickr';
import "../../../node_modules/flatpickr/dist/flatpickr.css";
import "../../../node_modules/flatpickr/dist/themes/dark.css";

// Trip Point Edit Class
class TripPointEdit extends Component {
  constructor(data) {
    super();
    this._types = [
      {icon: `🏨`, name: `Hotel`, transport: false},
      {icon: `🚗`, name: `Drive`, transport: true},
      {icon: `🚌`, name: `Bus`, transport: true},
      {icon: `🚂`, name: `Train`, transport: true},
      {icon: `🛳️`, name: `Ship`, transport: true},
      {icon: `🚊`, name: `Transport`, transport: true},
      {icon: `🏛️`, name: `Sightseeing`, transport: false},
      {icon: `🍴`, name: `Restaurant`, transport: false},
      {icon: `🚕`, name: `Taxi`, transport: true},
      {icon: `✈️`, name: `Flight`, transport: true},
    ];
    this._id = data.id;
    this._isFavorite = data.isFavorite;
    this._type = data.type;
    this._destination = data.destination;
    this.description = data.description;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._pictures = data.pictures;

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

  _makeImgies() {
    const imgies = this._destination.pictures.map((el) => `<img src="${el.src}" alt="${el.description}" class="point__destination-image">`);
    return `<div class="point__destination-images">
    ${imgies.join(``)}
  </div>`;
  }

  _makeDestination() {
    let options = [];
    let selectedOption;
    let labelText;
    if (this._type.transport) {
      for (let cityOfSet of this._destinations) {
        options.push(cityOfSet.name);
      }
      selectedOption = this._destination.name;
      labelText = `${this._type.name} to`;
    } else {
      options = this._types.filter((el) => !el.transport)
        .map((el) => el.name.toLowerCase());
      if (this._type.name === `Check-in`) {
        selectedOption = `hotel`;
      } else {
        selectedOption = this._type.name.toLowerCase();
      }
      labelText = `Check into`;
    }

    options = options.map((el) => `<option value="${el}">`);

    return `<div class="point__destination-wrap">
    <label class="point__destination-label" for="destination">${labelText}</label>
     <input class="point__destination-input" list="destination-select" id="destination" value="${selectedOption}" name="destination">
     <datalist id="destination-select">
      ${options.join(``)}
     </datalist>
   </div> `;
  }

  _makeTravelWays(arrayOfWays, selectedIcon) {
    const firstGroup = arrayOfWays.filter((el) => el.transport)
      .map((el) => {
        const lowName = el.name.toLowerCase();
        return `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${lowName}" name="travel-way" value="${lowName}" ${selectedIcon === el.icon ? `checked` : ``}>
        <label class="travel-way__select-label" for="travel-way-${lowName}">${el.icon} ${lowName}</label>`.trim();
      }).join(``);
    const secondGroup = arrayOfWays.filter((el) => !el.transport)
      .map((el) => {
        const lowName = el.name.toLowerCase();
        return `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${lowName}" name="travel-way" value="${lowName}" ${selectedIcon === el.icon ? `checked` : ``}>
        <label class="travel-way__select-label" for="travel-way-${lowName}">${el.icon} ${lowName}</label>`.trim();
      }).join(``);

    return `<div class="travel-way__select">
    <div class="travel-way__select-group">
          ${firstGroup}   
        </div>
        <div class="travel-way__select-group">
          ${secondGroup}    
        </div>
  </div>`.trim();
  }

  _makeOffers() {
    const allOffers = [];
    for (let offer of this._offers) {
      const classText = offer.title.split(` `).join(`-`).toLowerCase();
      allOffers.push(`<input class="point__offers-input visually-hidden" type="checkbox" id="${classText}" name="offer" value="${classText}" ${offer.accepted ? `checked` : ``}>
        <label for="${classText}" class="point__offers-label">
          <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
        </label>`);
    }
    return `<div class="point__offers-wrap">
        ${allOffers.join(``)}
      </div>`.trim();
  }

  _onChangeType(evt) {
    if (evt.target.classList.contains(`travel-way__select-input`)) {
      let val = evt.target.value;
      val = val[0].toUpperCase() + val.slice(1);
      for (let key of this._types) {
        if (key.name === val) {
          this._type = key;
          this._offers = this._allOffers.find((el) => {
            if (el.type === key.name.toLocaleLowerCase()) {
              return true;
            }
            return false;
          });
          if (!this._offers) {
            this._offers = [];
          } else {
            this._offers = this._offers.offers;
          }
          this._partialUpdate();
        }
      }
    }
  }

  _processForm(formData) {
    const entry = {
      id: this._id,
      isFavorite: false,
      travelWay: ``,
      destination: ``,
      dateStart: ``,
      dateEnd: ``,
      price: 0,
      totalPrice: 0,
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


  update(data) {
    this._isFavorite = data.isFavorite;
    this._travelWay = data.travelWay;
    this._destination = data.destination;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._price = data.price;
    this._offers = data.offers;
    // this.description = data.description;
    // this._pictures = data.pictures;
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
      'offers': (value) => {
        target.offers = value;
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
              <label class="travel-way__label" for="travel-way__toggle">${this._type.icon}</label>
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
              ${this._makeTravelWays(this._types, this._type.icon)}
            </div>
            
            ${this._makeDestination()}
        
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
                ${this._offers.map((offers, i) => `
                <input class="point__offers-input visually-hidden" type="checkbox" name="offer" id="offer-${i}" value="${offers.title} + €${offers.price}" ${offers.accepted && `checked`}>
                <label for="offer-${i}" class="point__offers-label">
                  <span class="point__offer-service">${offers.title}</span> + €<span class="point__offer-price">${offers.price}</span>
                </label>`.trim()).join(``)}
              </div>

            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._destination.description}</p>
              <div class="point__destination-images">
                ${this._pictures.map((picture) => `<img src="${picture.src}" alt="${picture.description}" class="point__destination-image">`.trim()).join(``)}
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

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  block(method) {
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

export default TripPointEdit;

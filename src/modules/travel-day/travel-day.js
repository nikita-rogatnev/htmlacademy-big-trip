import Component from '../../helpers/component';

class TravelDay extends Component {
  constructor(data) {
    super();
    this._date = data.split(` `);
  }

  get template() {
    return `<section class="trip-day">
    <article class="trip-day__info">
      <span class="trip-day__caption">Day</span>
      <p class="trip-day__number">${this._date[0]}</p>
      <h2 class="trip-day__title">${this._date[1]} ${this._date[2]}</h2>
    </article>
    <div class="trip-day__items"></div>
  </section>`.trim();
  }
}

export default TravelDay;

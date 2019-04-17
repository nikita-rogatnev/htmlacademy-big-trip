import Component from '../../helpers/component';

class TotalCost extends Component {
  constructor() {
    super();
    this._totalPrice = null;
  }

  getPrice(data) {
    // Calculate Trip Points Sum
    let tripPointPrice = 0;

    for (let point of data) {
      tripPointPrice += parseInt(point[`price`], 10);
    }

    // Calculate Offers Sum
    const offers = data
      .map((tripPoint) => tripPoint.offers
        .map((item) => parseInt(item.price, 10)))
      .flat();

    const offersPrice = offers.reduce((partialSum, a) => partialSum + a);
    this._totalPrice = tripPointPrice + offersPrice;

    return this._totalPrice;
  }

  get template() {
    return `<div>
      Total: 
      <span class="trip__total-cost">
        € ${this._totalPrice}
      </span>
    </div>`.trim();
  }
}

export default TotalCost;

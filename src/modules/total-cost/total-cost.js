import Component from '../../helpers/component';

class TotalCost extends Component {
  constructor(updatedPrice) {
    super();
    this._totalPrice = updatedPrice;
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

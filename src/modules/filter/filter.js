import {Component} from '../../component';

export class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._isChecked = data.checked;
    this._isDisabled = data.disabled;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  _onFilterClick(evt) {
    if (typeof this._onFilter === `function`) {
      this._onFilter(evt);
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `<span>
      <input type="radio" id="filter-${this._name.toLowerCase()}" name="filter" value="${this._name.toLowerCase()}" ${this._isChecked ? `checked` : ``} ${this._isDisabled ? `disabled` : ``}>
      <label class="trip-filter__item" for="filter-${this._name.toLowerCase()}">${this._name}</label>
    </span>`.trim();
  }

  bind() {
    this._element.querySelector(`.trip-filter__item`)
      .addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.querySelector(`.trip-filter__item`)
      .removeEventListener(`click`, this._onFilterClick);
  }
}

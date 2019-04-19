import Component from '../../helpers/component';

class Filter extends Component {
  constructor(data, type) {
    super();
    this._description = data.description;
    this._isChecked = data.isChecked;
    this._isDisabled = data.isDisabled;
    this._type = type;

    this._onClickFilter = this._onClickFilter.bind(this);
    this._onFilter = null;
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    const sortingTemplate = `<span id="${this._description.toLowerCase()}">
        <input type="radio" name="trip-sorting" id="sorting-${this._description.toLowerCase()}" value="${this._description.toLowerCase()}" ${this._isChecked ? `checked` : ``} ${this._isDisabled ? `disabled` : ``}>
            <label class="trip-sorting__item trip-sorting__item--${this._description.toLowerCase()}" for="sorting-${this._description.toLowerCase()}">${this._description}</label>
      </span>`.trim();

    const filtersTemplate = `<span id="${this._description.toLowerCase()}">
      <input type="radio" id="filter-${this._description.toLowerCase()}" name="filter" value="${this._description.toLowerCase()}" ${this._isChecked ? `checked` : ``} ${this._isDisabled ? `disabled` : ``}>
        <label class="trip-filter__item" for="filter-${this._description.toLowerCase()}">${this._description}</label>
    </span>`.trim();

    return (this._type === `sorting`) ? sortingTemplate : filtersTemplate;
  }

  _onClickFilter() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  bind() {
    this._element.querySelector(`label`)
      .addEventListener(`click`, this._onClickFilter);
  }

  unbind() {
    this._element.querySelector(`label`)
      .removeEventListener(`click`, this._onClickFilter);
  }
}

export default Filter;

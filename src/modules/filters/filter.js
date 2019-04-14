import Component from '../../helpers/component';

class Filter extends Component {
  constructor(text, isChecked = false) {
    super();
    this._text = text.toLowerCase();
    this._isChecked = isChecked;
    this._onChange = this._onChange.bind(this);
    this._onFilter = null;
  }

  _onChange(evt) {
    evt.preventDefault();
    if (typeof this._onFilter === `function`) {
      this._onFilter(evt);
    }
  }

  set onFilter(fn) {
    if (typeof fn === `function`) {
      this._onFilter = fn;
    }
  }

  get template() {
    return `<input type="radio" id="filter-${this._text}" name="filter" value="${this._text}" ${this._isChecked ? `checked` : ``}>
    <label class="trip-filter__item" for="filter-${this._text}">${this._text}</label>`.trim();
  }

  // bind() {
  //   console.log(this._element);
  //
  //   this._element.querySelector(`input[name="filter"]`)
  //     .addEventListener(`change`, this._onChange);
  // }
  //
  // unbind() {
  //   this._element.querySelector(`input[name="filter"]`)
  //     .removeEventListener(`change`, this._onChange);
  // }
}

export default Filter;

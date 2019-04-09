import {createElement} from './utils';

class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._container = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render(container) {
    this._element = createElement(this.template);
    this._container = container;
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
    this._container = null;
  }

  bind() {
    // Bind
  }

  unbind() {
    // Unbind
  }

  _partialUpdate() {
    this.unbind();
    this._element = createElement(this.template);
    this._container.replaceChild(this._element, this._element);
    this._element.remove();
    this.bind();
  }
}

export default Component;

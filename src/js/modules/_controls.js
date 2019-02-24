import * as dataControlElements from '../data/controls.json';

// Control Containers
const filterContainer = document.querySelector(`.trip-filter`);
const sortingContainer = document.querySelector(`.trip-sorting`);

// Filter Control Elements
const filterControlElements = dataControlElements.controls.filter((controlElement) => {
  return controlElement.type === `sorting`;
});

// Generate Sorted Control Elements
const generateControlElements = filterControlElements.map((controlElement) => {
  return `
    <input
      type="radio"
      id="${controlElement.type}-${controlElement.name.toLowerCase()}"
      name="${controlElement.type}"
      value="${controlElement.name.toLowerCase()}"
      ${controlElement.isChecked ? `checked` : ``}
	    ${controlElement.isDisabled ? `disabled` : ``}
    />
    <label
      for="${controlElement.type}-${controlElement.name.toLowerCase()}"
      class="trip-${controlElement.type}__item trip-${controlElement.type}__item--${controlElement.name.toLowerCase()}">
      ${controlElement.name}
    </label>
  `;
});

// Render Control Elements
const renderControlElements = (controlsType) => {
  if (controlsType === `filter`) {
    return filterContainer.insertAdjacentHTML(`beforeend`, generateControlElements.join(``));
  } else {
    return sortingContainer.insertAdjacentHTML(`beforeend`, generateControlElements.join(``));
  }
};

export default renderControlElements;

import * as dataControlElements from '../data/controls.json';

// Control Containers
const filterContainer = document.querySelector(`.trip-filter`);
const sortingContainer = document.querySelector(`.trip-sorting`);

// Render Control Elements
export const renderControlElements = (controlType) => {
  const container = controlType === `filter` ? filterContainer : sortingContainer;
  return container.insertAdjacentHTML(`beforeend`, generateControlElements(controlType));
};

// Filter And Generate Sorted Control Elements
// controlsType: filter || sorting
const generateControlElements = (controlType) => {
  return dataControlElements.controls
    .filter((controlElement) => controlElement.type === controlType)
    .map((controlElement) => {
      return `
        <input
          type="radio"
          id="${controlElement.type}-${controlElement.name.toLowerCase()}"
          name="${controlElement.type}"
          value="${controlElement.name.toLowerCase()}"
          ${controlElement.checked ? `checked` : ``}
          ${controlElement.disabled ? `disabled` : ``}
          />
        <label
          for="${controlElement.type}-${controlElement.name.toLowerCase()}"
          class="trip-${controlElement.type}__item trip-${controlElement.type}__item--${controlElement.name.toLowerCase()}">
          ${controlElement.name}
        </label>`;
    })
    .join(``);
};

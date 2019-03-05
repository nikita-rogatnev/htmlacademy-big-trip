import * as dataControlElements from './data.json';

// Control Containers
const filterContainer = document.querySelector(`.trip-filter`);
const sortingContainer = document.querySelector(`.trip-sorting`);

// Filter And Generate Sorted Control Elements
const generateControlElements = (controlType) => {

  // TODO: почему орет на .filter?
  return dataControlElements
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

// Render Control Elements
export const renderControlElements = (controlType) => {
  const container = controlType === `filter` ? filterContainer : sortingContainer;
  container.insertAdjacentHTML(`beforeend`, generateControlElements(controlType));
};

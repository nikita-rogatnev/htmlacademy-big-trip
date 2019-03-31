import {viewStatistics} from './view-statistics';

// Switch View
const switchContainer = document.querySelector(`.view-switch__items`);
const switchItems = document.querySelectorAll(`.view-switch__item`);
const mainContainer = document.querySelector(`.main`);
const statisticsContainer = document.querySelector(`.statistic`);

export const switchView = () => {
  switchContainer.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    switchItems.forEach((item) => {
      item.classList.remove(`view-switch__item--active`);
    });

    const activeItem = evt.target;
    activeItem.classList.add(`view-switch__item--active`);

    if (evt.target.textContent === `Stats`) {
      mainContainer.classList.add(`visually-hidden`);
      statisticsContainer.classList.remove(`visually-hidden`);
      viewStatistics();
    } else {
      mainContainer.classList.remove(`visually-hidden`);
      statisticsContainer.classList.add(`visually-hidden`);
    }
  });
};

import Api from './api';
import {renderFilters, renderTripPoints} from './views/view-trip-points';
import {switchView} from './views/switch-view';

// API
const AUTHORIZATION = `Basic wqe21fwq32WEF32CDWae2d=${Math.random()}`;
const API_URL = `https://es8-demo-srv.appspot.com/big-trip`;
export const api = new Api(API_URL, AUTHORIZATION);

// Navigation
switchView();

// Containers
const contentContainer = document.querySelector(`.main.content-wrap`);
const messageContainer = document.querySelector(`.message-container`);

export const fetchTripPoints = () => {
  return Promise.all([
    api.getTripPoints()
  ]);
};

const filtersList = [
  {name: `everything`},
  {name: `future`},
  {name: `past`}
];

fetchTripPoints()
  .then((data) => {
    messageContainer.classList.add(`visually-hidden`);
    contentContainer.classList.remove(`visually-hidden`);

    renderFilters(filtersList, data[0]);
    renderTripPoints(data[0]);
  });

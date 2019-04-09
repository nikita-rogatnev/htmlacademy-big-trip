import API from './helpers/api';
import createTripPoints from './modules/trip-points/trip-points';
import createFilters from './modules/filters/filters';
import createStatistics from './modules/statistics/statistics';

// API
const AUTHORIZATION = `Basic wqe21fwq32WEF32CDWae2d=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const tripDayContainer = document.querySelector(`.trip-day__items`);
const mainContainer = document.querySelector(`.main`);
const statisticsContainer = document.querySelector(`.statistic`);

const filtersNames = [`everything`, `future`, `past`];
const switchContainer = document.querySelector(`.view-switch__items`);
const switchItems = document.querySelectorAll(`.view-switch__item`);

const renderTripPoints = (filter, filterId) => {
  tripDayContainer.innerHTML = `Loading route...`;

  let allTripPoints;
  let allOffers;

  api.getTripPoints()
    .then((points) => {
      if (filter) {
        allTripPoints = filter(filterId, points);
      } else {
        allTripPoints = points;
      }
      api.getOffers()
        .then((offers) => {
          allOffers = offers;
          api.getDestinations()
            .then((destinations) => {
              createTripPoints(destinations, allTripPoints, allOffers, api);
            });
          // .catch(() => {
          //   tripDayContainer.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later`;
          // });
        });
    });
};

renderTripPoints();
createFilters(filtersNames, renderTripPoints, api);

// // Switch View Controller
// switchContainer.addEventListener(`click`, (evt) => {
//   evt.preventDefault();
//
//   switchItems.forEach((item) => {
//     item.classList.remove(`view-switch__item--active`);
//   });
//
//   const activeItem = evt.target;
//   activeItem.classList.add(`view-switch__item--active`);
//
//   if (evt.target.textContent === `Stats`) {
//     mainContainer.classList.add(`visually-hidden`);
//     statisticsContainer.classList.remove(`visually-hidden`);
//     createStatistics();
//   } else {
//     mainContainer.classList.remove(`visually-hidden`);
//     statisticsContainer.classList.add(`visually-hidden`);
//   }
// });

import API from './api';
import Provider from "./provider";
import Store from "./store";

import TripPoint from './modules/trip-points/trip-point';
import TripPointEdit from './modules/trip-points/trip-point-edit';
import TravelDay from './modules/travel-day/travel-day';

import moment from 'moment';

import createFilters from './modules/filters/filters';
import createStatistics from './modules/statistics/statistics';

// API
const AUTHORIZATION = `Basic wqe21fwq32WEF32CDWae2d=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const STORE_KEY = `store-key`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: STORE_KEY, storage: localStorage});
const generateId = Date.now() + Math.random();
const provider = new Provider({api, store, generateId});


const tripDayContainer = document.querySelector(`.trip-points`);
const mainContainer = document.querySelector(`.main`);
const statisticsContainer = document.querySelector(`.statistic`);

const filtersNames = [`everything`, `future`, `past`];
const switchContainer = document.querySelector(`.view-switch__items`);
const switchItems = document.querySelectorAll(`.view-switch__item`);

const newTripPointButton = document.querySelector(`.new-event`);
const totalPriceContainer = document.querySelector(`.trip__total-cost`);

// Render Trip Points
tripDayContainer.innerHTML = `Loading route...`;

let tripPoints = null;
let eventsDestination = null;
let eventsOffers = null;

const renderTripPoints = (data, dist) => {
  dist.innerHTML = ``;

  for (let tripPoint of data) {
    let tripPointComponent = new TripPoint(tripPoint);
    let tripPointEditComponent = new TripPointEdit(tripPoint, eventsOffers, eventsDestination);

    // Enter Trip Point Edit Mode
    tripPointComponent.onEdit = () => {
      tripPointEditComponent.render(tripDayContainer);
      dist.replaceChild(tripPointEditComponent.element, tripPointComponent.element);
      tripPointComponent.unrender();
    };

    // Submit Edited Trip Point
    tripPointEditComponent.onSubmit = (newData) => {
      // item.type = newData.type;
      // item.city = newData.city;
      // item.offers = newData.offers;
      // item.price = newData.price;
      // item.timeline = newData.timeline;
      // item.favorite = newData.favorite;
      //
      // trip.lockToSaving();
      // provider.updatePoint({id: item.id, data: item.toRAW()})
      //   .then((response) => {
      //     if (response) {
      //       point.update(response);
      //       point.render();
      //       dist.replaceChild(point.element, trip.element);
      //     }
      //   })
      //   .catch(() => {
      //     trip.shake();
      //     trip.element.style.border = `1px solid #ff0000`;
      //   })
      //   .then(() => {
      //     trip.unlockToSave();
      //     trip.destroy();
      //   });
      //
      // getTotalPrice(points);
    };

    // Delete Trip Point
    tripPointEditComponent.onDelete = (id) => {
      tripPointEditComponent.lockDelete();

      provider.deleteTripPoint({id})
        .then(() => provider.getTripPoints())
        .then(renderDays)
        .then(() => {
          tripPointEditComponent.unlockDelete();
          tripPointEditComponent.unrender();
        })
        .catch(() => {
          tripPointEditComponent.error();
          tripPointEditComponent.element.style.border = `1px solid red`;
        })
        .then(() => {
          tripPointEditComponent.unlockDelete();
          tripPointEditComponent.unrender();
        });

      tripPoints.splice(id, 1);

      getTotalPrice(tripPoints);
    };

    // Exit Trip Point Edit Mode
    tripPointEditComponent.onKeydownEsc = () => {
      tripPointComponent.render(tripDayContainer);
      dist.replaceChild(tripPointComponent.element, tripPointEditComponent.element);
      tripPointEditComponent.unrender();
    };

    dist.appendChild(tripPointComponent.render(tripDayContainer));
  }
};

const getSortedTripPointsByDay = (points) => {
  let result = {};
  for (let point of points) {
    const day = moment(point.dateStart).format(`D MMM YY`);

    if (!result[day]) {
      result[day] = [];
    }

    result[day].push(point);
  }

  return result;
};

const renderDays = (days) => {
  tripDayContainer.innerHTML = ``;
  const pointSortedDay = getSortedTripPointsByDay(days);

  Object.entries(pointSortedDay).forEach((points) => {
    const [day, eventList] = points;
    const dayTripPoints = new TravelDay(day).render();

    tripDayContainer.appendChild(dayTripPoints);

    const distEvents = dayTripPoints.querySelector(`.trip-day__items`);
    renderTripPoints(eventList, distEvents);
  });
};

// Create New Trip Point
newTripPointButton.addEventListener(`click`, () => {
  const tripPointMockData = {
    id: null,
    type: {typeName: `taxi`, icon: `🚕`},
    city: ``,
    destination: [],
    price: 0,
    dateStart: Date.now(),
    dateEnd: Date.now(),
    pictures: [],
    offers: [],
    description: ``,
    isFavorite: false,
  };

  const convertNewTripPointData = (data) => {
    return {
      'type': data.type,
      'base_price': data.price,
      'destination': data.destination,
      'date_from': data.dateStart,
      'date_to': data.dateEnd,
      'offers': data.offers,
      'is_favorite': data.favorite,
    };
  };

  newTripPointButton.disabled = true;
  let tripPointEditComponent = new TripPointEdit(tripPointMockData, eventsOffers, eventsDestination);
  tripDayContainer.insertBefore(tripPointEditComponent.render(), tripDayContainer.firstChild);

  tripPointEditComponent.onSubmit = (newData) => {
    tripPointEditComponent.lockSave();
    provider.createTripPoint({point: convertNewTripPointData(newData)})
      .then((newPoint) => {
        tripPointEditComponent.unlockSave();
        tripPoints.push(newPoint);
        getTotalPrice(tripPoints);
        renderDays(tripPoints);
      })
      .catch(() => {
        tripPointEditComponent.error();
        tripPointEditComponent.element.style.border = `1px solid red`;
      })
      .then(() => {
        tripPointEditComponent.element.style.border = ``;
        newTripPointButton.disabled = false;
      });
  };

  tripPointEditComponent.onDelete = () => {
    tripPointEditComponent.lockDelete();
    tripPointEditComponent.unrender();
    renderDays(tripPoints);
    newTripPointButton.disabled = false;
  };

  tripPointEditComponent.onKeydownEsc = () => {
    tripPointEditComponent.unlockDelete();
    tripPointEditComponent.unrender();
    renderDays(tripPoints);
    newTripPointButton.disabled = false;
  };
});

// Get Trip Points, Destinations And Offers
document.addEventListener(`DOMContentLoaded`, () => {
  Promise.all([provider.getTripPoints(), provider.getDestinations(), provider.getOffers()])
    .then(([responseTripPoints, responseDestinations, responseOffers]) => {
      tripPoints = responseTripPoints;
      eventsDestination = responseDestinations;
      eventsOffers = responseOffers;
      getTotalPrice(tripPoints);
      renderDays(tripPoints);
    })
    .catch(() => {
      tripDayContainer.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later`;
    });
});

createFilters(filtersNames, api);

// Calculate Total Price In trip__total-cost
const getTotalPrice = (points) => {
  let totalPrice = 0;

  for (let point of points) {
    totalPrice += +point[`price`];
  }

  totalPriceContainer.textContent = `€ ${totalPrice}`;
};

// Switch View Controller
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
    createStatistics();
  } else {
    mainContainer.classList.remove(`visually-hidden`);
    statisticsContainer.classList.add(`visually-hidden`);
  }
});

// Offline
window.addEventListener(`offline`, () => {
  document.title = `${document.title} [OFFLINE]`;
});

// Online
window.addEventListener(`online`, () => {
  document.title = document.title.split(` [OFFLINE]`)[0];
  provider.syncTripPoints();
});

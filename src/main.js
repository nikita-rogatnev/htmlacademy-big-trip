import {Filter} from './modules/filter/filter';
import {TripDay} from './modules/trip-points/trip-day';
import {tripPointsData} from './modules/trip-points/data';
import {TripPoint} from './modules/trip-points/trip-point';
import {TripPointEdit} from './modules/trip-points/trip-point-edit';
import {getStatistics} from './modules/statistics/statistics';

// Trip Day
const tripDayContainer = document.querySelector(`.trip-day__info`);
const tripDayComponent = new TripDay(tripPointsData);

tripDayContainer.appendChild(tripDayComponent.render());

// Filters
const filtersContainer = document.querySelector(`.trip-filter`);

export const filters = [
  {caption: `Everything`},
  {caption: `Future`},
  {caption: `Past`}
];

const filterList = (items, name) => {
  switch (name) {
    case `filter-everything`:
      return items;

    case `filter-future`:
      return items.filter((item) => item.day > Date.now());

    case `filter-past`:
      return items.filter((item) => item.day < Date.now());

    default:
      return items;
  }
};

const renderFilterItems = (items) => {
  filtersContainer.innerHTML = ``;

  for (let i = 0; i < items.length; i++) {
    const item = filters[i];
    const itemComponent = new Filter(item);
    filtersContainer.appendChild(itemComponent.render());

    itemComponent.onFilter = (evt) => {
      const filterName = evt.target.htmlFor;
      const filteredPoints = filterList(tripPointsData, filterName);

      renderTripPoints(filteredPoints);
    };
  }
};

renderFilterItems(filters);

// Trip Points
const tripPointsContainer = document.querySelector(`.trip-day__items`);

const deleteTripPoint = (items, i) => {
  items.splice(i, 1);
};

const renderTripPoints = (items) => {
  tripPointsContainer.innerHTML = ``;

  for (let i = 0; i < items.length; i++) {
    const point = items[i];
    const tripPointComponent = new TripPoint(point);
    const tripPointEditComponent = new TripPointEdit(point);

    tripPointComponent.onEdit = () => {
      tripPointEditComponent.render();
      tripPointsContainer.replaceChild(tripPointEditComponent.element, tripPointComponent.element);
      tripPointComponent.unrender();
    };

    tripPointEditComponent.onSubmit = (newObject) => {
      point.favorite = newObject.favorite;
      point.travelWay = newObject.travelWay;
      point.destination = newObject.destination;
      point.dateStart = newObject.dateStart;
      point.dateEnd = newObject.dateEnd;
      point.price = newObject.price;
      point.offer = newObject.offer;

      tripPointComponent.update(point);
      tripPointComponent.render();
      tripPointsContainer.replaceChild(tripPointComponent.element, tripPointEditComponent.element);
      tripPointEditComponent.unrender();
    };

    tripPointEditComponent.onDelete = () => {
      deleteTripPoint(items, i);
      tripPointEditComponent.unrender();
      renderTripPoints(items);
    };

    tripPointsContainer.appendChild(tripPointComponent.render());
  }
};

const toggleFilter = (element) => {
  let items = element.querySelectorAll(`.view-switch__item`);

  items.forEach((item) => {
    if (item.classList.contains(`.view-switch__item--active`)) {
      item.classList.remove(`view-switch__item--active`);
    } else {
      item.classList.add(`view-switch__item--active`);
    }
  });
};

renderTripPoints(tripPointsData);

// Statistics
const container = document.querySelector(`.main`);
const viewSwitch = document.querySelector(`.view-switch__items`);
const statistics = document.querySelector(`.statistic`);

viewSwitch.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (evt.target.textContent === `Stats`) {
    container.classList.add(`visually-hidden`);
    statistics.classList.remove(`visually-hidden`);
    getStatistics();
  } else {
    container.classList.remove(`visually-hidden`);
    statistics.classList.add(`visually-hidden`);
  }

  toggleFilter(viewSwitch);
});

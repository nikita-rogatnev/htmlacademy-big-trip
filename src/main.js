// import Api from './api';
// import {Filter} from './modules/filter/filter';
// import {TripDay} from './modules/trip-points/trip-day';
// import {tripPointsData} from './modules/trip-points/data';
// import {TripPoint} from './modules/trip-points/trip-point';
// import {TripPointEdit} from './modules/trip-points/trip-point-edit';


// Init Switch View
import {switchView} from './views/switch-view';
switchView();

//
// // Trip Day
// const tripDayContainer = document.querySelector(`.trip-day__info`);
// const tripDayComponent = new TripDay(tripPointsData);
//
// tripDayContainer.appendChild(tripDayComponent.render());
//
// // Filters
// const filtersContainer = document.querySelector(`.trip-filter`);
//
// export const filters = [
//   {caption: `Everything`},
//   {caption: `Future`},
//   {caption: `Past`}
// ];
//
// const filterList = (tasks, filterName) => {
//   let filteredPoints;
//
//   switch (filterName) {
//     case `filter-everything`:
//       filteredPoints = tasks;
//       break;
//
//     case `filter-future`:
//       filteredPoints = tasks.filter((it) => it.date > Date.now());
//       break;
//
//     case `past`:
//       filteredPoints = tasks.filter((it) => it.date < Date.now());
//       break;
//   }
//
//   return filteredPoints;
// };
//
// const renderFilterItems = (items) => {
//   filtersContainer.innerHTML = ``;
//
//   for (let i = 0; i < items.length; i++) {
//     const item = filters[i];
//     const itemComponent = new Filter(item);
//     filtersContainer.appendChild(itemComponent.render());
//
//     itemComponent.onFilter = (evt) => {
//       const filterName = evt.target.htmlFor;
//       const filteredPoints = filterList(tripPointsData, filterName);
//
//       renderTripPoints(filteredPoints);
//     };
//   }
// };
//
// renderFilterItems(filters);
//
// // Trip Points
// const tripPointsContainer = document.querySelector(`.trip-day__items`);
//
// const deleteTripPoint = (items, i) => {
//   items.splice(i, 1);
// };
//
// const renderTripPoints = (items) => {
//   tripPointsContainer.innerHTML = ``;
//
//   for (let i = 0; i < items.length; i++) {
//     const point = items[i];
//     const tripPointComponent = new TripPoint(point);
//     const tripPointEditComponent = new TripPointEdit(point);
//
//     tripPointComponent.onEdit = () => {
//       tripPointEditComponent.render();
//       tripPointsContainer.replaceChild(tripPointEditComponent.element, tripPointComponent.element);
//       tripPointComponent.unrender();
//     };
//
//     tripPointEditComponent.onSubmit = (newObject) => {
//       point.isDone = newObject.isDone;
//       point.isFavorite = newObject.isFavorite;
//       point.travelWay = newObject.travelWay;
//       point.destination = newObject.destination;
//       point.dateStart = newObject.dateStart;
//       point.dateEnd = newObject.dateEnd;
//       point.price = newObject.price;
//       point.offer = newObject.offer;
//
//       tripPointComponent.update(point);
//       tripPointComponent.render();
//       tripPointsContainer.replaceChild(tripPointComponent.element, tripPointEditComponent.element);
//       tripPointEditComponent.unrender();
//     };
//
//     tripPointEditComponent.onDelete = () => {
//       deleteTripPoint(items, i);
//       tripPointEditComponent.unrender();
//       renderTripPoints(items);
//     };
//
//     tripPointsContainer.appendChild(tripPointComponent.render());
//   }
// };
//
// renderTripPoints(tripPointsData);

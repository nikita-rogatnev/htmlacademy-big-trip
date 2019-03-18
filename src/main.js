import {renderControlElements} from './modules/controls/controls';
import {stubTripPoints as tripPoint} from './modules/trip-points/data';
import {TripDay} from './modules/trip-points/trip-day';
import {TripPoint} from './modules/trip-points/trip-point';
import {TripPointEdit} from './modules/trip-points/trip-point-edit';
import moment from 'moment';

// Control Elements
renderControlElements(`filter`);
renderControlElements(`sorting`);

// Trip Day
const tripDayContainer = document.querySelector(`.trip-day__info`);
const tripDayComponent = new TripDay(tripPoint);
tripDayContainer.appendChild(tripDayComponent.render());

// Trip Points
const tripPointsContainer = document.querySelector(`.trip-day__items`);
const tripPointsComponent = new TripPoint(tripPoint);
const editTripPointsComponent = new TripPointEdit(tripPoint);

tripPointsContainer.appendChild(tripPointsComponent.render());

tripPointsComponent.onEdit = () => {
  editTripPointsComponent.render();
  tripPointsContainer.replaceChild(editTripPointsComponent.element, tripPointsComponent.element);
  tripPointsComponent.unrender();
};

editTripPointsComponent.onSubmit = (newObject) => {
  tripPoint.favorite = newObject.favorite;
  tripPoint.destination = newObject.destination;
  tripPoint.day = newObject.day;
  tripPoint.time = newObject.time;
  tripPoint.timeDuration = newObject.timeDuration;
  tripPoint.price = newObject.price;
  tripPoint.offer = newObject.offer;

  // TODO: плохо ли тут держать подобную логику?
  const dayContainer = document.querySelector(`.trip-day .trip-day__title`);
  dayContainer.innerHTML = moment(tripPoint.day).format(`MMM DD`);

  tripPointsComponent.update(tripPoint);
  tripPointsComponent.render();
  tripPointsContainer.replaceChild(tripPointsComponent.element, editTripPointsComponent.element);
  editTripPointsComponent.unrender();
};

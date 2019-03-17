import {renderControlElements} from './modules/controls/controls';
import {stubTripPoints as tripPoint} from './modules/trip-points/data';
import {TripPoint} from './modules/trip-points/trip-point';
import {TripPointEdit} from './modules/trip-points/trip-point-edit';

// Control Elements
renderControlElements(`filter`);
renderControlElements(`sorting`);

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
  tripPoint.destinationTitle = newObject.destinationTitle;
  tripPoint.timeTableFrom = newObject.timeTableFrom;
  tripPoint.timeTableTo = newObject.timeTableTo;
  tripPoint.price = newObject.price;
  tripPoint.offers = newObject.offers;

  tripPointsComponent.update(tripPoint);
  tripPointsComponent.render();
  tripPointsContainer.replaceChild(tripPointsComponent.element, editTripPointsComponent.element);
  editTripPointsComponent.unrender();
};

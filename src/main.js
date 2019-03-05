import {renderControlElements} from './modules/controls/controls';
import {stubTripPoints} from './modules/trip-points/stub-trip-points';
import {TripPoint} from './modules/trip-points/trip-point';
import {TripPointEdit} from './modules/trip-points/trip-point-edit';

// Control Elements
renderControlElements(`filter`);
renderControlElements(`sorting`);

// Trip Points
const tripPointsContainer = document.querySelector(`.trip-day__items`);
const tripPointsComponent = new TripPoint(stubTripPoints);
const editTripPointsComponent = new TripPointEdit(stubTripPoints);

tripPointsContainer.appendChild(tripPointsComponent.render());

tripPointsComponent.onEdit = () => {
  editTripPointsComponent.render();
  tripPointsContainer.replaceChild(editTripPointsComponent.element, tripPointsComponent.element);
  tripPointsComponent.unRender();
};

editTripPointsComponent.onSubmit = () => {
  tripPointsComponent.render();
  tripPointsContainer.replaceChild(tripPointsComponent.element, editTripPointsComponent.element);
  editTripPointsComponent.unRender();
};

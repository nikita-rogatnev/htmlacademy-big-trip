import {renderTasks, renderTripPoints} from './modules/points';
import {renderControlElements} from './modules/controls';

// Render Control Elements
renderControlElements(`filter`);
renderControlElements(`sorting`);

// Trip Points Container
const tripPointsContainer = document.querySelector(`.trip-day__items`);

// Render Trip Points
renderTasks(tripPointsContainer, 2);

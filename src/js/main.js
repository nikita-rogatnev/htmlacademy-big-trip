import {renderControlElements} from './modules/controls';
import {renderTripPoints} from './modules/points';

// Trip Points Container
const tripPointsContainer = document.querySelector(`.trip-day__items`);

// Render Control Elements
renderControlElements(`filter`);
renderControlElements(`sorting`);

/*
Render Trip Points
If real data - render from points-list.json
If stub stub - render from stubTripPoints()
Use: renderTasks(container, stub tripPoints number);
*/

renderTripPoints(tripPointsContainer);
renderTripPoints(tripPointsContainer, 5);

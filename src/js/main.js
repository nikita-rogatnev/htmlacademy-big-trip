import {renderTasks} from './modules/points';
import {renderControlElements} from './modules/controls';

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
renderTasks(tripPointsContainer);
renderTasks(tripPointsContainer, 5);

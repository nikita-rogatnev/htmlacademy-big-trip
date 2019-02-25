import * as dataTripPoints from '../data/points.json';

// Trip Points Container
const tripPointsContainer = document.querySelector(`.trip-day__items`);

// Render Trip Points
export const renderTripPoints = () => {
  return tripPointsContainer.insertAdjacentHTML(`beforeend`, generateTripPoints);
};

// Filter And Generate Trip Points
const generateTripPoints = dataTripPoints.points
  .map((tripPoint) => {
    return `
      <article class="trip-point">
        <i class="trip-icon">${tripPoint.icon}</i>
        <h3 class="trip-point__title">${tripPoint.title}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${tripPoint.timetable}</span>
          <span class="trip-point__duration">${tripPoint.duration}</span>
        </p>
        <p class="trip-point__price">${tripPoint.price}</p>
        <ul class="trip-point__offers">
          <li>
            <button class="trip-point__offer">${tripPoint.offers[0].offer}</button>
          </li>
          <li>
            <button class="trip-point__offer">${tripPoint.offers[1].offer}</button>
          </li>
        </ul>
      </article>`;
  })
  .join(``);

import {TripPoint} from '../modules/trip-points/trip-point';
import {TripPointEdit} from '../modules/trip-points/trip-point-edit';
import {Filter} from '../modules/filter/filter';
import {api} from '../main';

const filterPoints = (points, filterName) => {
  switch (filterName) {
    case `everything`:
      return points;

    case `future`:
      return points.filter((it) => it.time > Date.now());

    case `past`:
      return points.filter((it) => it.time < Date.now());

    default:
      return points;
  }
};

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);

export const renderFilters = (filters, points) => {
  filtersContainer.innerHTML = ``;

  filters.forEach((filter) => {
    const filterComponent = new Filter(filter);
    filtersContainer.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {
      const filteredPoints = filterPoints(points, filterComponent.name);
      renderTripPoints(filteredPoints);
    };
  });
};

export const renderTripPoints = (points) => {
  tripPointsContainer.innerHTML = ``;

  points.forEach((point) => {
    const tripPoint = new TripPoint(point);
    const tripPointEdit = new TripPointEdit(point);

    tripPointsContainer.appendChild(tripPoint.render());

    tripPoint.onClick = () => {
      tripPointEdit.render();
      tripPointsContainer.replaceChild(tripPointEdit.element, tripPoint.element);
      tripPoint.unrender();
    };

    tripPointEdit.onSubmit = (newObject) => {
      point.isDone = newObject.isDone;
      point.isFavorite = newObject.isFavorite;
      point.travelWay = newObject.travelWay;
      point.destination = newObject.destination;
      point.dateStart = newObject.dateStart;
      point.dateEnd = newObject.dateEnd;
      point.price = newObject.price;
      point.offer = newObject.offer;

      tripPointEdit.block(`save`);
      tripPointEdit.showBorder();

      api.updateTripPoint({id: point.id, data: point.toRAW()})
        .then((newPoint) => {
          tripPointEdit.unblock();
          tripPoint.update(newPoint);
          tripPoint.render();
          tripPointsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
          tripPointEdit.unrender();
        })
        .catch(() => {
          tripPointEdit.shake();
          tripPointEdit.unblock();
          tripPointEdit.showBorder(true);
        });
    };

    tripPointEdit.onDelete = (id) => {
      tripPointEdit.block();
      tripPointEdit.showBorder();

      api.deleteTripPoint(id)
        .then(() => tripPointEdit.unrender())
        .catch(() => {
          tripPointEdit.shake();
          tripPointEdit.unblock();
          tripPointEdit.showBorder(true);
        });
    };
  });
};

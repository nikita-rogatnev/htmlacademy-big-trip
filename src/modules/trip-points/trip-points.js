import TripPoint from './trip-point';
import TripPointEdit from './trip-point-edit';

const createTripPoints = (destinations, points, allOffers, api) => {
  const containerTripPoints = document.querySelector(`.trip-day__items`);
  containerTripPoints.innerHTML = ``;

  for (let point of points) {
    const tripPointComponent = new TripPoint(point);
    const tripPointEditComponent = new TripPointEdit(point, destinations, allOffers);

    containerTripPoints.appendChild(tripPointComponent.render(containerTripPoints));

    tripPointComponent.onEdit = () => {
      tripPointEditComponent.render(containerTripPoints);
      containerTripPoints.replaceChild(tripPointEditComponent.element, tripPointComponent.element);
      tripPointComponent.unrender();
    };

    tripPointEditComponent.onSubmit = (newData) => {
      const buttonSave = tripPointEditComponent.element.querySelector(`.point__button[type="submit"]`);
      const buttonDelete = tripPointEditComponent.element.querySelector(`.point__button[type="reset"]`);

      const block = () => {
        buttonSave.disabled = true;
        buttonDelete.disabled = true;
        buttonSave.textContent = `Saving...`;
      };

      const unblock = () => {
        buttonSave.disabled = false;
        buttonDelete.disabled = false;
        buttonSave.textContent = `Save`;
      };

      tripPointEditComponent.deleteError();
      block();

      for (let key in newData) {
        if (newData.hasOwnProperty(key)) {
          point[key] = newData[key];
        }
      }

      api.updateTripPoint({id: point.id, data: point.toRAW()})
        .then((newPoint) => {
          tripPointComponent.update(newPoint);
          tripPointComponent.render(containerTripPoints);
          containerTripPoints.replaceChild(tripPointComponent.element, tripPointEditComponent.element);
          tripPointEditComponent.unrender();
          unblock();
        })
        .catch(() => {
          tripPointEditComponent.error();
          unblock();
        });
    };

    tripPointEditComponent.onDelete = (id) => {
      const buttonSave = tripPointEditComponent.element.querySelector(`.point__button[type="submit"]`);
      const buttonDelete = tripPointEditComponent.element.querySelector(`.point__button[type="reset"]`);

      const block = () => {
        buttonSave.disabled = true;
        buttonDelete.disabled = true;
        buttonSave.textContent = `Deleting...`;
      };
      const unblock = () => {
        buttonSave.disabled = false;
        buttonDelete.disabled = false;
        buttonSave.textContent = `Delete`;
      };

      tripPointEditComponent.deleteError();
      block();

      api.deleteTripPoint({id})
        .then(() => api.getTripPoints())
        .then((newPoints) => {
          createTripPoints(destinations, newPoints, allOffers, api);
        })
        .catch(() => {
          tripPointEditComponent.error();
          unblock();
        });
    };
  }
};

export default createTripPoints;

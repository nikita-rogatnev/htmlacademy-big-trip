import * as dataTripPoints from '../data/points-list.json';
import * as moment from '../libs/moment';

export const iconsList = {
  taxi: `🚕`,
  bus: `🚌`,
  train: `🚂`,
  ship: `🛳`,
  transport: `🚊`,
  drive: `🚗`,
  flight: `✈`,
  checkIn: `🏨`,
  sightseeing: `🏛️`,
  restaurant: `🍴`,
};

const generateStubTripPoint = () => ({
  icon: iconsList[Math.floor(Math.random() * 10)],
  title: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ][Math.floor(Math.random() * 3)],
  timeTable: {
    from: `10:00`,
    to: `14:36`
  },
  get getDurationTime() {
    const timeFrom = moment.utc(this.timeTable.from, `HH:mm`);
    const timeTo = moment.utc(this.timeTable.to, `HH:mm`);
    return moment.utc(+moment.duration(timeTo.diff(timeFrom))).format(`H[H] mm[M]`);
  },
  price: `20`,
  offersList: [
    `Add luggage`,
    `Switch to comfort class`,
    `Add meal`,
    `Choose seats`
  ],
  get getOffers() {
    return this.offersList.map((offer) => `<li><button class="trip-point__offer">${offer}</button></li>`).join(``);
  },
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
});

// Generate Trip Points
const generateTripPoints = (tripPoint) => {
  return `
    <article class="trip-point">
      <i class="trip-icon">${tripPoint.icon}</i>
      <h3 class="trip-point__title">${tripPoint.title}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${tripPoint.timeTable.from} &nbsp;&mdash; ${tripPoint.timeTable.to}</span>
        <span class="trip-point__duration">${tripPoint.getDurationTime}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp; ${tripPoint.price}</p>
      <ul class="trip-point__offers">
        ${tripPoint.getOffers}
      </ul>
    </article>`;
};


/*
Render Trip Points
If real data - render from points-list.json (dataTripPoints)
If stub stub - render from generateStubTripPoint()
*/
export const renderTasks = (dist, amount) => {
  if (amount) {
    return dist.insertAdjacentHTML(`beforeend`, new Array(amount)
      .fill(generateTripPoints(generateStubTripPoint()))
      .join(``));
  }

  return dist.insertAdjacentHTML(`beforeend`, generateTripPoints(dataTripPoints.map())
    .join(``));
};


import * as dataTripPoints from '../data/points-list.json';
import {emojiList, getDurationTime} from '../libs/helpers';

// Trip Points Stub Data
const stubTripPoints = () => ({
  get icon() {
    return `checkIn`;
  },
  get title() {
    const titleList = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                       Cras aliquet varius magna, non porta ligula feugiat eget.
                       Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
                       Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
                       Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
                       Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
                       Sed sed nisi sed augue convallis suscipit in sed felis.
                       Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
                       In rutrum ac purus sit amet tempus.`;
    const titlesArray = titleList.replace(/([.?!])\s*(?=[A-Z])/g, `$1|`).split(`|`);
    const titlesNumber = Math.floor(Math.random() * Math.floor(3) + 1);
    const stubTitles = titlesArray.sort(() => 0.5 - Math.random()).slice(0, titlesNumber);
    return stubTitles.join(` `);
  },
  timeTable: {
    from: `10:00`,
    to: `14:36`
  },
  get price() {
    return Math.floor(Math.random() * Math.floor(100));
  },
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  offersList: [
    `Add luggage`,
    `Switch to comfort class`,
    `Add meal`,
    `Choose seat`
  ],
  get offers() {
    const offersArray = this.offersList;
    const offersNumber = Math.floor(Math.random() * Math.floor(3));
    const formattedOffersArray = offersArray.map((offer) => `<li><button class="trip-point__offer">${offer}</button></li>`);
    const stubOffers = formattedOffersArray.sort(() => 0.5 - Math.random()).slice(0, offersNumber);
    return stubOffers.join(``);
  }
});

// Generate Trip Points
const generateTripPoints = (tripPoint) => {
  return `
    <article class="trip-point">
      <i class="trip-icon">${emojiList[tripPoint.icon]}</i>
      <h3 class="trip-point__title">${tripPoint.title}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${tripPoint.timeTable.from} &nbsp;&mdash; ${tripPoint.timeTable.to}</span>
        <span class="trip-point__duration">
          ${getDurationTime(tripPoint.timeTable.from, tripPoint.timeTable.to)}
        </span>
        <img src="${tripPoint.picture}" alt="${tripPoint.title}" width="100" height="100">
      </p>
      <p class="trip-point__price">&euro;&nbsp; ${tripPoint.price}</p>
      <ul class="trip-point__offers">
        ${tripPoint.offers}
      </ul>
    </article>`;
};

// Render Trip Points
export const renderTripPoints = (dist, amount) => {
  const renderList = amount ?
    new Array(amount).fill(generateTripPoints(stubTripPoints())) :
    dataTripPoints.map(generateTripPoints);
  dist.insertAdjacentHTML(`beforeend`, renderList.join(``));
};

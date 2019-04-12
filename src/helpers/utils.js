import * as moment from 'moment/moment';

// Create Element
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Get Time Residue
export const getDurationTime = (timeFrom, timeTo) => {
  const fromTime = moment(timeFrom);
  const toTime = moment(timeTo);
  return moment.utc(+moment.duration(toTime.diff(fromTime)));
};

// Travel types
export const travelTypes = [
  {icon: `🏨`, name: `Check-in`, transport: false},
  {icon: `🚗`, name: `Drive`, transport: true},
  {icon: `🚌`, name: `Bus`, transport: true},
  {icon: `🚂`, name: `Train`, transport: true},
  {icon: `🛳️`, name: `Ship`, transport: true},
  {icon: `🚊`, name: `Transport`, transport: true},
  {icon: `🏛️`, name: `Sightseeing`, transport: false, title: ``},
  {icon: `🍴`, name: `Restaurant`, transport: false},
  {icon: `🚕`, name: `Taxi`, transport: true},
  {icon: `✈️`, name: `Flight`, transport: true}
];

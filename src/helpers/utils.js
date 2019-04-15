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
export const TravelType = {
  'TAXI': `🚕`,
  'BUS': `🚌`,
  'TRAIN': `🚂`,
  'SHIP': `🛳️`,
  'TRANSPORT': `🚊`,
  'DRIVE': `🚗`,
  'FLIGHT': `✈️`,
  'CHECK-IN': `🏨`,
  'SIGHTSEEING': `🏛️`,
  'RESTAURANT': `🍴`,
};

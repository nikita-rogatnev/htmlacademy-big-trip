import * as moment from 'moment';

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// List Of Emoji Icons
export const emojiList = {
  taxi: `🚕`,
  bus: `🚌`,
  train: `🚂`,
  ship: `🛳`,
  transport: `🚊`,
  drive: `🚗`,
  flight: `✈`,
  checkin: `🏨`,
  sightseeing: `🏛️`,
  restaurant: `🍴`,
};

// Get Time Residue
export const getDurationTime = (timeFrom, timeTo) => {
  const fromTime = moment(timeFrom, `HH:mm`);
  const toTime = moment(timeTo, `HH:mm`);

  return moment.utc(+moment.duration(toTime.diff(fromTime)));
};

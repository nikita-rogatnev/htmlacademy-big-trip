import * as moment from './moment';

// List Of Emoji Icons
export const emojiList = {
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

// Get Time Residue
export const getDurationTime = (timeFrom, timeTo) => {
  const fromTime = moment.utc(timeFrom, `HH:mm`);
  const toTime = moment.utc(timeTo, `HH:mm`);
  return moment.utc(+moment.duration(toTime.diff(fromTime))).format(`H[H] mm[M]`);
};

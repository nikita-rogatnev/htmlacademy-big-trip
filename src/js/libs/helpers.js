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
  return moment.utc(+moment.duration(moment.utc(timeTo, `HH:mm`).diff(moment.utc(timeFrom, `HH:mm`)))).format(`H[H] mm[M]`);
};

import * as moment from '../libs/moment';

// Get Time Residue
export const getDurationTime = (timeFrom, timeTo) => {
  const fromTime = moment.utc(timeFrom, `HH:mm`);
  const toTime = moment.utc(timeTo, `HH:mm`);
  return moment.utc(+moment.duration(toTime.diff(fromTime))).format(`H[H] mm[M]`);
};

import * as moment from 'moment';

// Get Time Residue
export const getDurationTime = (timeFrom, timeTo) => {
  const fromTime = moment(timeFrom, `HH:mm`);
  const toTime = moment(timeTo, `HH:mm`);

  return moment.utc(+moment.duration(toTime.diff(fromTime)));
};

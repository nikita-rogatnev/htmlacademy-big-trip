import * as moment from 'moment';

// Get Time Residue
export const getDurationTime = (timeFrom, timeTo) => {
  const fromTime = moment.utc(timeFrom);
  const toTime = moment.utc(timeTo);
  console.log(fromTime, toTime);

  return moment.utc(+moment.duration(toTime.diff(fromTime)));
};

import * as moment from 'moment';

// Create Element
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Show Error
export const showError = (container) => {
  container.classList.remove(`visually-hidden`);
  container.innerText = `Something went wrong while loading your route info. Check your connection or try again later.`;
};

// List Of Emoji Icons
export const emojiList = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈`,
  'check-in': `🏨`,
  'sightseeing': `🏛️`,
  'restaurant': `🍴`,
};

// Get Time Residue
export const getDurationTime = (timeFrom, timeTo) => {
  const fromTime = moment(timeFrom);
  const toTime = moment(timeTo);

  return moment.utc(+moment.duration(toTime.diff(fromTime)));
};

// TODO: Не совсем ясна задача данного участка кода

export const createTripPoint = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export default (container) => {
  const element = document.createElement(`div`);
  const fragment = document.createDocumentFragment();
  element.innerHTML = container;
  const childLength = element.childNodes.length;

  if (childLength === 1) {
    return element.firstChild;
  } else if (childLength === 0) {
    throw new Error(`You have to define element.`);
  } else {
    for (let i = 0; childLength > i; i++) {
      fragment.appendChild(element.childNodes[0]);
    }
    return fragment;
  }
};

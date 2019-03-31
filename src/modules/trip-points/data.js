// Trip Points Stub Data
export const tripPointsData = [{
  id: Math.floor(Math.random() * 100),
  travelWay: `Ship`,
  favorite: true,
  destination: `Saint-Petersburg`,
  get destinationText() {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
             Cras aliquet varius magna, non porta ligula feugiat eget.
             Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
             Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
             Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
             Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
             Sed sed nisi sed augue convallis suscipit in sed felis.
             Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
             In rutrum ac purus sit amet tempus.`
      .replace(/([.?!])\s*(?=[A-Z])/g, `$1|`)
      .split(`|`)
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * Math.floor(3) + 1))
      .join(` `);
  },
  dateStart: `10:00`,
  dateEnd: `12:00`,
  price: Math.floor(Math.random() * Math.floor(100)),
  get picture() {
    return `//picsum.photos/100/100?r=${Math.random()}`;
  },
  offer: [
    {
      title: `add-luggage`,
      price: 100,
      accepted: false
    },
    {
      title: `switch-to-comfort-class`,
      price: 110,
      accepted: false
    },
    {
      title: `add-meal`,
      price: 120,
      accepted: false
    },
    {
      title: `choose-seats`,
      price: 130,
      accepted: false
    }
  ],
}];


// Trip Points Stub Data
export const stubTripPoints = {
  travelType: `checkIn`,
  favorite: true,
  destinationTitle: [
    `Chamonix`,
    `Moscow`,
    `Saint-Petersburg`,
  ][Math.floor(Math.random() * 3)],
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
  timeTable: {
    from: `10:00`,
    to: `14:36`
  },
  price: Math.floor(Math.random() * Math.floor(100)),
  get picture() {
    return `//picsum.photos/100/100?r=${Math.random()}`;
  },
  offers: {
    'add-luggage': true,
    'switch-to-comfort-class': false,
    'add-meal': false,
    'choose-seats:': false
  },
};

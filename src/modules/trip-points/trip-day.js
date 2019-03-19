import {Component} from '../../component';
import moment from 'moment';

// Trip Day Class
export class TripDay extends Component {
  constructor(data) {
    super();
    this._date = data.day;
  }

  get template() {
    return ` 
      <div>
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">1</p>
        <h2 class="trip-day__title">${moment(this._date).format(`MMM DD`)}</h2>
      </div>`.trim();
  }
}

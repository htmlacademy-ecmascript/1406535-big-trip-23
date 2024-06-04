import AbstractView from '../framework/view/abstract-view.js';
import { date } from '../utils/date.js';

const createTripHeaderTemplate = ({ title, dateFrom, dateTo, price }) => {
  const startDate = date.formatBriefDayReversed(dateFrom);
  const endDate = date.formatBriefDayReversed(dateTo);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>
      <p class="trip-info__dates">${startDate}&nbsp;—&nbsp;${endDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`;
};
export default class TripHeaderView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createTripHeaderTemplate(this.#data);
  }
}

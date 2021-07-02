import {LitElement, html, css} from 'lit-element';
import CarsComponent from './car-component';
import CarDetailsPopup from './car-details-popup';

export default class CarsList extends LitElement {
  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      .cars-component-container {
        flex: calc(25% - 1.255rem);
      }

      @media only screen and (max-width: 480px) {
        .cars-component-container {
          flex: calc(100% - 1.255rem);
        }
      }
    `;
  }

  static get properties() {
    return {
      vehicles: {type: Array},
      vehicle: {type: Object},
      togglePopup: Function,
      popupOpen: {type: Boolean},
      selectedVehicle: {type: Object},
    };
  }

  constructor() {
    super();
  }

  renderCars() {
    //this.app.cars.vehicles.map((vehicle) => vehicle.model);

    return this.vehicles.map((vehicle) => {
      return html`
        ${html`<cars-component
          ?popupOpen="${this.popupOpen}"
          .togglePopup=${this.togglePopup}
          .vehicle=${vehicle}
          @vehicle-detail-event="${(e) => {
            // console.log(e.detail.vehicle);
            let event = new CustomEvent('vehicle-detail-event', {
              detail: {
                vehicle: e.detail.vehicle,
              },
            });
            this.dispatchEvent(event);
            this.selectedVehicle = e.detail.vehicle;
          }}"
          class="cars-component-container"
        ></cars-component>`}
      `;
    });
  }

  render() {
    return html`
      <car-details-popup
        ?popupOpen="${this.popupOpen}"
        .togglePopup=${this.togglePopup}
        .carDetails=${this.selectedVehicle}
      ></car-details-popup>

      ${this.renderCars()}
    `;
  }
}

customElements.define('cars-list', CarsList);

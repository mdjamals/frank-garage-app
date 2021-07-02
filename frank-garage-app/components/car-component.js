import {LitElement, html, css} from 'lit-element';

export default class CarsComponent extends LitElement {
  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      .car-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        /* border-radius: 6px; */
        filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.2));
        padding: 10px;
        text-align: center;
        margin: 0.625rem;
        font-family: sans-serif;
      }
      .car-card img {
        width: 100%;
        height: auto;
        cursor: pointer;
      }
      .car-card .car-details {
        margin: 10px 0;
        font-size: 16px;
        font-weight: 400;
        line-height: 100%;
      }
      .car-card .car-details:hover {
        color: #f75d34;
        cursor: pointer;
      }
      .car-price {
        font-size: 18px;
        color: #24272c;
        font-weight: 600;
      }
      .car-details {
        width: 210px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .cta {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
      }
      .add-button {
        width: 60%;
        height: 30px;
        background: #fff;
        border: 1px solid #f75d34;
        font-size: 14px;
        color: #f75d34;
        cursor: pointer;
      }
      .add-button:hover {
        background: #f75d34;
        color: #fff;
      }

      .fav-icon i {
        font-size: 20px;
        color: #cccccc;
        border: 1px solid #cccccc;
        padding: 4px;
        cursor: pointer;
      }
      .fav-icon i:hover {
        color: #f75d34;
        border: 1px solid #f75d34;
      }
    `;
  }

  static get properties() {
    return {
      vehicle: {type: Object},
    };
  }

  constructor() {
    super();
  }

  detailsClicked(vehicle) {
    let event = new CustomEvent('vehicle-detail-event', {
      detail: {
        vehicle,
      },
    });
    this.dispatchEvent(event);
  }

  firstUpdated() {}

  renderCar() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      />
      <div class="car-card" id="card">
        <img
          src="../frank-garage-app/images/car.jpg"
          alt=""
          title="${this.vehicle.year_model} ${this.vehicle.make} ${this.vehicle
            .model}"
          @click="${() => {
            this.togglePopup();
            this.detailsClicked(this.vehicle);
          }}"
        />
        <div class="car-details">
          ${this.vehicle.year_model} ${this.vehicle.make} ${this.vehicle.model}
        </div>
        <div class="car-price">
          Price: <i class="fas fa-dollar-sign"></i>${this.vehicle.price}
        </div>
        <div class="cta">
          <button
            type="button"
            class="add-button"
            title="Details"
            @click="${() => {
              this.togglePopup();
              this.detailsClicked(this.vehicle);
            }}"
          >
            Details
          </button>
          <span class="fav-icon">
            <i class="fas fa-heart" title="Add to Favourites"></i>
          </span>
          <span class="fav-icon">
            <i class="fas fa-shopping-cart" title="Add to Cart"></i>
          </span>
        </div>
      </div>
    `;
  }

  render() {
    return html` ${this.renderCar()} `;
  }
}

customElements.define('cars-component', CarsComponent);

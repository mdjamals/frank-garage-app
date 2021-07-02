import {LitElement, html} from 'lit-element';

export default class CarDetailsPopup extends LitElement {
  constructor() {
    super();
    this.total = 0;
  }

  static get properties() {
    return {
      togglePopup: Function,
      popupOpen: {type: Boolean},
      carDetails: {type: Object},
    };
  }

  firstUpdated() {}

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      />
      <style>
        * {
          box-sizing: border-box;
        }
        .car-details-popup {
          background: rgba(0, 0, 0, 0.8);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          visibility: hidden;
          opacity: 0;
          transition: all 0.4s ease-in-out;
          z-index: 11;
          font-family: sans-serif;
        }
        .car-details-popup.active {
          visibility: visible;
          opacity: 1;
        }
        h2 {
          margin-top: 0;
        }
        .car-details-inner {
          background: #fff;
          width: 800px;
          max-width: 100%;
          padding: 20px;
          border-radius: 10px;
          display: flex;
          font-family: sans-serif;
          position: relative;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        .close-icon {
          position: absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
          font-size: 1.4rem;
          color: #fff;
        }
        .car-details-inner img {
          width: 100%;
          max-width: 300px;
          height: auto;
          margin-right: 20px;
        }
        .car-details div {
          margin-bottom: 15px;
        }
      </style>
      <section class="car-details-popup ${this.popupOpen ? 'active' : ''}">
        <div class="close-icon" @click="${this.togglePopup}">X</div>
        <div class="car-details-inner">
          <img src="../frank-garage-app/images/car.jpg" alt="" />
          <div class="car-details">
            <h2>Car Details</h2>
            <div>Make: ${this.carDetails && this.carDetails.year_model}</div>
            <div>
              Model: ${this.carDetails && this.carDetails.make}
              ${this.carDetails && this.carDetails.model}
            </div>
            <div>
              Price: <i class="fas fa-dollar-sign"></i>${this.carDetails &&
              this.carDetails.price}
            </div>
            <div>${this.carDetails && this.carDetails.name}</div>
          </div>
          <div class="desc"></div>
        </div>
      </section>
    `;
  }
}

customElements.define('car-details-popup', CarDetailsPopup);

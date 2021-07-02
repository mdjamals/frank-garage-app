import {LitElement, html, css} from 'lit-element';
import './header';
import './cars-list';
import './footer';

export class AppGarage extends LitElement {
  apps;
  static get styles() {
    return css`
      .app-container {
        display: flex;
        margin: 0 auto;
        max-width: 1000px;
      }
      .cars-list-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    `;
  }

  static get properties() {
    return {
      vehicles: {type: Array},
      popupOpen: {type: Boolean},
      togglePopup: Function,
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;

    this.popupOpen = false;
    this.togglePopup = this.togglePopup.bind(this);

    this.url = 'https://api.jsonbin.io/b/5ebe673947a2266b1478d892';
    fetch(this.url)
      .then((response) => response.json())
      .then((json) => {
        this.apps = json;
        //console.log(json);
        this.vehicles = [];
        this.apps.forEach((warehouse) => {
          // console.log(warehouse.name);
          // console.log(warehouse.cars.location);

          this.vehicles.warehouse = warehouse.name;
          this.vehicles.location = warehouse.cars.location;

          console.log(this.vehicles.warehouse);
          console.log(this.vehicles.location);

          this.vehicles.push(...warehouse.cars.vehicles);
        });
        this.vehicles.sort((a, b) => a.year_model - b.year_model);
        console.log(this.vehicles);
        this.requestUpdate();
      });
  }

  togglePopup() {
    if (this.popupOpen) {
      this.popupOpen = !this.popupOpen;
    }
    // console.log('clicked button');
    // console.log(this.popupOpen);
  }

  vehicleSearch() {
    const searchBar = this.shadowRoot.getElementById('searchBar');
    // console.log(searchBar);
    searchBar.addEventListener('keyup', (e) => {
      // console.log(e.target.value);
      const searchString = e.target.value.toLowerCase();
      const filteredVehicles = this.vehicles.filter((vehicle) => {
        return (
          vehicle.make.toLowerCase().includes(searchString) ||
          vehicle.model.toLowerCase().includes(searchString)
        );
      });
      console.log(filteredVehicles);
      this.vehicles = filteredVehicles;
      if (searchString.length === 0) {
        console.log('no string');
      }
    });
  }

  firstUpdated() {}

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      />
      <header-comp></header-comp>

      <div class="search">
        <input
          type="text"
          id="searchBar"
          class="searchTerm"
          placeholder="Search Car"
          @keyup="${this.vehicleSearch}"
        />
        <button type="submit" class="searchButton">
          <i class="fa fa-search"></i>
        </button>
      </div>

      <div class="app-container">
        ${html`<cars-list
          class="cars-list-container"
          .vehicles=${this.vehicles}
          .togglePopup=${this.togglePopup}
          ?popupOpen="${this.popupOpen}"
          @vehicle-detail-event="${(e) => {
            if (e.detail.vehicle.licensed) {
              this.popupOpen = !this.popupOpen;
              console.log('clicked button');
              console.log(this.popupOpen);
            }
            // console.log(e.detail.vehicle);
          }}"
        />`}
      </div>
      <footer-comp></footer-comp>
    `;
  }
}

customElements.define('app-garage', AppGarage);

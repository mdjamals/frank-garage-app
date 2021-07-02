import {LitElement, html, css} from 'lit-element';

export default class Footer extends LitElement {
  static get styles() {
    return css`
      .footer {
        width: 100%;
        background: #fff;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        padding: 10px 0;
        font-family: sans-serif;
        font-size: 12px;
        text-align: center;
        margin-top: 40px;
      }
    `;
  }

  static get properties() {
    return {
      vehicles: {type: Array},
      vehicle: {type: Object},
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="footer">
        <p>© 2020 Frank Garage Pvt. Ltd.</p>
      </div>
    `;
  }
}

customElements.define('footer-comp', Footer);

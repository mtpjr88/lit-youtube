import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('error-element')
export class ErrorElement extends LitElement {
  @property({ type: String })
  error: string = '';

  static override styles = css`
    * {
      transition: all 0.6s;
    }

    html {
      height: 100%;
    }

    body {
      font-family: 'Lato', sans-serif;
      color: #888;
      margin: 0;
    }

    #main {
      display: table;
      width: 100%;
      height: 100vh;
      text-align: center;
    }

    .fof {
      display: table-cell;
      vertical-align: middle;
      color:white
    }

    .fof h1 {
      
      display: inline-block;
      padding-right: 12px;
      animation: type 0.5s alternate infinite;
    }

    @keyframes type {
      from {
        box-shadow: inset -3px 0px 0px #888;
      }
      to {
        box-shadow: inset -3px 0px 0px transparent;
      }
    }
  `;

  override render() {
    return html`
      <div id="main">
        <div class="fof">
          <h1>${this.error}</h1>
          <h2>
             (try a new api key and try again)
          </h2>
        </div>
      </div>
    `;
  }
}

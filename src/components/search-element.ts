import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('search-element')
export class SearchElement extends LitElement {
    @property({ type: String })
    value: string = '';

    @property()
    onSubmit: (value: string) => void = () => { };

    static override styles = css`
    :host {
      display: flex;
      justify-content: center;
      padding: 12px 62px;
    }
    .input-container {
      display: flex;
      flex: 1;
      
    }
    .input{
        width: 500px;
        background-color:#fff;
    }
    .button{
        height: auto;
    align-items: center;
    }
  `;


    handleChange = (e: any) => {
        this.value = e.target.value;
    };

    override render() {
        return html`
      <div class="input-container">
        <kor-input
        class="input"
          label="Search Videos"
          value="${this.value}"
          @change="${this.handleChange}"
        ></kor-input>
        <kor-button
        class="button"
          icon="search"
          label="Primary"
          @click="${() => this.onSubmit(this.value)}"
          >Search</kor-button
        >
      </div>
    `;
    }
}

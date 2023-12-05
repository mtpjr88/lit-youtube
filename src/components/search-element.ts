import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('search-element')
export class SearchElement extends LitElement {
  @property({type: String})
  value: string = '';

  @property()
  onSubmit: (value: string) => void = () => {};

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
  `;
  setChecked(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  private handleChange = (e: any) => {
    this.value = e.target.value;
  };

  override render() {
    return html`
      <div class="input-container">
        <kor-input
          label="Search Videos"
          value="${this.value}"
          @change="${this.handleChange}"
        ></kor-input>
        <kor-button
          icon="search"
          label="Primary"
          @click="${() => this.onSubmit(this.value)}"
          >Search</kor-button
        >
      </div>
    `;
  }
}

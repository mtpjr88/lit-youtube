import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('page-selector-element')
export class PageSelectorElement extends LitElement {

  @property({ type: Boolean })
  hasPreviousPage: boolean = false;

  @property()
  onPrevClick: (value: string) => void = () => { };
  onNextClick: (value: string) => void = () => { };

  static override styles = css`
    :host {
      display: flex;
      justify-content: center;
      padding: 12px 62px;
      z-index: 99;
    }
    .container {
      display:flex ;
      margin-bottom: 16px;
    margin-bottom: 16px;
    flex: .25;
    justify-content: space-between;
    }
  `;


  override render() {
    return html`
      <div class="container">
        
        ${this.hasPreviousPage ? html`<kor-button icon="arrow_back_ios" @click=${this.onPrevClick} label="Primary">Previous 25</kor-button>` : undefined}
        <kor-button icon="arrow_forward_ios" @click=${this.onNextClick} label="Secondary" color="Primary">Next 25</kor-button>
      </div>
    `;
  }
}

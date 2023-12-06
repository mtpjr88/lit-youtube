import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('tab-element')
export class TabElement extends LitElement {
  @property({ type: String })
  selected: string = '';

  @property()
  onChange: (value: string) => void = () => { };

  static override styles = css`
    :host {
      display: flex;
      justify-content: center;
      padding: 12px 62px;
      z-index: 99;
    }
  `;

  isActive = (value: string) => {
    return this.selected === value;
  };
  override render() {
    return html`
      <div>
        <kor-text size="header-1">Filter:</kor-text>
        <kor-switch style="width: fit-content;">
          <kor-switch-item
            @click="${() => this.onChange('')}"
            label="All"
            .active=${this.isActive('')}
          ></kor-switch-item>
          <kor-switch-item
            @click="${() => this.onChange('date')}"
            label="Date"
            .active=${this.isActive('date')}
          ></kor-switch-item>
          <kor-switch-item
            @click="${() => this.onChange('rating')}"
            label="Rating"
            .active=${this.isActive('rating')}
          ></kor-switch-item>
          <kor-switch-item
            @click="${() => this.onChange('relevance')}"
            label="Relevance"
            .active=${this.isActive('relevance')}
          ></kor-switch-item>
        </kor-switch>
      </div>
    `;
  }
}

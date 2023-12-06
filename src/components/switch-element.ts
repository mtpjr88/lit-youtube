import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('switch-element')
export class SwitchElement extends LitElement {
  @property({ type: String })
  selected: string = '';

  @property()
  onChange: (value: string) => void = () => { };

  static override styles = css`
    :host {
      display: flex;
      justify-content: center;
      padding: 12px 62px;
      z-index:99 ;
    }
  `;

  isActive = (value: string) => {
    return this.selected === value;

  };
  override render() {

    return html`
      <div>
        <kor-text size="header-1">Filter:</kor-text>
        <kor-switch  style="width: fit-content;">
          <kor-switch-item @click="${() => this.onChange('')}" label="no filter" .active=${this.isActive('')}></kor-switch-item>
          <kor-switch-item @click="${() => this.onChange('date')}" label="date" .active=${this.isActive('date')}></kor-switch-item>
          <kor-switch-item @click="${() => this.onChange('rating')}" label="rating" .active=${this.isActive('rating')}></kor-switch-item>
          <kor-switch-item @click="${() => this.onChange('relevance')}" label="relevance" .active=${this.isActive('relevance')}></kor-switch-item>
        </kor-switch>
      </div>
    `;
  }
}

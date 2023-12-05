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
    }
  `;
  setChecked() {
    // this.selected = (event.target as HTMLInputElement).value;
  }
  override render() {
    debugger;
    return html`
      <div>
        <kor-text size="header-1">Filter:</kor-text>
        <kor-switch  style="width: fit-content;">
          <kor-switch-item @click="${() => this.onChange('')}" label="no filter" active=${this.selected === ''}></kor-switch-item>
          <kor-switch-item @click="${() => this.onChange('date')}" label="date" active=${this.selected === 'date'}></kor-switch-item>
          <kor-switch-item @click="${() => this.onChange('rating')}" label="rating" active=${this.selected === 'rating'}></kor-switch-item>
          <kor-switch-item @click="${() => this.onChange('relevance')}" label="relevance" active=${this.selected === "relevance"}></kor-switch-item>
        </kor-switch>
      </div>
    `;
  }
}

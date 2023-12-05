import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { youTubeUrl } from '../config';
import './search-element';
import './switch-element';
const noop = () => { };

@customElement('card-element')
export class CardElement extends LitElement {
    @property({ type: Array })
    data: any[] = [];

    @property()
    order: string = '';

    @property()
    value: string = '';

    @property()
    onSubmit: (value: string) => void = noop;

    @property()
    handleTabChange: (value: string) => void = noop;

    static override styles = css`
    :host {
      display: flex;
      flex: 1;
      justify-content: center;
      padding: 12px 62px;
    }
    .body {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 5px;
    }
    .container {
      display: flex;
      height: 800px;
      flex: 1;
      gap: 15px;
      justify-content: center;
      flex-flow: wrap;
      overflow: auto;
    }
    .cardBody {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
    }
    .commentContainer {
      display: flex;
      align-items: center;
    }
  `;

    override render() {
        return html`<div class="container">
      <div>
        <search-element
          .value="${this.value}"
          .onSubmit="${this.onSubmit}"
        ></search-element>
        <switch-element
          .selected="${this.order}"
          .onChange="${this.handleTabChange}"
        >
        </switch-element>
      </div>
      <div class="body">
        ${this.data.map(
            (x: any) => html`<kor-card
            icon="video_library"
            style="height:300px; width: 300px; overflow: visible; "
            label=${x.snippet.channelTitle}
          >
            <kor-image
              src=${x.snippet.thumbnails.default.url}
              width="250px"
              height="100px"
              fit="cover"
            ></kor-image>
            <div class="cardBody">
              <a href="${youTubeUrl + x.id}">${x.snippet.title}</a>
              <div class="commentContainer">
                ${x.statistics.commentCount > 0
                    ? html` <kor-badge
                        label="${x.statistics.commentCount}"
                      ></kor-badge
                      >comments`
                    : undefined}
              </div>
            </div>
          </kor-card>`
        )}
      </div>
    </div>`;
    }
}

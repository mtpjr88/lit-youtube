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
    
    .body {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 5px;
      overflow:scroll ;
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
        return html`
     
      <div class="body">
        ${this.data.map(
            (x: any) => html`<kor-card
            icon="video_library"
            style="height:250px; width: 300px; overflow: unset;padding:10px "
            .label=${html`<a href="${youTubeUrl + x.id}">${x.snippet.channelTitle}</a>`}
          >
            <kor-image
            
              src=${x.snippet.thumbnails.default.url}
              width="250px"
              height="100px"
              fit="cover"
            ></kor-image>
            <div class="cardBody">
              ${x.snippet.title}
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
    `;
    }
}

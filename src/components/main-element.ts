import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';
// import { getSearch, getVideosByIds } from '../api/youtube';
import './search-element';
import './switch-element';
import { youTubeUrl } from '../config';
import { mockData } from '../api/mock';
@customElement('main-element')
export class MyElement extends LitElement {
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

  private _productTask = new Task(this, {
    // @ts-ignore
    task: async ({ query, order }) => {
      debugger;
      // const response = await getSearch(query, order);
      // const ids = response.items?.map((x: any) => x.id.videoId) ?? '';
      // const videoData = await getVideosByIds(ids);
      // return videoData;
      return mockData;
    },
    args: () => [],
  });

  private _value: string = '';
  private _order: string = '';
  private handleSubmit = (value: string) => {

    this._productTask.run({ query: value } as any);
  };
  private handleTabChange = (order: any) => {
    this._order = order;
    this._productTask.run({ query: this._value, order } as any);

  };

  override render() {
    return this._productTask.render({
      initial: () => html`<p>Waiting to start task</p>`,
      pending: () => html`<div>...loading</div>`,
      complete: (data) => {
        const items = data.items;
        console.log('data', data);
        return html`<div class="container">
          <div>
            <search-element
              .value="${this._value}"
              .onSubmit="${this.handleSubmit}"
            ></search-element>
            <switch-element .selected="${this._order}" .onChange="${this.handleTabChange}"></switch-element>
          </div>
          <div class="body">
            ${items.map(
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
      },
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-element': MyElement;
  }
}

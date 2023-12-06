import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {Task} from '@lit/task';
//import { getSearch, getVideosByIds } from '../api/youtube';
import './card-element';
import './shared/error-element';
import {mockData} from '../api/mock';

@customElement('main-element')
export class MyElement extends LitElement {
  constructor() {
    super();
    this.youtubeTask.run();
  }
  static override styles = css`
    :host {
      display: flex;
      flex: 1;
      justify-content: center;
      padding: 12px 62px;
      background-color: #0f0f0f;
    }
    .search {
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 999;
      background: red;
      align-items: center;
      display: flex;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
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
  `;

  youtubeTask = new Task<any, any>(this, {
    // @ts-ignore
    task: async ({query, order}) => {
      // const response = await getSearch(query, order);
      // const ids = response.items?.map((x: any) => x.id.videoId) ?? '';
      // const videoData = await getVideosByIds(ids);
      return [];
    },
    args: () => [],
    autoRun: false,
  });

  value: string = '';
  order: string = '';

  handleSubmit = (value: string) => {
    this.value = value;
    this.youtubeTask.run({query: value});
  };
  handleTabChange = (order: string) => {
    this.order = order;
    this.youtubeTask.run({query: this.value, order});
  };

  override render() {
    return this.youtubeTask.render({
      initial: () => html`<p>Waiting to start task</p>`,
      pending: () => html`<kor-spinner></kor-spinner>`,
      complete: () => {
        return html`
          <div>
            <div class="search">
              <search-element
                .value="${this.value}"
                .onSubmit="${this.handleSubmit}"
              ></search-element>
              <switch-element
                .selected="${this.order}"
                .onChange="${this.handleTabChange}"
              >
              </switch-element>
            </div>
            <div>
              <card-element
                .data="${mockData.items}"
                .onSubmit="${this.handleSubmit}"
                .handleTabChange=${this.handleTabChange}
                .order=${this.order}
                .value=${this.value}
              ></card-element>
            </div>
          </div>
        `;
      },
      error: (error) => html`<error-element .error=${error}></error-element>`,
    });
  }
}

import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';
import './card-element';
import './tab-element';
import './shared/error-element';
import { findVideos } from '../tasks/youtube-task';
//import { mockData } from '../api/mock';

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
    task: findVideos,
    args: () => [],
    autoRun: false,
  });

  value: string = '';
  order: string = '';

  handleSubmit = (value: string) => {
    this.value = value;
    this.youtubeTask.run({ query: value });
  };
  handleTabChange = (order: string) => {
    this.order = order;
    this.youtubeTask.run({ query: this.value, order });
  };

  override render() {
    return this.youtubeTask.render({
      initial: () => html`<kor-spinner></kor-spinner>`,
      pending: () => html`<kor-spinner></kor-spinner>`,
      complete: (data: { items: any[]; }) => {
        return html`
          <div>
            <div class="search">
              <search-element
                .value="${this.value}"
                .onSubmit="${this.handleSubmit}"
              ></search-element>
              <tab-element
                .selected="${this.order}"
                .onChange="${this.handleTabChange}"
              >
              </tab-element>
            </div>
            <div>
              <card-element
                .data="${data.items}"
                .onSubmit="${this.handleSubmit}"
                .handleTabChange=${this.handleTabChange}
                .order=${this.order}
                .value=${this.value}
              ></card-element>
            </div>
          </div>
        `;
      },
      error: (error: any) => html`<error-element .error=${error}></error-element>`,
    });
  }
}

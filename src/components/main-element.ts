import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';
import { getSearch, getVideosByIds } from '../api/youtube';
import './card-element';
import './shared/error-element';


@customElement('main-element')
export class MyElement extends LitElement {
  constructor() {
    super();
    this.productTask.run();
  }

  productTask = new Task<any, any>(this, {
    // @ts-ignore
    task: async ({ query, order }) => {
      const response = await getSearch(query, order);
      const ids = response.items?.map((x: any) => x.id.videoId) ?? '';
      const videoData = await getVideosByIds(ids);
      return videoData;
    },
    args: () => [],
    autoRun: false,
  });

  value: string = '';
  order: string = '';

  handleSubmit = (value: string) => {
    this.value = value;
    this.productTask.run({ query: value });
  };
  handleTabChange = (order: string) => {
    this.order = order;
    this.productTask.run({ query: this.value, order });
  };

  override render() {
    return this.productTask.render({
      initial: () => html`<p>Waiting to start task</p>`,
      pending: () => html`<kor-spinner></kor-spinner>`,
      complete: (data) => {
        return html`<card-element
          .data="${data.items}"
          .onSubmit="${this.handleSubmit}"
          .handleTabChange=${this.handleTabChange}
          .order=${this.order}
          .value=${this.value}
        ></card-element>`;
      },
      error: (error) => html`<error-element .error=${error}></error-element>`,
    });
  }
}


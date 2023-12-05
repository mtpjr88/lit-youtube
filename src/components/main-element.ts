import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';
import { getSearch, getVideosByIds } from '../api/youtube';

import { youTubeUrl } from '../config';

@customElement('main-element')
export class MyElement extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      justify-content: center;
      padding: 12px 62px;
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

  private _productTask = new Task(this, {
    task: async () => {
      const response = await getSearch('dogs');
      const ids = response.items?.map((x: any) => x.id.videoId) ?? '';
      const videoData = await getVideosByIds(ids);

      debugger;
      return videoData;
    },
    args: () => [],
  });

  override render() {
    return this._productTask.render({
      initial: () => html`<p>Waiting to start task</p>`,
      pending: () => html`<div>...loading</div>`,
      complete: (data) => {
        const items = data.items;
        console.log('data', data);
        return html`<div class="container">
          ${items.map(
          (x: any) => html`<kor-card
              icon="video_library"
              style="height:300px; width: 300px; overflow: visible; "
              label=${x.snippet.channelTitle}
            >
              <kor-image
                src=${x.snippet.thumbnails.default.url}
                width="200px"
                height="100px"
                fit="cover"
              ></kor-image>
              <a href="${youTubeUrl + x.id}">${x.snippet.title}</a>
            </kor-card>`
        )}
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

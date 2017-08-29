import * as Dragula from 'dragula';
import {radomizeArray} from "../utils/radnomizeArray";

export class ShowFeature {
  static key = 's';

  startuem(subtitle) {
    const el = document.getElementById('feature');
    const words = subtitle.text.trim().split(/\s+/g);
    radomizeArray(words.slice()).forEach(word => {
      const div = document.createElement('span');
      div.textContent = word + ' ';
      div.draggable = true;
      el.appendChild(div);
    });

    const drake = Dragula([el], {
      direction: 'horizontal'
    });

    drake.on('drop', () => {
      const wordsEl = document.querySelectorAll('#feature span');
      if (Array.from(wordsEl).map(e => e.textContent.trim()).join() === words.join()) {
        el.innerHTML = '';
        this.completeHandler();
      }
    });
  }

  onComplete(completeHandler) {
    this.completeHandler = completeHandler;
  }
}

import * as Dragula from 'dragula';
import {radomizeArray} from "../utils/radnomizeArray";

export class DragWordsFeature {
  keyName = 's';

  startuem(el, subtitleText) {
    const words = subtitleText.split(/\s+/g);
    console.log(words);
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
      console.log('drop');
      const wordsEl = document.querySelectorAll('#feature span');
      if (Array.from(wordsEl).map(e => e.textContent.trim()).join() === words.join()) {
        setTimeout(() => {
          drake.destroy();
          el.innerHTML = '';
          this.completeHandler();
        })
      }
    });
  }

  onComplete(completeHandler) {
    this.completeHandler = completeHandler;
  }
}

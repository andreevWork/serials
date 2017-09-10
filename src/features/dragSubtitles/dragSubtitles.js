import * as Dragula from 'dragula';
import {radomizeArray} from "../../utils/radnomizeArray";

class DragSubtitles  {
  container;
  dragulaInstance;
  patternString;

  constructor(coreInstance, container) {
    this.coreInstance = coreInstance;
    this.container = container;
  }

  startuem() {
    const {text} = this.coreInstance.getCurrentSubtitle();
    const words = text.split(/\s+/g);
    this.patternString = words.join('');
    const wordsEl = el.childNodes;

    radomizeArray(words);

    words.forEach(word => {
      const div = document.createElement('span');
      div.textContent = word;
      div.classList.add('word');
      el.appendChild(div);
    });

    this.dragulaInstance = Dragula([el], {
      direction: 'horizontal'
    });

    this.dragulaInstance.on('drop', () => {
      const wordsElArray = Array.from(wordsEl);
      const resultWords = wordsElArray.map(e => e.textContent).join('');

      if (resultWords === this.patternString) {
        setTimeout(() => {
          wordsElArray.forEach(el => el.classList.add('hide'));
          setTimeout(() => {
            this.destroy();
          }, 1500);
        })
      }
    });
  }

  destroy() {
    this.dragulaInstance.destroy();
    this.container.innerHTML = '';
  }
}

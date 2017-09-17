import * as Dragula from 'dragula';
import {radomizeArray} from "../../utils/radnomizeArray";
import wordTemplate from './templates/word.handlebars';
import blockTemplate from './templates/block.handlebars';
import './dragSubtitles.css';

export class DragSubtitles  {
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

    this.container.innerHTML = blockTemplate({
      content: radomizeArray(words)
        .map(word => wordTemplate({word}))
        .join('')
    });

    const wordsEl = document.querySelector('.js-words');
    const wordsElChildNodes = wordsEl.childNodes;

    this.dragulaInstance = Dragula([wordsEl], {
      direction: 'horizontal'
    });

    this.dragulaInstance.on('drop', () => {
      const wordsElArray = Array.from(wordsElChildNodes);
      const resultWords = wordsElArray.map(e => e.textContent.trim()).join('');
      console.log(resultWords);
      console.log(this.patternString);
      if (resultWords === this.patternString) {
        setTimeout(() => {
          wordsEl.classList.add('hide');
          setTimeout(() => {
            this.destroy();
          }, 1500);
        })
      }
    });
  }

  initDrag() {

  }

  destroy() {
    this.dragulaInstance.destroy();
    this.container.innerHTML = '';
  }
}

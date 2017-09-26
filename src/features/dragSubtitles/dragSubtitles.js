import * as Dragula from 'dragula';
import {radomizeArray} from "../../utils/radnomizeArray";
import wordTemplate from './templates/word.handlebars';
import blockTemplate from './templates/block.handlebars';
import './dragSubtitles.css';

export class DragSubtitles  {
  container;
  coreInstance;

  dragulaInstance;
  destroyButtons;
  patternString;
  answerString;
  onComplete;

  constructor(coreInstance, container) {
    this.coreInstance = coreInstance;
    this.container = container;
  }

  startuem() {
    this.renderWords();
    this.initDrag();
    this.initButtons();
  }

  initButtons() {
    const showButton = document.querySelector('.js-show-answer');
    const closeButton = document.querySelector('.js-close');
    let fn1, fn2;

    showButton.addEventListener('click', fn1 = () => {
      const answerBlock = document.querySelector('.js-answer');
      answerBlock.innerHTML = this.answerString;
    });

    closeButton.addEventListener('click', fn2 = () => {
      this.destroy();
    });

    this.destroyButtons = () => {
      showButton.removeEventListener('click', fn1);
      closeButton.removeEventListener('click', fn2);
    };
  }

  renderWords() {
    const {text} = this.coreInstance.getCurrentSubtitle();
    const words = text.split(/\s+/g);

    this.patternString = words.join('');
    this.answerString = words.join(' ');

    this.container.innerHTML = blockTemplate({
      content: radomizeArray(words)
        .map(word => wordTemplate({ word }))
        .join('')
    });
  }

  initDrag() {
    const wordsEl = document.querySelector('.js-words');

    this.dragulaInstance = Dragula([wordsEl], {
      direction: 'horizontal'
    });

    this.dragulaInstance.on('drop', () => {
      const resultWords = Array
        .from(wordsEl.childNodes)
        .map(it => it.textContent.trim())
        .join('');

      if (resultWords === this.patternString) {
        this.container.classList.add('hide');

        setTimeout(() => {
          this.destroy();
        }, 1500);
      }
    });
  }

  destroy(force = false) {
    this.destroyButtons();
    this.dragulaInstance.destroy();
    this.dragulaInstance = null;
    this.container.innerHTML = '';

    if (this.onComplete && !force) {
      this.onComplete();
    }
  }

  onCompleteEvent(onComplete) {
    this.onComplete = onComplete;
  }
}

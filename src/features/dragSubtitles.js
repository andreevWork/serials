import * as Dragula from 'dragula';
import {radomizeArray} from "../utils/radnomizeArray";
import {repeatSubtitle} from "./repeatSubtitle";


export const dragSubtitles = function (coreInstance) {
  const {text} = coreInstance.getCurrentSubtitle();
  const words = text.split(/\s+/g);
  const patternWords = words.join('');
  const el = document.getElementById('feature');
  const wordsEl = el.childNodes;

  radomizeArray(words);

  words.forEach(word => {
    const div = document.createElement('span');
    div.textContent = word;
    div.classList.add('word');
    el.appendChild(div);
  });

  const drake = Dragula([el], {
    direction: 'horizontal'
  });

  drake.on('drop', () => {
    const wordsElArray = Array.from(wordsEl);
    const resultWords = wordsElArray.map(e => e.textContent).join('');

    if (resultWords === patternWords) {
      setTimeout(() => {
        drake.destroy();
        wordsElArray.forEach(el => el.classList.add('hide'));
        setTimeout(() => {
          el.innerHTML = '';
          repeatSubtitle(coreInstance, {needPause: false});
        }, 1500);
      })
    }
  });

  repeatSubtitle(coreInstance);

  return () => {
    drake.destroy();
    el.innerHTML = '';
  };
};

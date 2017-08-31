
import {Subtitles} from "./subtitles";
import {Player} from "./player";
import {Core} from "./core";
import {Features} from "./features";
import {DragWordsFeature} from "./features/dragWords";
import {repeatSubtitle} from "./features/repeatSubtitle";
import {rewindSubtitle} from "./features/rewindSubtitle";

document.addEventListener("DOMContentLoaded", async function() {
  const [player, subtitles] = await Promise.all([
    new Player('player'),
    new Subtitles('/subs.srt'),
  ]);

  const core = new Core(player, subtitles);

  Core.addFeature('r', repeatSubtitle);
  Core.addFeature('b', rewindSubtitle);

  core.startuem();
});


// backHandler() {
//   if (this.lastSubtitleIndex === this.currentSubtitleIndex && this.currentSubtitleIndex !== 0) {
//     this.currentSubtitleIndex--;
//   }
//
//   this.repeatHandler();
// }
//
// repeatHandler(forcePause = false) {
//   this.incrementRepeatCount();
//
//   if (forcePause || this.isNeededPause()) {
//     this.startPauseTimer();
//   }
//   this.startPlay();
// }
//
// repeatAndContinue() {
//   this.startPlay();
// }
//
// incrementRepeatCount() {
//   if (this.currentSubtitleIndex === this.lastSubtitleIndex) {
//     this.repeatCount++;
//   } else {
//     this.repeatCount = 1;
//   }
// }
//
// isNeededPause() {
//   return this.repeatCount > 0;
// }

// @flow

import {Subtitles} from "./subtitles";
import {Player} from "./player";
import {Core} from "./core";
import {RepeatSubtitle} from "./features/repeatSubtitle";
import type {ISubtitles} from "./subtitles/index";
import type {IPlayer} from "./player/index";

document.addEventListener("DOMContentLoaded", async function() {
  const playerInstance: IPlayer = new Player();
  const subtitlesInstance: ISubtitles = new Subtitles();

  await Promise.all([
    playerInstance.setup('player'),
    subtitlesInstance.loadSubtitles('/subs.srt'),
  ]);

  const core = new Core(playerInstance, subtitlesInstance);

  Core.addFeature('r', RepeatSubtitle);

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

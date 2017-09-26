import * as keycode from "keycode";
import {Subtitles} from "./subtitles";
import {Player} from "./player";

export class Core {

  static timeDiff = 70;

  playerInstance;
  subtitlesInstance;

  currentSubtitleIndex;
  lastSubtitleIndex;

  lastPauseTime;
  pauseTimerId;

  constructor() {
    this.playerInstance = new Player();
    this.subtitlesInstance = new Subtitles();
  }

  startuem() {
    return Promise.all([
      this.playerInstance.setup(),
      this.subtitlesInstance.loadSubtitles()
    ])
  }

  doAction(action) {
    const index = this.findSubtitleIndex();

    if (index < 0) {
      return;
    }

    this.lastPauseTime = -1;

    this.currentSubtitleIndex = index;

    action(this);

    this.lastSubtitleIndex = this.currentSubtitleIndex;
  }

  findSubtitleIndex() {
    const playerTime = this.playerInstance.getCurrentTime();

    if (playerTime === this.lastPauseTime) {
      return this.lastSubtitleIndex;
    } else {
      return this.subtitlesInstance.getIndexByTime(playerTime);
    }
  }

  getCurrentSubtitle() {
    return this.subtitlesInstance.getSubtitleByIndex(this.currentSubtitleIndex);
  }

  playSubtitle() {
    let {startTime} = this.getCurrentSubtitle();

    this.playerInstance.seek(startTime - Core.timeDiff);

    if (this.playerInstance.isPaused()) {
      this.playerInstance.play();
    }
  }

  pauseAfterSubtitle(time) {
    clearTimeout(this.pauseTimerId);

    const {startTime, endTime} = this.getCurrentSubtitle();
    const subtitleDiff = endTime - startTime;
    const pauseTimer = time || subtitleDiff;

    this.pauseTimerId = setTimeout(() => {
      const playerTime = this.playerInstance.getCurrentTime();
      const diff = playerTime - endTime;

      if (diff < Core.timeDiff / 2 && Math.abs(diff) < subtitleDiff) {
        this.pauseAfterSubtitle(Core.timeDiff);
        return;
      }

      if (diff >= Core.timeDiff / 2 && diff < Core.timeDiff * 6) {
        this.playerInstance.pause();
        this.lastPauseTime = this.playerInstance.getCurrentTime();
      }
    }, pauseTimer);
  }
}

//

// static repeatKeyCode = keycode('r');
// repeatSubtitle() {
//   this.pauseAfterSubtitle();
// this.playSubtitle();
// }
// document.addEventListener('keyup', ({ keyCode }: KeyboardEvent) => {
//   if (Core.repeatKeyCode === keyCode) {
//
//   }
// });

import * as keycode from "keycode";

export class Core {

  static timeDiff = 150;

  static keyCodeHandlers = {};

  static addFeature(keyName, feature) {
    Core.keyCodeHandlers[keycode(keyName)] = feature;
  }

  currentSubtitleIndex;
  lastSubtitleIndex;

  lastPauseTime;
  pauseTimerId;

  constructor(
    player,
    subtitles
  ) {
    this.playerInstance = player;
    this.subtitlesInstance = subtitles;
  }

  startuem() {
    document.addEventListener('keyup', ({ keyCode }) => {
      const feature = Core.keyCodeHandlers[keyCode];

      if (feature) {
        const index = this.findSubtitleIndex();

        if (isNaN(index)) {
          return;
        }

        this.currentSubtitleIndex = index;

        feature(this);

        this.lastSubtitleIndex = this.currentSubtitleIndex;
        this.currentSubtitleIndex = null;
      }
    });
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
    return this.subtitlesInstance.getByIndex(this.currentSubtitleIndex);
  }

  playSubtitle() {
    let {startTime} = this.getCurrentSubtitle();

    startTime = startTime - Core.timeDiff;

    this.playerInstance.seek(startTime);

    if (this.playerInstance.isPaused()) {
      this.playerInstance.play();
    }
  }

  pauseAfterSubtitle() {
    clearTimeout(this.pauseTimerId);

    const {startTime, endTime} = this.getCurrentSubtitle();
    const pauseTimer = endTime - startTime + Core.timeDiff * 2;

    this.pauseTimerId = setTimeout(() => {
      const playerTime = this.playerInstance.getCurrentTime();
      const diff = Math.abs(playerTime - endTime);

      if (diff <= Core.timeDiff * 6) {
        this.lastPauseTime = playerTime;
        this.playerInstance.pause();
      }
    }, pauseTimer);
  }
}

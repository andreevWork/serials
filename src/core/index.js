import * as keycode from "keycode";

export class Core {

  static diff = 150;

  static keyCodeHandlers = {
    [keycode('r')]: 'repeatHandler',
    [keycode('b')]: 'backHandler'
  };

  repeatCount;
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
      const handlerName = Core.keyCodeHandlers[keyCode];

      if (handlerName) {
        const index = this.findSubtitleIndex();

        if (isNaN(index)) {
          return;
        }

        this[handlerName](index);
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

  getLastSubtitle() {
    return this.subtitlesInstance.getByIndex(this.lastSubtitleIndex);
  }

  backHandler(index) {
    if (this.lastSubtitleIndex === index && index !== 0) {
      index--;
    }

    this.repeatHandler(index);
  }

  repeatHandler(index) {
    this.incrementRepeatCount(index);

    this.lastSubtitleIndex = index;

    if (this.isNeededPause()) {
      this.startPauseTimer();
    }
    this.startPlay();
  }

  startPlay() {
    let {startTime} = this.getLastSubtitle();
    startTime = ( startTime - Core.diff ) / 1000;

    this.playerInstance.seek(startTime);

    if (this.playerInstance.isPaused()) {
      this.playerInstance.play();
    }
  }

  incrementRepeatCount(index) {
    if (index === this.lastSubtitleIndex) {
      this.repeatCount++;
    } else {
      this.repeatCount = 1;
    }
  }

  isNeededPause() {
    return this.repeatCount > 0;
  }

  startPauseTimer() {
    clearTimeout(this.pauseTimerId);

    const {startTime, endTime} = this.getLastSubtitle();
    const pauseTimer = endTime - startTime + Core.diff * 2;

    this.pauseTimerId = setTimeout(() => {
      const playerTime = this.playerInstance.getCurrentTime();
      const diff = Math.abs(playerTime - endTime);

      if (diff < Core.diff * 4) {
        this.lastPauseTime = playerTime;
        this.playerInstance.pause();
      }
    }, pauseTimer);
  }
}

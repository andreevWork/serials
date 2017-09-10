// @flow

import * as keycode from "keycode";
import type {ISubtitles, Subtitle} from "../subtitles/index";
import type {IPlayer} from "../player/index";

export interface ICore {
  startuem(): void;
  findSubtitleIndex(): number;
  getCurrentSubtitle(): Subtitle;
  playSubtitle(): void;
  repeatSubtitle(): void;
  pauseAfterSubtitle(): void;
}

export class Core implements ICore {

  static timeDiff = 100;

  static repeatKeyCode = keycode('r');

  playerInstance: IPlayer;
  subtitlesInstance: ISubtitles;

  currentSubtitleIndex: number;
  lastSubtitleIndex: number;

  lastPauseTime: number;
  pauseTimerId: number;

  constructor(
    playerInstance: IPlayer,
    subtitlesInstance: ISubtitles
  ) {
    this.playerInstance = playerInstance;
    this.subtitlesInstance = subtitlesInstance;
  }

  startuem(): void {
    document.addEventListener('keyup', ({ keyCode }: KeyboardEvent) => {
      if (Core.repeatKeyCode === keyCode) {
        const index = this.findSubtitleIndex();

        if (index < 0) {
          return;
        }

        this.lastPauseTime = -1;

        this.currentSubtitleIndex = index;

        this.repeatSubtitle();

        this.lastSubtitleIndex = this.currentSubtitleIndex;
      }
    });
  }

  findSubtitleIndex(): number {
    const playerTime = this.playerInstance.getCurrentTime();

    if (playerTime === this.lastPauseTime) {
      return this.lastSubtitleIndex;
    } else {
      return this.subtitlesInstance.getIndexByTime(playerTime);
    }
  }

  getCurrentSubtitle(): Subtitle {
    return this.subtitlesInstance.getSubtitleByIndex(this.currentSubtitleIndex);
  }

  repeatSubtitle(): void {
    this.pauseAfterSubtitle();
    this.playSubtitle();
  }

  playSubtitle(): void {
    let {startTime} = this.getCurrentSubtitle();

    this.playerInstance.seek(startTime - Core.timeDiff);

    if (this.playerInstance.isPaused()) {
      this.playerInstance.play();
    }
  }

  pauseAfterSubtitle(time:? number): void {
    clearTimeout(this.pauseTimerId);

    const {startTime, endTime} = this.getCurrentSubtitle();
    const subtitleDiff = endTime - startTime;
    const pauseTimer = time || subtitleDiff;

    this.pauseTimerId = setTimeout(() => {
      const playerTime = this.playerInstance.getCurrentTime();
      const diff = playerTime - endTime;

      if (diff < Core.timeDiff && Math.abs(diff) < subtitleDiff) {
        this.pauseAfterSubtitle(Core.timeDiff * 2);
        return;
      }

      if (diff > Core.timeDiff / 2 && diff < Core.timeDiff * 6) {
        this.lastPauseTime = playerTime;
        this.playerInstance.pause();
      }
    }, pauseTimer);
  }
}

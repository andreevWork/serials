// @flow

import * as keycode from "keycode";
import type {ISubtitles, Subtitle} from "../subtitles/index";
import type {IPlayer} from "../player/index";

export interface ICore {
  startuem(): void;
  findSubtitleIndex(): number;
  getCurrentSubtitle(): Subtitle;
  playSubtitle(): void;
  pauseAfterSubtitle(): void;
}

type FeatureDict = {
  [keyCode: number]: Function;
}

export class Core implements ICore {

  static timeDiff = 111;

  static keyCodeHandlers: FeatureDict = {};

  static addFeature(keyName: string, feature: Function) {
    Core.keyCodeHandlers[keycode(keyName)] = feature;
  }

  playerInstance: IPlayer;
  subtitlesInstance: ISubtitles;

  currentSubtitleIndex: number;
  lastSubtitleIndex: number;

  lastPauseTime: number;
  pauseTimerId: number;

  clearFeatureFn: Function;

  constructor(
    playerInstance: IPlayer,
    subtitlesInstance: ISubtitles
  ) {
    this.playerInstance = playerInstance;
    this.subtitlesInstance = subtitlesInstance;
  }

  startuem(): void {
    document.addEventListener('keyup', ({ keyCode }: KeyboardEvent) => {
      const feature: Function = Core.keyCodeHandlers[keyCode];

      if (feature) {
        const index = this.findSubtitleIndex();

        if (index < 0) {
          return;
        }

        this.lastPauseTime = -1;

        this.currentSubtitleIndex = index;

        if (!feature.isBase && this.clearFeatureFn) {
          this.clearFeatureFn();
        }

        if (feature.isBase) {
          feature(this)
        } else {
          this.clearFeatureFn = feature(this);
        }


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

      if (diff < Core.timeDiff / 2 && Math.abs(diff) < subtitleDiff) {
        this.pauseAfterSubtitle(Core.timeDiff);
        return;
      }

      if (diff > Core.timeDiff / 2 && diff < Core.timeDiff * 4) {
        this.lastPauseTime = playerTime;
        this.playerInstance.pause();
      }
    }, pauseTimer);
  }
}

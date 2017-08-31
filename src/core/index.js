// @flow

import * as keycode from "keycode";
import type {ISubtitles, Subtitle} from "../subtitles/index";
import type {IPlayer} from "../player/index";
import type {Feature} from "../features/types";

export interface ICore {
  startuem(): void;
  findSubtitleIndex(): number;
  getCurrentSubtitle(): Subtitle;
  playSubtitle(): void;
  pauseAfterSubtitle(): void;
}

type FeatureClass = Class<Feature<any>>;

type FeatureDict = {
  [keyCode: number]: FeatureClass;
}

export class Core implements ICore {

  static timeDiff = 150;

  static keyCodeHandlers: FeatureDict = {};

  static addFeature(keyName: string, feature: FeatureClass) {
    Core.keyCodeHandlers[keycode(keyName)] = feature;
  }

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
      const Feature: FeatureClass = Core.keyCodeHandlers[keyCode];

      if (Feature) {
        const index = this.findSubtitleIndex();

        if (index < 0) {
          return;
        }

        this.currentSubtitleIndex = index;

        const feature = new Feature(this);
        feature.startuem();

        this.lastSubtitleIndex = this.currentSubtitleIndex;
        this.currentSubtitleIndex = -1;
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

    startTime = startTime - Core.timeDiff;

    this.playerInstance.seek(startTime);

    if (this.playerInstance.isPaused()) {
      this.playerInstance.play();
    }
  }

  pauseAfterSubtitle(): void {
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

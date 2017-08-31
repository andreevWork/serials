// @flow

import type {Feature} from "./types";
import type {ICore} from "../core/index";

export type RepeatOptions = {
  forcePause: boolean;
} | any;

export class RepeatSubtitle implements Feature<RepeatOptions> {

  coreInstance: ICore;
  options: RepeatOptions;

  constructor(coreInstance: ICore, options:? RepeatOptions) {
    this.coreInstance = coreInstance;
    this.options = options;
  }

  startuem() {
    this.coreInstance.pauseAfterSubtitle();
    this.coreInstance.playSubtitle();
  }
}

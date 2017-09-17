// @flow

import {Subtitles} from "./subtitles";
import {Player} from "./player";
import {Core} from "./core";

import type {ISubtitles} from "./subtitles/index";
import type {IPlayer} from "./player/index";
import {Features} from "./features/index";
import {DragSubtitles} from "./features/dragSubtitles/dragSubtitles";

document.addEventListener("DOMContentLoaded", async function() {
  const playerInstance: IPlayer = new Player();
  const subtitlesInstance: ISubtitles = new Subtitles();

  await Promise.all([
    playerInstance.setup('player'),
    subtitlesInstance.loadSubtitles('/subs.srt'),
  ]);

  const core = new Core(playerInstance, subtitlesInstance);
  const features = new Features(core, 'feature');

  features.addFeature('d', DragSubtitles);

  core.startuem();
  features.startuem();
});

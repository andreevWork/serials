// @flow

import {Subtitles} from "./subtitles";
import {Player} from "./player";
import {Core} from "./core";

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

  core.startuem();
});

import * as Plyr from "plyr";

export class Player {

  player;

  setup(playedId) {
    this.player = Plyr.setup(
      document.getElementById(playedId)
    )[0];

    return new Promise(res => {
      this.player.on('ready', res);
    })
  }

  seek(ms) {
    this.player.seek( ms / 1000 );
  }

  isPaused(): boolean {
    return this.player.isPaused();
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  getCurrentTime() {
    return Math.round( this.player.getCurrentTime() * 1000 );
  }
}

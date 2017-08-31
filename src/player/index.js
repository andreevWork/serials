import * as Plyr from "plyr";

export class Player {

  player;
  playerTag;

  timeHandlers = [];

  constructor(playedId) {
    this.player = Plyr.setup(document.getElementById(playedId))[0];
    this.playerTag = this.player.getMedia();

    return new Promise(res => {
      this.player.on('ready', () => {
        res(this);
      });
    })
  }

  seek(ms) {
    this.player.seek( parseInt( ms / 1000 ) );
  }

  isPaused() {
    return this.player.isPaused();
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  getCurrentTime() {
    return parseInt( this.player.getCurrentTime() * 1000 );
  }

  onTimeChange(cb) {
    const fn = () => {
      cb(this.getCurrentTime());
    };
    this.timeHandlers.push(fn);
    this.playerTag.addEventListener('timeupdate', fn);
  }

  offTimeChange() {
    this.timeHandlers.forEach(fn => this.playerTag.removeEventListener('timeupdate', fn));
    this.timeHandlers.length = 0;
  }
}

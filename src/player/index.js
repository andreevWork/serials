import * as Plyr from "plyr";

export class Player {

  constructor(playedId) {
    this.player = Plyr.setup(document.getElementById(playedId))[0];

    return new Promise(res => {
      this.player.on('ready', () => {
        res(this);
      });
    })
  }

  seek(newTime) {
    this.player.seek(newTime);
  }

  getCurrentTime() {
    return parseInt(this.player.getCurrentTime() * 1000);
  }


  onTimeChange(cb) {
    this.player.on('timeupdate', () => {
      cb(this.getCurrentTime());
    });
  }
}

// @flow
import * as Plyr from "plyr";

export interface IPlayer {
  setup(playedId: string): Promise<void>;
  seek(ms: number): void;
  isPaused(): boolean;
  play(): void;
  pause(): void;
  getCurrentTime(): number;
}

export class Player implements IPlayer {

  player: any;

  setup(playedId: string): Promise<void> {
    this.player = Plyr.setup(document.getElementById(playedId))[0];

    return new Promise(res => {
      this.player.on('ready', res);
    })
  }

  seek(ms: number): void {
    this.player.seek( ms / 1000 );
  }

  isPaused(): boolean {
    return this.player.isPaused();
  }

  play(): void {
    this.player.play();
  }

  pause(): void {
    this.player.pause();
  }

  getCurrentTime(): number {
    return Math.round( this.player.getCurrentTime() * 1000 );
  }
}

const keycode = require('keycode');

const keyCodesHandlersMap = {
  [keycode('r')]: 'repeatHandler',
  [keycode('b')]: 'backHandler'
};

export class Main {
  constructor(
    player,
    subtitles
  ) {
    this.player = player;
    this.subtitles = subtitles;

    this.addKeyListener();
  }

  addKeyListener() {
    document.addEventListener('keydown', ({ keyCode }) => {
      const handlerName = keyCodesHandlersMap[keyCode];

      if (handlerName) {
        const time = this.player.getCurrentTime();
        let [index, sub] = this.subtitles.getByTime(time);

        if (isNaN(index)) {
          return;
        }

        this[handlerName](index, sub);
      }
    });
  }

  backHandler() {
    console.log(5);
    //
    // if (p === index && index !== 0) {
    //   index = index - 1;
    //   sub = this.subtitles.getByIndex(index);
    // }
    //
    // p = index;
  }

  repeatHandler(_, sub) {
    this.player.seek(sub.startTime / 1000 - 0.1);
  }

}

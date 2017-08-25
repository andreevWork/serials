import * as Plyr from 'plyr';
import {Parser} from "./parser";
const bs = require("binary-search");
const keycode = require('keycode');


fetch('/subs.srt')
    .then(e => e.text())
    .then(e => {
        const subsEl = document.getElementById('subs');
        const subs = Parser(e);
        const instnace = Plyr.setup()[0];
        let startTime;
        let endTime;

        instnace.on('timeupdate', function(event) {
            const time = parseInt(event.detail.plyr.getCurrentTime() * 1000);

            if (time < endTime && time > startTime) {
                return;
            }

            const index = bs(subs, time, (sub, time) => {
                return time < sub.startTime  ?
                    1
                    :
                    time > sub.endTime ?
                        -1
                        :
                        0;
            });

            if (index >= 0) {
                console.log(subs[index]);
                endTime = subs[index].endTime;
                startTime = subs[index].startTime;

                subsEl.textContent = subs[index].text;
            } else {
                subsEl.textContent = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode === keycode('r')) {
                instnace.seek(startTime / 1000 - 0.1);
            }
        })
    });
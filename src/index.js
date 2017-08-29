
import {Subtitles} from "./subtitles";
import {Player} from "./player";
import {Core} from "./core";
import {Features} from "./features";

document.addEventListener("DOMContentLoaded", async function() {
  const [player, subtitles] = await Promise.all([
    new Player('player'),
    new Subtitles('/subs.srt'),
  ]);

  const main = new Core(player, subtitles);
  const features = new Features('feature');

  main.startuem();
  features.startuem();
});

//
// checkFeatures(keyCode) {
//   const featureInstance = this.keyCodeFeatures[keyCode];
//
//   if (featureInstance) {
//     const subtitle = this.getLastSubtitle();
//     featureInstance.start(subtitle);
//     featureInstance.onComplete(() => {
//       this.repeatHandler(this.lastSubtitleIndex, this.getLastSubtitle(), true);
//     });
//   }
// }

//
//
// fetch('/subs.srt')
//   .then(e => e.text())
//   .then(e => {
//     const subsEl = document.getElementById('subs');
//     const subs = Parser(e);
//     const instnace = Plyr.setup()[0];
//     let startTime;
//     let endTime;
//
//     instnace.on('timeupdate', function (event) {
//       const time = parseInt(event.detail.plyr.getCurrentTime() * 1000);
//
//       if (time < endTime && time > startTime) {
//         return;
//       }
//
//       const index = bs(subs, time, (sub, time) => {
//         return time < sub.startTime ?
//           1
//           :
//           time > sub.endTime ?
//             -1
//             :
//             0;
//       });
//
//       if (index >= 0) {
//         console.log(subs[index]);
//         endTime = subs[index].endTime;
//         startTime = subs[index].startTime;
//
//         subsEl.textContent = subs[index].text;
//       } else {
//         subsEl.textContent = '';
//       }
//     });
//

//   });

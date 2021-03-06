import {getRequest} from "utils/request";
import {binarySearch} from "utils/binarySearch";

export class Subtitles {

  subtitles;

  loadSubtitles(fileName) {
    return getRequest(fileName)
      .then(subtitlesParser)
      .then(subtitles => {
        this.subtitles = subtitles;
      });
  }

  getIndexByTime(time) {
    return binarySearch(this.subtitles, time, (sub, time) => {
      return time < sub.startTime ?
        1
        :
        time > sub.endTime ?
          -1
          :
          0;
    }, true);
  }

  getSubtitleByIndex(index) {
    return this.subtitles[index];
  }
}

function subtitlesParser(data) {

  const useMs = true;

  data = data.replace(/\r/g, '');
  const regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
  data = data.split(regex);
  data.shift();

  const items = [];
  for (let i = 0; i < data.length; i += 4) {
    items.push({
      startTime: useMs ? timeMs(data[i + 1].trim()) : data[i + 1].trim(),
      endTime: useMs ? timeMs(data[i + 2].trim()) : data[i + 2].trim(),
      text: data[i + 3].trim()
    });
  }

  return items;

  function timeMs(val) {
    const regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
    const parts = regex.exec(val);

    if (parts === null) {
      return 0;
    }

    for (let i = 1; i < 5; i++) {
      parts[i] = parseInt(parts[i], 10);
      if (isNaN(parts[i])) parts[i] = 0;
    }

    // hours + minutes + seconds + ms
    return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000 + parts[4];
  }
}

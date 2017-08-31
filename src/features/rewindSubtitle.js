import {repeatSubtitle} from "./repeatSubtitle";

export function rewindSubtitle(coreInstance) {
  if (coreInstance.currentSubtitleIndex !== 0 && coreInstance.currentSubtitleIndex === coreInstance.lastSubtitleIndex) {
    coreInstance.currentSubtitleIndex--;
  }

  repeatSubtitle(coreInstance);
}

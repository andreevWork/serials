import * as keycode from "keycode";

export class Features {

  keyCodeFeatures = {};

  constructor(coreInstance, elementId) {
    this.coreInstance = coreInstance;
    this.featureContainer = document.getElementById(elementId);
  }

  addFeature(featureInstance) {
    const keyCode = keycode(featureInstance.keyName);
    this.keyCodeFeatures[keyCode] = featureInstance;
  }

  startuem() {
    document.addEventListener('keyup', ({ keyCode }) => {
      const feature = this.keyCodeFeatures[keyCode];

      if (feature) {
        const index = this.coreInstance.findSubtitleIndex();

        if (isNaN(index)) {
          return;
        }

        this.coreInstance.repeatHandler(true);

        feature.startuem(this.featureContainer, this.coreInstance.getLastSubtitle().text);

        feature.onComplete(() => {
          this.coreInstance.repeatAndContinue();
        });
      }
    });
  }
}

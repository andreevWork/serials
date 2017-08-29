import * as keycode from "keycode";

export class Features {

  keyCodeFeatures = {};
  startFuture;

  constructor(elementId) {
    this.featureContainer = document.getElementById(elementId);
  }

  addFeature(featureInstance) {
    const keyCode = keycode(featureInstance.getKeyName());
    this.keyCodeFeatures[keyCode] = featureInstance;
  }

  startuem() {
    document.addEventListener('keyup', ({ keyCode }) => {
      const feature = this.keyCodeFeatures[keyCode];

      if (feature) {
        this.startFuture(feature)
      }
    });
  }

  onStartFeature(cb) {
    this.startFuture = cb;
  }
}

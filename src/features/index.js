import * as keycode from "keycode";

export class Features {

  static featuresKeyCodes = {};

  constructor(coreInstance, containerId) {
    this.coreInstance = coreInstance;
    this.container = document.getElementById(containerId);
  }

  addFeature(keyName, featureClass) {
    Features.featuresKeyCodes[keycode(keyName)] = new featureClass(this.coreInstance, this.container);
  }

  startuem() {
    document.addEventListener('keyup', ({ keyCode }: KeyboardEvent) => {
      const feature = Features.featuresKeyCodes[keyCode];

      if (feature) {
        feature.startuem();
      }
    });
  }
}

import * as keycode from "keycode";

export class Features {

  static featuresKeyCodes = {};

  currentFeature;

  constructor(coreInstance, containerId) {
    this.coreInstance = coreInstance;
    this.container = document.getElementById(containerId);
  }

  addFeature(keyName, featureClass) {
    Features.featuresKeyCodes[keycode(keyName)] = featureClass;
  }

  startuem() {
    document.addEventListener('keyup', ({ keyCode }: KeyboardEvent) => {
      const featureClass = Features.featuresKeyCodes[keyCode];

      if (featureClass) {

        if (this.currentFeature) {
          this.currentFeature.destroy(true);
        }

        this.currentFeature = new featureClass(this.coreInstance, this.container);

        this.currentFeature.startuem();

        this.currentFeature.onCompleteEvent(() => {
          this.coreInstance.playSubtitle();
          this.currentFeature = null;
        });
      }
    });
  }
}

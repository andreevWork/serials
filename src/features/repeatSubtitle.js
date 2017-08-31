const defaultOptions = {
  needPause: true
};

export const repeatSubtitle = function (coreInstance, options) {
  options = {
    ...options,
    ...defaultOptions
  };

  if (options.needPause) {
    coreInstance.pauseAfterSubtitle();
  }

  coreInstance.playSubtitle();
};

repeatSubtitle.isBase = true;

export const calculateFrame = (frameWidth, frameHeight, viewportWidth, viewportHeight) => {
  const frameAspectRatio = frameWidth / frameHeight;
  const viewportAspectRatio = viewportWidth / viewportHeight;

  // Vertical letterboxing
  if (frameAspectRatio > viewportAspectRatio) {
    const virtualWidth = viewportWidth;
    const virtualHeight = Math.floor(virtualWidth * (1 / frameAspectRatio));
    const x = 0;
    const y = (viewportHeight - virtualHeight) / 2;

    return {
      x,
      y,
      virtualWidth,
      virtualHeight
    };
  } else { // horizontal letterboxing
    const virtualHeight = viewportHeight;
    const virtualWidth = Math.floor(virtualHeight * frameAspectRatio);
    const x = (viewportWidth - virtualWidth) / 2;
    const y = 0;

    return {
      x,
      y,
      virtualWidth,
      virtualHeight
    };
  }
};
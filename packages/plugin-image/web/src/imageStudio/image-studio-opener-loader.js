function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;

    document.head.appendChild(script);
  });
}

const IMAGE_STUDIO_OPENER_SRC =
  // eslint-disable-next-line max-len
  'https://static.parastorage.com/unpkg/@wix/media-image-studio-opener@3.27.0/dist/statics/MediaImageStudio.bundle.min.js';

let mediaImageStudioPackageLoader;
function getImageStudioPackage() {
  if (!mediaImageStudioPackageLoader) {
    mediaImageStudioPackageLoader = loadScript(IMAGE_STUDIO_OPENER_SRC);
  }
  return mediaImageStudioPackageLoader.then(() => window.MediaImageStudio);
}

export { getImageStudioPackage };

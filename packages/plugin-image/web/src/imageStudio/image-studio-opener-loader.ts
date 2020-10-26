function loadScript(src: string) {
  return new Promise<Event>(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;

    document.head.appendChild(script);
  });
}

const IMAGE_STUDIO_OPENER_SRC =
  // eslint-disable-next-line max-len
  'https://static.parastorage.com/unpkg/@wix/media-image-studio-opener@3.27.0/dist/statics/MediaImageStudio.bundle.min.js';

let mediaImageStudioPackageLoader: Promise<Event>;
function getImageStudioPackage() {
  if (!mediaImageStudioPackageLoader) {
    disableRequireJS(); //if requireJS is present the script doesn't load MediaImageStudio onto the window
    mediaImageStudioPackageLoader = loadScript(IMAGE_STUDIO_OPENER_SRC);
  }
  return mediaImageStudioPackageLoader.then(() => {
    enableRequireJS();
    return window.MediaImageStudio;
  });
}

function disableRequireJS() {
  if (window.requirejs && !window.requirejsBackup) {
    window.requirejsBackup = {
      define: window.define,
      require: window.require,
      requirejs: window.requirejs,
    };

    window.define = undefined;
    window.require = undefined;
    window.requirejs = undefined;
  }
}

function enableRequireJS() {
  if (window.requirejsBackup) {
    Object.assign(window, window.requirejsBackup);
    window.requirejsBackup = undefined;
  }
}

export { getImageStudioPackage };

declare global {
  interface Window {
    MediaImageStudio;
    require;
    requirejs;
    requirejsBackup;
    define;
  }
}

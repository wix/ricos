function loadScript(src, onLoad) {
  const script = document.createElement('script');
  script.onload = onLoad;
  script.src = src;

  document.head.appendChild(script);
}

const IMAGE_STUDIO_OPENER_SRC = 'https://static.parastorage.com/unpkg/@wix/media-image-studio-opener@3.27.0/dist/statics/MediaImageStudio.bundle.min.js';
let isLoading;
let loadHandlers = [];

function loadGlobalHandler() {
  isLoading = false;

  loadHandlers.forEach(handler => {
    handler(window.MediaImageStudio);
  });

  loadHandlers = [];
}

function loadImageStudioOpenerPackage(onLoad = () => {}) {
  if (window.MediaImageStudio) {
    onLoad(window.MediaImageStudio);
    return;
  }

  loadHandlers.push(onLoad);

  if (isLoading) {
    return;
  }

  isLoading = true;
  loadScript(IMAGE_STUDIO_OPENER_SRC, loadGlobalHandler);
}

export {
  loadImageStudioOpenerPackage
}
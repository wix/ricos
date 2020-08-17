const getDataHookSelector = (dataHook: string) => `[data-hook="${dataHook}"]`;

const RicosDriver = {
  editor: {
    contentEditable: '[contenteditable="true"]',
  },

  viewer: {
    image: {
      root: getDataHookSelector('imageViewer'),
    },
    fullScreen: {
      root: getDataHookSelector('fullscreen-root'),
      loadedImage: getDataHookSelector(`gallery-item-image-img`),
      proGalleryRoot: '#pro-gallery-default-dom-id',
    },
    gallery: {
      image: getDataHookSelector('gallery-item-image-img'),
    },
  },
};

export default RicosDriver;

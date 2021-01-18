export const DEFAULTS = Object.freeze({
  config: {
    toolbar: {
      hidden: [],
    },
    size: 'content',
    alignment: 'center',
  },
  configViewer: {
    isDownloadEnabled: true,
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
});

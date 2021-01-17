export const DEFAULTS = Object.freeze({
  config: {
    toolbar: {
      hidden: [],
    },
    size: 'content',
    alignment: 'center',
    isDownloadEnabled: true,
  },
  configViewer: {
    isDownloadEnabled: true,
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
});

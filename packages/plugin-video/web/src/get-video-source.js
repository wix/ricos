const getVideoSrc = (src, settings = {}) => {
  if (typeof src === 'object') {
    if (settings && settings.getVideoUrl) {
      return settings.getVideoUrl(src);
    } else {
      console.error('must set getVideoUrl in plugin config when using custom video source!', src); //eslint-disable-line no-console
    }
  }

  return src;
};

export default getVideoSrc;

import imageClientAPI from 'image-client-api';

const WIX_STATIC_URL = 'https://static.wixstatic.com';
class WixMediaUrl {
  constructor() {
    // default small quality for performance (should get exact size after first render and then the right quality)
    // using low quality for performance instead of size for the renderer to position the images currectly (when using dynamic height layouts)
    this.DEFAULT_SIZE = 2048;
    this.DEFAULT_QUALITY = 5;
    this.DEFAULT_TYPE = 'preload';
  }

  resize = (w, h, rw, rh) => {
    if (rw > w && rh > h) {
      return { width: w, height: h };
    }
    return { width: rw, height: rh };
  };

  createUrl = (src, rw, rh, rq, type = this.DEFAULT_TYPE) => {
    if (type === 'preload') {
      return this.createPreloadUrl(src, rw, rh, rq);
    }
    return this.createHiResUrl(src, rw, rh, rq);
  };

  createHiResUrl = (
    { file_name: fileName, width: w, height: h } = {},
    rw = this.DEFAULT_SIZE,
    rh = this.DEFAULT_SIZE,
    rq = this.DEFAULT_QUALITY
  ) =>
    fileName ? imageClientAPI.getScaleToFitImageURL(fileName, w, h, rw, rh, { quality: rq }) : '';

  createPreloadUrl = (
    { file_name: fileName, width: w, height: h } = {},
    rw = this.DEFAULT_SIZE,
    rh = this.DEFAULT_SIZE,
    rq = this.DEFAULT_QUALITY
  ) => {
    if (fileName) {
      const { width, height } = this.resize(w, h, rw, rh);
      const H = Math.ceil(height); //make sure no sterching will occur
      const W = Math.ceil(width);
      const format = this.getImageFormat(fileName);
      return `${WIX_STATIC_URL}/media/${fileName}/v1/fit/w_${W},h_${H},al_c,q_${rq}/file${format}`;
    }
    return '';
  };

  getImageFormat = fileName => {
    const matches = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/i.exec(fileName);
    return matches ? matches[0] : '.jpg';
  };
}

const wixMediaUrl = new WixMediaUrl();
export default wixMediaUrl;

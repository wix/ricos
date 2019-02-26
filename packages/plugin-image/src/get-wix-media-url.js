import imageClientAPI from 'image-client-api';

const WIX_STATIC_URL = 'https://static.wixstatic.com';
const DEFAULT = {
  SIZE: 300,
  QUALITY: 5,
  TYPE: 'preload',
};

class WixMediaUrl {
  resize = (w, h, rw, rh) => {
    if (rw > w && rh > h) {
      return { width: w, height: h };
    }
    return { width: rw, height: rh };
  };

  createUrl = (src, rw, rh, rq, type = DEFAULT.TYPE) => {
    if (type === 'preload') {
      return this.createPreloadUrl(src, rw, rh, rq);
    }
    return this.createHiResUrl(src, rw, rh, rq);
  };

  createHiResUrl = (
    { file_name: fileName, width: w, height: h } = {},
    rw = DEFAULT.SIZE,
    rh = DEFAULT.SIZE,
    rq = DEFAULT.QUALITY
  ) =>
    fileName ? imageClientAPI.getScaleToFitImageURL(fileName, w, h, rw, rh, { quality: rq }) : '';

  createPreloadUrl = (
    { file_name: fileName, width: w, height: h } = {},
    rw = DEFAULT.SIZE,
    rh = DEFAULT.SIZE,
    rq = DEFAULT.QUALITY
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
export { DEFAULT as WIX_MEDIA_DEFAULT };

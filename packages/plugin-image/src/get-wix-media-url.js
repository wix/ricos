import { getScaleToFitImageURL } from 'image-client-api/dist/imageClientSDK';

class WixMediaUrl {
  constructor() {
    // default small quality for performance (should get exact size after first render and then the right quality)
    // using low quality for performance instead of size for the renderer to position the images currectly (when using dynamic height layouts)
    this.DEFAULT_SIZE = 2048;
    this.DEFAULT_QUALITY = 5;
  }

  createUrl = ({ file_name: fileName, width: w, height: h } = {},
    rw = this.DEFAULT_SIZE, rh = this.DEFAULT_SIZE, rq = this.DEFAULT_QUALITY) =>
    fileName ? getScaleToFitImageURL(fileName, w, h, rw, rh, { quality: rq }) : '';
}

const wixMediaUrl = new WixMediaUrl();
export default wixMediaUrl;

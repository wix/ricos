import { getAbsoluteUrl } from '../lib/baseUrlConverter';
/* eslint-disable max-len */
import resizeMediaUrl from '../lib/resize-media-url';

// eslint-disable-next-line mocha/no-skipped-tests
const imgUrl = '8bb438_177fd19d40ed4f40ac2a65c00ed0ce40.jpg';
const smallerImgUrl = '8bb438_4a6550d4df364f9890180f52243fb396.jpg';
const videoUrl = '11062b_a552731f40854d16a91627687fb8d1a6/1080p/mp4/file.mp4';
const createRequest = ({
  requiredWidth,
  requiredHeight,
  maxWidth,
  maxHeight,
  sharpParams,
  faces = [1],
  url = imgUrl,
  resizeMethod = 'fit',
}) => ({
  item: {
    maxWidth,
    maxHeight,
    url,
  },
  originalUrl: url,
  resizeMethod,
  requiredWidth,
  requiredHeight,
  sharpParams,
  faces,
  allowWatermark: false,
  focalPoint: undefined,
});
const largeImage =
  'https://static.wixstatic.com/media/8bb438_177fd19d40ed4f40ac2a65c00ed0ce40.jpg/v1/fill/w_726,h_1089,al_c,q_90/8bb438_177fd19d40ed4f40ac2a65c00ed0ce40.jpg';
const mediumImage =
  'https://static.wixstatic.com/media/8bb438_177fd19d40ed4f40ac2a65c00ed0ce40.jpg/v1/fill/w_157,h_236,al_c,q_30,blur_30/8bb438_177fd19d40ed4f40ac2a65c00ed0ce40.jpg';
const smallImage =
  'https://static.wixstatic.com/media/8bb438_4a6550d4df364f9890180f52243fb396.jpg/v1/fill/w_75,h_75,fp_0.50_0.50,q_90/8bb438_4a6550d4df364f9890180f52243fb396.jpg';

describe('resizeMediaUrl', () => {
  describe('images', () => {
    it('Large Image', () => {
      const request = createRequest({
        requiredWidth: 1155,
        requiredHeight: 1089,
        maxWidth: 3413,
        maxHeight: 5120,
        sharpParams: {
          quality: 90,
        },
      });
      const output = resizeMediaUrl(...Object.values(request));
      expect(output).toBe(largeImage);
    });
    it('Medium Image', () => {
      const request = createRequest({
        requiredWidth: 250,
        requiredHeight: 236,
        maxWidth: 3413,
        maxHeight: 5120,
        sharpParams: {
          quality: 30,
          blur: 30,
        },
      });
      const output = resizeMediaUrl(...Object.values(request));
      expect(output).toBe(mediumImage);
    });
    it('Small Image (gallery display)', () => {
      const request = createRequest({
        requiredWidth: 75,
        requiredHeight: 75,
        maxWidth: 1621,
        maxHeight: 1081,
        sharpParams: {
          quality: 90,
        },
        faces: [0.5, 0.5],
        url: smallerImgUrl,
        resizeMethod: 'fill',
      });
      const output = resizeMediaUrl(...Object.values(request));
      expect(output).toBe(smallImage);
    });
  });
  describe('videos', () => {
    it(`shouldn't touch videos`, () => {
      const request = createRequest({
        requiredWidth: 1155,
        requiredHeight: 1089,
        maxWidth: 3413,
        maxHeight: 5120,
        sharpParams: {
          quality: 90,
        },
        resizeMethod: 'video',
        url: videoUrl,
      });
      const output = resizeMediaUrl(...Object.values(request));
      expect(output).toBe(getAbsoluteUrl(videoUrl, 'video'));
    });
  });
});

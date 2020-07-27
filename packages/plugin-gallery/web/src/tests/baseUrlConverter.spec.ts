import { getAbsoluteUrl } from '../lib/baseUrlConverter';

// eslint-disable-next-line mocha/no-skipped-tests
const imageFile = '8bb438_1da83d5d8fcd481ba6bf60b40db869c6.jpg';
const videoFile = '11062b_a552731f40854d16a91627687fb8d1a6/1080p/mp4/file.mp4';
const imageUrls = {
  imageFile,
  imageFileWithSuffix: 'media/' + imageFile,
  absoluteUrl: 'https://static.wixstatic.com/media/' + imageFile,
};
const videoUrls = {
  videoFile,
  videoFileWithSuffix: 'video/' + videoFile,
  absoluteUrl: 'https://video.wixstatic.com/video/' + videoFile,
};
describe('baseUrlConverter', () => {
  describe('images', () => {
    it('should leave absolute url untouched', () => {
      const output = getAbsoluteUrl(imageUrls.absoluteUrl, 'image');
      expect(output).toBe(imageUrls.absoluteUrl);
    });
    it('should add baseUrl if needed', () => {
      const output = getAbsoluteUrl(imageUrls.imageFileWithSuffix, 'image');
      expect(output).toBe(imageUrls.absoluteUrl);
    });
    it('should add baseUrl + suffix if needed', () => {
      const output = getAbsoluteUrl(imageUrls.imageFile, 'image');
      expect(output).toBe(imageUrls.absoluteUrl);
    });
  });
  describe('videos', () => {
    it('should leave absolute url untouched', () => {
      const output = getAbsoluteUrl(videoUrls.absoluteUrl, 'video');
      expect(output).toBe(videoUrls.absoluteUrl);
    });
    it('should add baseUrl if needed', () => {
      const output = getAbsoluteUrl(videoUrls.videoFileWithSuffix, 'video');
      expect(output).toBe(videoUrls.absoluteUrl);
    });
    it('should add baseUrl + suffix if needed', () => {
      const output = getAbsoluteUrl(videoUrls.videoFile, 'video');
      expect(output).toBe(videoUrls.absoluteUrl);
    });
  });
});

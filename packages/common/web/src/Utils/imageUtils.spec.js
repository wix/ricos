import { getImageSrc } from './imageUtils';
describe('imageUtils', () => {
  it('should return correct imageSrc', () => {
    const wixPrefix = 'https://static.wixstatic.com/media/';
    const fileName = '8bb438_83e03311e53a47ce9ba8bda910fdad88.jpg';
    const src = {
      id: 'b12907da5fbb55a31a760e49fb0bb4e6',
      original_file_name: fileName, //eslint-disable-line
      file_name: fileName, //eslint-disable-line
      width: 5177,
      height: 3526,
    };
    expect(getImageSrc(src)).toEqual(
      wixPrefix + fileName + `/v1/fit/w_300,h_300,al_c,q_5/file.jpg`
    );
  });
});

import { deprecateHelpers } from '../../lib/deprecateHelpers';
import { IMAGE_TYPE, GALLERY_TYPE, VIDEO_TYPE } from 'wix-rich-content-common';

describe('Test deprecateHelpers function', () => {
  const functions = {
    onExpand: () => {},
    handleFileUpload: () => {},
    handleFileSelection: () => {},
  };

  Object.entries(functions).forEach(([name, func]) => {
    describe(name, () => {
      it(`should move ${name} func from helpers and add it to plugins config`, () => {
        const helpers = { [name]: func };
        const config = { [GALLERY_TYPE]: {}, [IMAGE_TYPE]: {} };
        deprecateHelpers(helpers, config);
        expect(helpers[name]).toBe(undefined);
        expect(config[GALLERY_TYPE][name]).toBe(func);
        expect(config[IMAGE_TYPE][name]).toBe(func);
      });

      it(`should override existing ${name} func in plugins config`, () => {
        const helpers = { [name]: func };
        const config = {
          [GALLERY_TYPE]: { [name]: () => {} },
          [IMAGE_TYPE]: { [name]: () => {} },
        };
        deprecateHelpers(helpers, config);
        expect(helpers[name]).toBe(undefined);
        expect(config[GALLERY_TYPE][name]).toBe(func);
        expect(config[IMAGE_TYPE][name]).toBe(func);
      });

      it(`should not remove ${name} from plugins config if helpers doesn't include ${name}`, () => {
        const helpers = {};
        const config = {
          [GALLERY_TYPE]: { [name]: func },
          [IMAGE_TYPE]: { [name]: func },
        };
        deprecateHelpers(helpers, config);
        expect(helpers[name]).toBe(undefined);
        expect(config[GALLERY_TYPE][name]).toBe(func);
        expect(config[IMAGE_TYPE][name]).toBe(func);
      });
    });

    describe('onVideoSelected', () => {
      const onVideoSelected = () => {};
      it('should move onVideoSelected func from helpers and add it to video plugin config', () => {
        const helpers = { onVideoSelected };
        const config = { [VIDEO_TYPE]: {} };
        deprecateHelpers(helpers, config);
        expect(helpers.onVideoSelected).toBe(undefined);
        expect(config[GALLERY_TYPE].onVideoSelected).toBe(onVideoSelected);
        expect(config[IMAGE_TYPE].onVideoSelected).toBe(onVideoSelected);
      });

      it('should override existing onVideoSelected func in video plugin config', () => {
        const helpers = { onVideoSelected };
        const config = {
          [VIDEO_TYPE]: { onVideoSelected: () => {} },
        };
        deprecateHelpers(helpers, config);
        expect(helpers.onVideoSelected).toBe(undefined);
        expect(config[VIDEO_TYPE].onVideoSelected).toBe(onVideoSelected);
      });

      // eslint-disable-next-line max-len
      it(`should not remove onVideoSelected from video plugin config if helpers doesn't include onVideoSelected`, () => {
        const helpers = {};
        const config = {
          [VIDEO_TYPE]: { onVideoSelected },
        };
        deprecateHelpers(helpers, config);
        expect(helpers.onVideoSelected).toBe(undefined);
        expect(config[VIDEO_TYPE].onVideoSelected).toBe(onVideoSelected);
      });
    });
  });
});

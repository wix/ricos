import { isValidEditorData } from './contentStateValidator';

describe('Content State Validator', () => {
  it('should return invalid result', async () => {
    const validation = isValidEditorData({ what: 'hey!' });
    expect(validation.valid).toEqual(false);
  });
  it('should return valid result', async () => {
    const validExample = {
      blocks: [
        {
          key: '9fe2n',
          text: 'asdasd',
          type: 'unstyled',
          depth: 1,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
      VERSION: '7.4.6',
    };
    const validation = isValidEditorData(validExample);
    expect(validation.valid).toEqual(true);
  });

  it('should invalidate according to depth', async () => {
    const invalidDepth = {
      blocks: [
        {
          key: '9fe2n',
          text: 'asdasd',
          type: 'unstyled',
          depth: 1234,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
      VERSION: '7.4.6',
    };
    const validation = isValidEditorData(invalidDepth);
    expect(validation.valid).toEqual(false);
  });

  it('should return valid result for anchor in text after convert', async () => {
    const anchorInTextAfterConvert = {
      blocks: [
        {
          key: '13iji',
          text: 'blabla',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: '8vrf6',
          text: 'anchor',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 6,
              style: 'UNDERLINE',
            },
          ],
          entityRanges: [
            {
              offset: 0,
              length: 6,
              key: 0,
            },
          ],
          data: {},
        },
      ],
      entityMap: {
        '0': {
          type: 'ANCHOR',
          mutability: 'MUTABLE',
          data: {
            anchor: '13iji',
          },
        },
      },
      VERSION: '7.15.3-alpha.0',
    };
    const validation = isValidEditorData(anchorInTextAfterConvert);
    expect(validation.valid).toEqual(true);
  });

  it('should return valid result for anchor in image after convert', async () => {
    const anchorInImageAfterConvert = {
      blocks: [
        {
          key: '13iji',
          text: 'blabla',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: 'f6l5n',
          text: ' ',
          type: 'atomic',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [
            {
              offset: 0,
              length: 1,
              key: 0,
            },
          ],
          data: {},
        },
        {
          key: '85a5o',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {
        '0': {
          type: 'wix-draft-plugin-image',
          mutability: 'IMMUTABLE',
          data: {
            config: {
              anchor: '13iji',
              alignment: 'center',
              size: 'content',
              showTitle: true,
              showDescription: true,
            },
            src: {
              id: 'b41768470b13fb3492105a741395b8b1',
              original_file_name: '8bb438_c1ec02dbd02c4e39bbc38dc67c9d5a81.jpg',
              file_name: '8bb438_c1ec02dbd02c4e39bbc38dc67c9d5a81.jpg',
              width: 5600,
              height: 3733,
            },
          },
        },
      },
      VERSION: '7.15.3-alpha.0',
    };
    const validation = isValidEditorData(anchorInImageAfterConvert);
    expect(validation.valid).toEqual(true);
  });
});

import { isValidEditorData } from '../../lib/contentStateValidator';

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
});

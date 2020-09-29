import { readMore, seeFullPost, imageCounter } from './interaction-utils';
import ContentStateBuilder from '../ContentStateBuilder/ContentStateBuilder';
import { butKey } from '../tests/test-utils';

describe('read more interaction', () => {
  it('should merge interaction settings with the last block data', () => {
    const builder = new ContentStateBuilder().plain({
      block: {
        key: 'test',
        type: 'unstyled',
        text: 'some text',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      entities: {},
    });
    const interacted = readMore(builder, { lines: 5 });
    const expectedBlock = {
      type: 'unstyled',
      text: 'some text',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {
        interactions: [
          {
            type: 'READ_MORE',
            settings: { lines: 5 },
          },
        ],
      },
    };

    const actualBlock = interacted.contentState.blocks[0];
    expect(butKey(actualBlock)).toEqual(expectedBlock);
  });

  it('should ignore atomic blocks', () => {
    const builder = new ContentStateBuilder().image({
      mediaInfo: {
        url: '',
        width: 1200,
        height: 1200,
      },
    });
    const expectedBlock = {
      type: 'atomic',
      text: ' ',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [{ key: 0, length: 1, offset: 0 }],
      data: {},
    };
    const interacted = readMore(builder, { label: 'test', lines: 6, ellipsis: '...' });
    const actualBlock = interacted.contentState.blocks[0];

    expect(butKey(actualBlock)).toEqual(expectedBlock);
  });

  it('should bypass an empty state builder', () => {});
});

describe('seeFullPost interaction', () => {
  it('should be appied on atomic block entity data', () => {
    // TODO: refactor image and entity
    const builder = new ContentStateBuilder().image({
      mediaInfo: {
        url: '',
        width: 1200,
        height: 1200,
      },
    });
    const expectedEntity = {
      type: 'wix-draft-plugin-image',
      mutability: 'IMMUTABLE',
      data: {
        src: {
          file_name: '', //eslint-disable-line camelcase
          width: 1200,
          height: 1200,
        },
        config: {
          size: 'content',
          alignment: 'center',
          showDescription: false,
          showTitle: false,
        },
        interactions: [
          {
            type: 'SEE_FULL_CONTENT',
            settings: { label: 'See full post' },
          },
        ],
      },
    };
    const interacted = seeFullPost(builder, { label: 'See full post' });
    const actualEntity = interacted.contentState.entityMap[0];

    expect(actualEntity).toEqual(expectedEntity);
  });
});

describe('image counter interaction', () => {
  it('should be appied on atomic block entity data', () => {
    const builder = new ContentStateBuilder().image({
      mediaInfo: {
        url: '',
        width: 1200,
        height: 1200,
      },
    });
    const expectedEntity = {
      type: 'wix-draft-plugin-image',
      mutability: 'IMMUTABLE',
      data: {
        src: {
          file_name: '', //eslint-disable-line camelcase
          width: 1200,
          height: 1200,
        },
        config: {
          size: 'content',
          alignment: 'center',
          showDescription: false,
          showTitle: false,
        },
        interactions: [
          {
            type: 'IMAGE_COUNTER',
            settings: { counter: 5 },
          },
        ],
      },
    };
    const interacted = imageCounter(builder, { counter: 5 });
    const actualEntity = interacted.contentState.entityMap[0];
    expect(actualEntity).toEqual(expectedEntity);
  });

  it('should ignore non-atomic blocks', () => {
    const expectedBlock = {
      key: 'test',
      type: 'unstyled',
      text: 'some text',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    };
    const builder = new ContentStateBuilder().plain({
      block: expectedBlock,
      entities: {},
    });
    const interacted = imageCounter(builder, { counter: 5 });

    const actualBlock = interacted.contentState.blocks[0];
    expect(butKey(actualBlock)).toEqual(butKey(expectedBlock));
  });
});

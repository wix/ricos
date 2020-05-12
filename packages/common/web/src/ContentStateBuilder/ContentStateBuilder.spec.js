import './contentStateMatcher';
import ContentStateBuilder from './ContentStateBuilder';
const { Alignments, Sizes } = ContentStateBuilder;
const { CENTER, LEFT, RIGHT } = Alignments;
const { ORIGINAL, INLINE, SMALL, BEST_FIT, FULL_WIDTH } = Sizes;

describe('Content State Builder', () => {
  /*
group requirement
    const contentState = new StateBuilder()
      .image({
        mediaInfo: {
          url: 'c1089eafb4ab405ba.jpg',
          metadata: { alt: 'alt text', caption: 'image caption' },
        },
        config: {
          showDescription: true,
          showTitle: true,
          size: 'inline',
          alignment: 'center',
        },
    }).get();

    */

  const imageSrc = {
    filename: '8bb438_095b661d7d2549efbde6b6e981eeb90b.jpg',
    width: 2557,
    height: 1700,
  };

  const imageConfig = {
    alignment: CENTER,
    size: BEST_FIT,
    showTitle: true,
    showDescription: true,
  };

  const imageMetadata = {
    altText: 'Image Alt Text',
    caption: 'My caption',
  };

  const resultedImageData = {
    config: {
      alignment: 'center',
      size: 'content',
      showTitle: true,
      showDescription: true,
    },
    src: {
      id: '8bb438_095b661d7d2549efbde6b6e981eeb90b',
      original_file_name: '8bb438_095b661d7d2549efbde6b6e981eeb90b.jpg', //eslint-disable-line
      file_name: '8bb438_095b661d7d2549efbde6b6e981eeb90b.jpg', //eslint-disable-line
      width: 2557,
      height: 1700,
    },
  };

  const emptyState = {
    blocks: [],
    entityMap: {},
  };

  const singleImageState = {
    blocks: [
      {
        key: '4f697',
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
    ],
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-image',
        mutability: 'IMMUTABLE',
        data: resultedImageData,
      },
    },
  };

  const textAndImageState = {
    blocks: [
      {
        key: '9om7l',
        text: 'Wix Rich Content!',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '4f697',
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
    ],
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-image',
        mutability: 'IMMUTABLE',
        data: resultedImageData,
      },
    },
  };

  const singleDividerState = {
    blocks: [
      {
        key: '9fe2n',
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
    ],
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-divider',
        mutability: 'IMMUTABLE',
        data: {
          type: 'single',
          config: {
            size: 'large',
            alignment: 'center',
            textWrap: 'nowrap',
          },
        },
      },
    },
  };

  it('Should create empty content state', () => {
    const emptyContentState = new ContentStateBuilder().getContent();
    expect(emptyContentState).toMatchContentState(emptyState);
  });

  it('Should generate image block with default data', () => {
    const contentStateObject = new ContentStateBuilder();
    const resultedState = contentStateObject.addImage(imageSrc).getContent();
    expect(resultedState).toMatchContentState(singleImageState);
  });

  it('Should generate divider block with default data', () => {
    const contentStateObject = new ContentStateBuilder();
    const myDiv = ContentStateBuilder.createDividerBlock();
    const resultedState = contentStateObject.appendBlock(myDiv).getContent();
    expect(resultedState).toMatchContentState(singleDividerState);
  });

  it('Should generate text and image', () => {
    const contentStateObject = new ContentStateBuilder();
    const resultedState = contentStateObject
      .addText('Wix Rich Content!')
      .addImage(imageSrc, imageConfig, imageMetadata)
      .getContent();
    expect(resultedState).toMatchContentState(textAndImageState);
  });
});

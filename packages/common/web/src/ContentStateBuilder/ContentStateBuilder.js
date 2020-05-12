import generateRandomKey from './generateRandomKey';

const BlockType = {
  ATOMIC: 'atomic',
  PARAGRAPH: 'unstyled',
};

const IMAGE_PLUGIN = 'wix-draft-plugin-image';
const DIVIDER_PLUGIN = 'wix-draft-plugin-divider';

const DividerTypes = {
  SINGLE: 'single',
  DOUBLE: 'double',
  DASHED: 'dashed',
  DOTTED: 'dotted',
};
class ContentStateBuilder {
  static Alignments = {
    CENTER: 'center',
    LEFT: 'left',
    RIGHT: 'right',
  };

  static Sizes = {
    ORIGINAL: 'original',
    INLINE: 'inline',
    SMALL: 'small',
    BEST_FIT: 'content',
    FULL_WIDTH: 'fullWidth',
  };

  static DividerTypes = DividerTypes;

  constructor() {
    this.blocks = [];
  }

  getContent() {
    return this.convertToDraft(this.blocks);
  }

  createBlocks(text) {
    return {
      text,
      type: BlockType.PARAGRAPH,
    };
  }

  createImageBlock(src, config = {}, metadata) {
    const { filename, height, width } = src;
    const {
      alignment = ContentStateBuilder.Alignments.CENTER,
      size = ContentStateBuilder.Sizes.BEST_FIT,
      showDescription = true,
      showTitle = true,
    } = config;

    return {
      type: BlockType.ATOMIC,
      entityData: {
        type: IMAGE_PLUGIN,
        mutability: 'IMMUTABLE',
        data: {
          config: {
            alignment,
            size,
            showDescription,
            showTitle,
          },
          src: {
            file_name: filename, //eslint-disable-line
            original_file_name: filename, //eslint-disable-line
            id: filename.split('.')[0],
            height,
            width,
          },
        },
      },
    };
  }

  static createDividerBlock(type = DividerTypes.SINGLE) {
    return {
      type: BlockType.ATOMIC,
      entityData: {
        type: DIVIDER_PLUGIN,
        mutability: 'IMMUTABLE',
        data: {
          type,
          config: {
            size: 'large',
            alignment: 'center',
            textWrap: 'nowrap',
          },
        },
      },
    };
  }
  appendBlock(block) {
    this.blocks.push(block);
    return this;
  }

  addText(text) {
    this.appendBlock(this.createBlocks(text));
    return this;
  }

  addImage(src, config, metadata) {
    this.appendBlock(this.createImageBlock(src, config, metadata));
    return this;
  }

  /*
    Privates
  */
  convertToDraft() {
    const contentState = { blocks: [], entityMap: {} };
    let entityIdx = 0;
    this.blocks.forEach(block => {
      const { entityData, type, entityRanges = [], ...blockData } = block;
      const parsedEntityRanges =
        type === BlockType.ATOMIC
          ? [
              {
                offset: 0,
                length: 1,
                key: entityIdx,
              },
            ]
          : entityRanges;

      contentState.blocks.push({
        key: generateRandomKey(),
        type,
        inlineStyleRanges: [],
        depth: 0,
        text: ' ',
        entityRanges: parsedEntityRanges,
        data: {},
        ...blockData,
      });

      if (entityData) {
        contentState.entityMap[String(entityIdx++)] = entityData;
      }
    });

    return contentState;
  }
}

export default ContentStateBuilder;

/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import { isEmpty, inRange } from 'lodash';
import {
  RicosContent as RicosContentDraft,
  RicosContentBlock,
  RicosEntityRange,
  RicosInlineStyleRange,
} from '..';
import {
  BlockTypesMap,
  FromDraftListType,
  HeaderLevel,
  EntityTypeDataMap,
  PluginTypeMap,
} from './consts';
import { RicosContent, Decoration, Node, google } from 'ricos-schema';
import { genKey } from 'draft-js';
import {
  ANCHOR_TYPE,
  VIDEO_TYPE,
  VIDEO_TYPE_LEGACY,
  DIVIDER_TYPE,
  IMAGE_TYPE,
  IMAGE_TYPE_LEGACY,
  VERTICAL_EMBED_TYPE,
  POLL_TYPE,
} from '../consts';
import toConstantCase from 'to-constant-case';

type Range = RicosInlineStyleRange | RicosEntityRange;
type RangeData = Pick<RicosInlineStyleRange, 'style'> | Pick<RicosEntityRange, 'key'>;

const createTimestamp = (): google.protobuf.Timestamp => {
  const timeMS = Date.now();
  return {
    seconds: Math.floor(timeMS / 1000),
    nanos: (timeMS % 1000) * 1e6,
  };
};

export const fromDraft = (draftJSON: RicosContentDraft): RicosContent => {
  const { blocks, entityMap, VERSION: version } = draftJSON;
  const nodes: Node[] = [];
  const keyMapping = {};

  const parseBlocks = (index = 0) => {
    const block = blocks[index];
    if (block) {
      switch (block.type) {
        case BlockTypesMap.Atomic:
          nodes.push(parseAtomicBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockTypesMap.Blockquote:
          nodes.push(parseBlockQuoteBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockTypesMap.CodeBlock:
          nodes.push(parseCodeBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockTypesMap.HeaderOne:
        case BlockTypesMap.HeaderTwo:
        case BlockTypesMap.HeaderThree:
        case BlockTypesMap.HeaderFour:
        case BlockTypesMap.HeaderFive:
        case BlockTypesMap.HeaderSix:
          nodes.push(parseHeaderBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockTypesMap.OrderedListItem:
        case BlockTypesMap.UnorderedListItem:
          const { node, nextIndex } = parseListBlocks(index);
          nodes.push(node);
          parseBlocks(nextIndex);
          break;
        case BlockTypesMap.Unstyled:
          nodes.push(parseTextBlock(block));
          parseBlocks(index + 1);
          break;
        default:
          console.log(`ERROR! Unknown block type "${block.type}"!`);
          process.exit(1);
      }
    }
  };

  const parseAtomicBlock = (block: RicosContentBlock): Node => {
    return { key: block.key, nodes: [], ...getEntity(block.entityRanges[0].key) };
  };

  const parseBlockQuoteBlock = (block: RicosContentBlock): Node => ({
    key: block.key,
    type: 'blockquote',
    nodes: [parseTextBlock(block)],
  });

  const parseCodeBlock = (block: RicosContentBlock): Node => ({
    key: block.key,
    type: 'codeblock',
    nodes: getTextNodes(block),
  });

  const parseHeaderBlock = (block: RicosContentBlock): Node => {
    const getLevel = (blockType: string) => {
      switch (blockType) {
        case BlockTypesMap.HeaderOne:
          return HeaderLevel[BlockTypesMap.HeaderOne];
        case BlockTypesMap.HeaderTwo:
          return HeaderLevel[BlockTypesMap.HeaderTwo];
        case BlockTypesMap.HeaderThree:
          return HeaderLevel[BlockTypesMap.HeaderThree];
        case BlockTypesMap.HeaderFour:
          return HeaderLevel[BlockTypesMap.HeaderFour];
        case BlockTypesMap.HeaderFive:
          return HeaderLevel[BlockTypesMap.HeaderFive];
        case BlockTypesMap.HeaderSix:
          return HeaderLevel[BlockTypesMap.HeaderSix];
        default:
          console.log(`ERROR! Unknown header level "${blockType}"!`);
          process.exit(1);
      }
    };
    return {
      key: block.key,
      type: 'heading',
      ricosHeading: {
        level: getLevel(block.type),
      },
      nodes: getTextNodes(block),
    };
  };

  const parseTextBlock = (block: RicosContentBlock): Node => {
    const textWrapperNode: Node = {
      key: genKey(),
      type: 'paragraph',
      nodes: [],
    };

    keyMapping[block.key] = textWrapperNode.key;

    const nodes = getTextNodes(block);
    if (!isEmpty(nodes)) {
      textWrapperNode.nodes = nodes;
    }

    return textWrapperNode;
  };

  const parseListBlocks = (listStartIndex: number): { node: Node; nextIndex: number } => {
    const listType = blocks[listStartIndex].type;
    const listBlocks: RicosContentBlock[] = [];
    let searchIndex = listStartIndex;

    while (searchIndex >= 0) {
      const nextBlock = blocks[searchIndex];
      if (nextBlock.type === listType) {
        listBlocks.push(nextBlock);
        searchIndex++;
      } else {
        searchIndex = -1;
      }
    }

    return {
      node: {
        key: genKey(),
        type: FromDraftListType[listType],
        nodes: listBlocks.map(block => ({
          key: block.key,
          type: 'list_item',
          nodes: [parseTextBlock(block)],
        })),
      },
      nextIndex: listStartIndex + listBlocks.length,
    };
  };

  const getTextNodes = (block: RicosContentBlock): Node[] => {
    const { text, inlineStyleRanges, entityRanges, data: blockData } = block;
    const ranges: Range[] = [...inlineStyleRanges, ...entityRanges].sort(
      (a, b) => b.offset - a.offset
    );
    const getRange = () => ranges.pop();
    let textNode: Node | null = null;
    const textNodes: Node[] = [];
    let currentPos = 0;
    let currentRange: Range | undefined = getRange();
    while (currentPos < text.length) {
      if (currentRange && posIsInRange(currentPos, currentRange)) {
        const { length, ...rangeData } = currentRange;
        if (textNode) {
          textNode.ricosText?.decorations?.push(getDecoration(rangeData));
        } else {
          textNode = createTextNode({
            text: text.substr(currentPos, length),
            blockData,
            rangeData,
          });
        }
        currentRange = getRange();
        if (!posIsInRange(currentPos, currentRange)) {
          textNodes.push(textNode);
          currentPos += length || 0;
          textNode = null;
        }
      } else {
        const end = currentRange?.offset || text.length;
        textNodes.push(
          createTextNode({
            text: text.substring(currentPos, end),
            blockData,
          })
        );
        currentPos = end;
      }
    }
    return textNodes;
  };

  const createTextNode = ({
    text,
    blockData,
    rangeData,
  }: {
    text: string;
    blockData: RicosContentBlock['data'];
    rangeData?: RangeData;
  }): Node => {
    const textNode: Node = {
      key: genKey(),
      type: 'text',
      nodes: [],
      ricosText: {
        text,
        decorations: [],
      },
    };

    const decorations: Decoration[] = [];
    if (blockData && !isEmpty(blockData)) {
      if (blockData.textAlignment) {
        decorations.push({
          type: 'ricos-alignment',
          ricosAlignment: { direction: blockData.textAlignment },
        });
      }
    }
    if (rangeData && !isEmpty(rangeData)) {
      decorations.push(getDecoration(rangeData));
    }
    if (!isEmpty(decorations) && textNode.ricosText) {
      textNode.ricosText.decorations = decorations;
    }

    return textNode;
  };

  const posIsInRange = (pos: number, range?: Range): boolean =>
    !!range && inRange(pos, range.offset, range.offset + range.length);

  const getEntity = (key: string | number) => {
    const { type, data } = entityMap[key];
    const dataFieldName = EntityTypeDataMap[type];
    if (!dataFieldName) {
      console.log(`ERROR! Unknown entity type "${type}"!`);
      process.exit(1);
    }

    switch (type) {
      case ANCHOR_TYPE:
        // Remap anchor key for text blocks
        if (keyMapping[data.anchor]) {
          data.anchor = keyMapping[data.anchor];
        }
        break;
      case VIDEO_TYPE:
      case VIDEO_TYPE_LEGACY:
        migrateVideoData(data);
        break;
      case DIVIDER_TYPE:
        migrateDividerData(data);
        break;
      case IMAGE_TYPE:
      case IMAGE_TYPE_LEGACY:
        migrateImageData(data);
        break;
      case POLL_TYPE:
        migratePollData(data);
        break;
      case VERTICAL_EMBED_TYPE:
        migrateVerticalEmbedData(data);
        break;
      default:
    }

    return { type: PluginTypeMap[type], [dataFieldName]: data };
  };

  const getDecoration = (rangeData: RangeData): Decoration => {
    if ('key' in rangeData) {
      // rangeData is an entity range
      return getEntity(rangeData.key);
    } else if ('style' in rangeData) {
      // rangeData is an inline style range
      let decoration: Decoration;
      try {
        const styleObj = JSON.parse(rangeData.style);
        const type = Object.keys(styleObj)[0];
        const value = Object.values<string>(styleObj)[0];
        decoration = { type };
        if (type === 'FG') {
          decoration.ricosColor = { foreground: value };
        }
        if (type === 'BG') {
          decoration.ricosColor = { background: value };
        }
      } catch {
        decoration = {
          type: rangeData.style.toLowerCase(),
        };
      }
      return decoration;
    } else {
      return rangeData;
    }
  };

  parseBlocks();

  const ricosContentMessage = RicosContent.fromObject({
    doc: {
      nodes,
      lastEdited: createTimestamp(),
    },
    selection: {
      anchorNode: nodes[0].key,
    },
    version: version || '',
  });

  const err = RicosContent.verify(ricosContentMessage);
  if (err) {
    console.log('ERROR! Invalid content');
    console.log(err);
    process.exit(1);
  }

  const ricosContent = RicosContent.toObject(ricosContentMessage, {
    arrays: true,
    enums: String,
    longs: Number,
  });

  return ricosContent;
};

const migrateVideoData = data => {
  // src is split into src for objects and url for strings
  if (typeof data.src === 'string') {
    data.url = data.src;
    delete data.src;
  } else {
    data.config.size = toConstantCase(data.config.size);
    data.config.alignment = toConstantCase(data.config.alignment);
  }
};

const migrateDividerData = data => {
  data.type = toConstantCase(data.type);
  data.config.size = toConstantCase(data.config.size);
  data.config.alignment = toConstantCase(data.config.alignment);
};

const migrateImageData = data => {
  data.config.size = toConstantCase(data.config.size);
  data.config.alignment = toConstantCase(data.config.alignment);
};

const migratePollData = data => {
  data.config.size = toConstantCase(data.config.size);
  data.config.alignment = toConstantCase(data.config.alignment);
  data.layout.poll.type = toConstantCase(data.layout.poll.type);
  data.layout.poll.direction = toConstantCase(data.layout.poll.direction);
  data.design.backgroundType = toConstantCase(data.design.backgroundType);
};

const migrateVerticalEmbedData = data => {
  data.type = toConstantCase(data.type);
};

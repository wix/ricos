/* eslint-disable no-console, fp/no-loops, no-case-declarations */

import { isEmpty } from 'lodash';
import { RicosContent as RicosContentDraft, RicosContentBlock } from '..';
import { BlockType, FROM_DRAFT_LIST_TYPE, HeaderLevel, NodeType } from './consts';
import { RicosContent, RicosNode, google } from 'ricos-schema';
import { genKey } from './generateRandomKey';

import { getTextNodes } from './getTextNodes';
import { getEntity, parseBlockData } from './getEntity';

const createTimestamp = (): google.protobuf.Timestamp => {
  const timeMS = Date.now();
  return {
    seconds: Math.floor(timeMS / 1000),
    nanos: (timeMS % 1000) * 1e6,
  };
};

export const fromDraft = (draftJSON: RicosContentDraft): RicosContent => {
  const { blocks, entityMap, VERSION: version } = draftJSON;
  const nodes: RicosNode[] = [];
  const keyMapping = {};

  const parseBlocks = (index = 0) => {
    const block = blocks[index];
    if (block) {
      switch (block.type) {
        case BlockType.Atomic:
          nodes.push(parseAtomicBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.Blockquote:
          nodes.push(parseQuoteBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.CodeBlock:
          nodes.push(parseCodeBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.HeaderOne:
        case BlockType.HeaderTwo:
        case BlockType.HeaderThree:
        case BlockType.HeaderFour:
        case BlockType.HeaderFive:
        case BlockType.HeaderSix:
          nodes.push(parseHeadingBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.OrderedListItem:
        case BlockType.UnorderedListItem:
          const { node, nextIndex } = parseListBlocks(index);
          nodes.push(node);
          parseBlocks(nextIndex);
          break;
        case BlockType.Unstyled:
          nodes.push(parseTextBlock(block));
          parseBlocks(index + 1);
          break;
        default:
          console.log(`ERROR! Unknown block type "${block.type}"!`);
          process.exit(1);
      }
    }
  };

  const parseAtomicBlock = (block: RicosContentBlock): RicosNode => {
    return {
      key: block.key,
      nodes: [],
      ...getEntity(block.entityRanges[0].key, entityMap, keyMapping),
    };
  };

  const parseQuoteBlock = (block: RicosContentBlock): RicosNode => ({
    key: block.key,
    type: NodeType.Blockquote,
    nodes: [parseTextBlock(block)],
  });

  const parseCodeBlock = (block: RicosContentBlock): RicosNode => ({
    key: block.key,
    type: NodeType.CodeBlock,
    nodes: getTextNodes(block, entityMap, keyMapping),
    ricosCode: {
      ...parseBlockData(block.data),
    },
  });

  const parseHeadingBlock = (block: RicosContentBlock): RicosNode => {
    const getLevel = (blockType: string) => {
      if (Object.keys(HeaderLevel).includes(blockType)) {
        return HeaderLevel[blockType];
      }
      console.log(`ERROR! Unknown header level "${blockType}"!`);
      process.exit(1);
    };
    return {
      key: block.key,
      type: NodeType.Heading,
      ricosHeading: {
        level: getLevel(block.type),
        ...parseBlockData(block.data),
      },
      nodes: getTextNodes(block, entityMap, keyMapping),
    };
  };

  const parseTextBlock = (block: RicosContentBlock): RicosNode => {
    const textWrapperNode: RicosNode = {
      key: block.type === BlockType.Unstyled ? block.key : genKey(),
      type: NodeType.Paragraph,
      ricosParagraph: {
        ...parseBlockData(block.data),
      },
      nodes: [],
    };

    keyMapping[block.key] = textWrapperNode.key;
    const nodes = getTextNodes(block, entityMap, keyMapping);

    if (!isEmpty(nodes)) {
      textWrapperNode.nodes = nodes;
    }

    return textWrapperNode;
  };

  const parseListBlocks = (listStartIndex: number): { node: RicosNode; nextIndex: number } => {
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
        type: FROM_DRAFT_LIST_TYPE[listType],
        nodes: listBlocks.map(block => ({
          key: block.key,
          type: NodeType.ListItem,
          nodes: [parseTextBlock(block)],
        })),
      },
      nextIndex: listStartIndex + listBlocks.length,
    };
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

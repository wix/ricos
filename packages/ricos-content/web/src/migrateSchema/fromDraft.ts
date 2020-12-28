/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import { isEmpty } from 'lodash';
import { RicosContent, RicosContentBlock, RicosEntityRange, RicosInlineStyleRange } from '..';
import { BLOCK_TYPES_MAP, FROM_DRAFT_LIST_TYPES as LIST_TYPES, HEADER_LEVELS } from './consts';
import { getTextNodes } from './getTextNode';
import { getEntity } from './getEntity';
import { Node } from './types';

export const fromDraft = (draftJSON: RicosContent) => {
  const { blocks, entityMap, VERSION: version } = draftJSON;
  const nodes: Node[] = [];

  const parseBlocks = (index = 0) => {
    const block = blocks[index];
    if (block) {
      switch (block.type) {
        case BLOCK_TYPES_MAP.atomic:
          nodes.push(parseAtomicBlock(block));
          parseBlocks(index + 1);
          break;
        case BLOCK_TYPES_MAP.blockquote:
          nodes.push(parseBlockQuoteBlock(block));
          parseBlocks(index + 1);
          break;
        case BLOCK_TYPES_MAP.codeBlock:
          nodes.push(parseCodeBlock(block));
          parseBlocks(index + 1);
          break;
        case BLOCK_TYPES_MAP.headerOne:
        case BLOCK_TYPES_MAP.headerTwo:
        case BLOCK_TYPES_MAP.headerThree:
        case BLOCK_TYPES_MAP.headerFour:
        case BLOCK_TYPES_MAP.headerFive:
        case BLOCK_TYPES_MAP.headerSix:
          nodes.push(parseHeaderBlock(block));
          parseBlocks(index + 1);
          break;
        case BLOCK_TYPES_MAP.orderedListItem:
        case BLOCK_TYPES_MAP.unorderedListItem:
          const { node, nextIndex } = parseListBlocks(index);
          nodes.push(node);
          parseBlocks(nextIndex);
          break;
        case BLOCK_TYPES_MAP.unstyled:
          nodes.push(parseTextBlock(block));
          parseBlocks(index + 1);
          break;
        default:
          console.log(`ERROR! Unkown block type "${block.type}"!`);
          process.exit(1);
      }
    }
  };

  const parseAtomicBlock = (block: RicosContentBlock): Node =>
    getEntity(block.entityRanges[0].key, entityMap);

  const parseBlockQuoteBlock = (block: RicosContentBlock): Node => ({
    type: 'blockquote',
    nodes: [parseTextBlock(block)],
  });

  const parseCodeBlock = (block: RicosContentBlock): Node => ({
    type: 'codeblock',
    nodes: getTextNodes(block, entityMap),
  });

  const parseHeaderBlock = (block: RicosContentBlock): Node => {
    const getLevel = blockType => {
      switch (blockType) {
        case BLOCK_TYPES_MAP.headerOne:
          return HEADER_LEVELS[BLOCK_TYPES_MAP.headerOne];
        case BLOCK_TYPES_MAP.headerTwo:
          return HEADER_LEVELS[BLOCK_TYPES_MAP.headerTwo];
        case BLOCK_TYPES_MAP.headerThree:
          return HEADER_LEVELS[BLOCK_TYPES_MAP.headerThree];
        case BLOCK_TYPES_MAP.headerFour:
          return HEADER_LEVELS[BLOCK_TYPES_MAP.headerFour];
        case BLOCK_TYPES_MAP.headerFive:
          return HEADER_LEVELS[BLOCK_TYPES_MAP.headerFive];
        case BLOCK_TYPES_MAP.headerSix:
          return HEADER_LEVELS[BLOCK_TYPES_MAP.headerSix];
        default:
          console.log(`ERROR! Unkown header level "${blockType}"!`);
          process.exit(1);
      }
    };
    return {
      type: 'heading',
      data: {
        level: getLevel(block.type),
      },
      nodes: getTextNodes(block, entityMap),
    };
  };

  const parseTextBlock = (block: RicosContentBlock): Node => {
    const textWrapperNode: Node = {
      type: 'paragraph',
    };

    const nodes = getTextNodes(block, entityMap);
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
        type: LIST_TYPES[listType],
        nodes: listBlocks.map(block => ({
          type: 'list_item',
          nodes: [parseTextBlock(block)],
        })),
      },
      nextIndex: listStartIndex + listBlocks.length,
    };
  };

  parseBlocks();

  return {
    doc: {
      nodes,
    },
    version,
  };
};

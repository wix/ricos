/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import { isEmpty, inRange } from 'lodash';
import { BLOCK_TYPES_MAP, FROM_DRAFT_LIST_TYPES as LIST_TYPES, HEADER_LEVELS } from './consts';

export const fromDraft = draftJSON => {
  const { blocks, entityMap, VERSION: version } = draftJSON;
  const nodes = [];

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

  const parseAtomicBlock = block => getEntity(block.entityRanges[0].key);

  const parseBlockQuoteBlock = block => ({
    type: 'blockquote',
    nodes: parseTextBlock(block),
  });

  const parseCodeBlock = block => ({
    type: 'codeblock',
    nodes: getTextNodes(block),
  });

  const parseHeaderBlock = block => {
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
      nodes: getTextNodes(block),
    };
  };

  const parseTextBlock = block => {
    const textWrapperNode = {
      type: 'paragraph',
    };

    const nodes = getTextNodes(block);
    if (!isEmpty(nodes)) {
      textWrapperNode.nodes = nodes;
    }

    return textWrapperNode;
  };

  const parseListBlocks = listStartIndex => {
    const listType = blocks[listStartIndex].type;
    const listBlocks = [];
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

  const getTextNodes = block => {
    const { text, inlineStyleRanges, entityRanges, data: blockData } = block;
    const ranges = [...inlineStyleRanges, ...entityRanges].sort((a, b) => b.offset - a.offset);
    const getRange = () => ranges.pop() || {};
    let textNode;
    const textNodes = [];
    let currentPos = 0;
    let currentRange = getRange();
    while (currentPos < text.length) {
      const { offset, length, ...rangeData } = currentRange;
      if (posIsInRange(currentPos, currentRange)) {
        if (textNode) {
          textNode.data.decorations.push(getDecoration(rangeData));
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
          currentPos += length;
          textNode = null;
        }
      } else {
        const end = offset || text.length;
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

  const createTextNode = ({ text, blockData, rangeData }) => {
    const textNode = {
      type: 'text',
      data: {
        text,
      },
    };

    const decorations = [];
    if (!isEmpty(blockData)) {
      decorations.push(blockData);
    }
    if (!isEmpty(rangeData)) {
      decorations.push(getDecoration(rangeData));
    }
    if (!isEmpty(decorations)) {
      textNode.data.decorations = decorations;
    }

    return textNode;
  };

  const posIsInRange = (pos, range) =>
    range && inRange(pos, range.offset, range.offset + range.length);

  const getEntity = key => {
    const { type, data } = entityMap[key];
    return { type, data };
  };

  const getDecoration = rangeData => {
    if ('key' in rangeData) {
      return getEntity(rangeData.key);
    } else if ('style' in rangeData) {
      let decoration;
      try {
        const styleObj = JSON.parse(rangeData.style);
        decoration = {
          type: Object.keys(styleObj)[0],
          data: {
            value: Object.values(styleObj)[0],
          },
        };
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

  return {
    doc: {
      nodes,
    },
    version,
  };
};

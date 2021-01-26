/* eslint-disable no-console, fp/no-loops, no-case-declarations */

import { cloneDeep, isEmpty } from 'lodash';
import { RicosContent, RicosContentBlock } from '../..';
import { BlockType, FROM_DRAFT_LIST_TYPE, HeaderLevel } from '../consts';
import { rich_content } from 'ricos-schema';
import { genKey } from '../generateRandomKey';
import { getTextNodes } from './getTextNodes';
import { getEntity, parseBlockData } from './getRicosEntityData';

const createTimestamp = (): rich_content.RichContent['lastEdited'] => {
  const timeMS = Date.now();
  return {
    seconds: Math.floor(timeMS / 1000),
    nanos: (timeMS % 1000) * 1e6,
  };
};

export const ensureRicosContent = (content: rich_content.RichContent | RicosContent) =>
  'blocks' in content ? fromDraft(content) : content;

export const fromDraft = (draftJSON: RicosContent): rich_content.RichContent => {
  const { blocks, entityMap, VERSION: version } = cloneDeep(draftJSON);
  const nodes: rich_content.Node[] = [];

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

  const parseAtomicBlock = (block: RicosContentBlock): rich_content.Node => {
    return {
      key: block.key,
      nodes: [],
      ...getEntity(block.entityRanges[0].key, entityMap),
    };
  };

  const parseQuoteBlock = (block: RicosContentBlock): rich_content.Node => ({
    key: block.key,
    type: rich_content.Node.Type.BLOCKQUOTE,
    nodes: [parseTextBlock(block)],
  });

  const parseCodeBlock = (block: RicosContentBlock): rich_content.Node => ({
    key: block.key,
    type: rich_content.Node.Type.CODEBLOCK,
    nodes: getTextNodes(block, entityMap),
    codeData: {
      ...parseBlockData(block.data),
    },
  });

  const parseHeadingBlock = (block: RicosContentBlock): rich_content.Node => {
    const getLevel = (blockType: string) => {
      if (Object.keys(HeaderLevel).includes(blockType)) {
        return HeaderLevel[blockType];
      }
      console.log(`ERROR! Unknown header level "${blockType}"!`);
      process.exit(1);
    };
    return {
      key: block.key,
      type: rich_content.Node.Type.HEADING,
      headingData: {
        level: getLevel(block.type),
        depth: block.depth || undefined,
        ...parseBlockData(block.data),
      },
      nodes: getTextNodes(block, entityMap),
    };
  };

  const parseTextBlock = (block: RicosContentBlock): rich_content.Node => {
    const textWrapperNode: rich_content.Node = {
      key: genKey(),
      type: rich_content.Node.Type.PARAGRAPH,
      paragraphData: {
        ...parseBlockData(block.data),
      },
      nodes: [],
    };

    switch (block.type) {
      case BlockType.Unstyled:
        textWrapperNode.key = block.key;
      // falls through
      case BlockType.Blockquote:
      case BlockType.OrderedListItem:
      case BlockType.UnorderedListItem:
        textWrapperNode.paragraphData = {
          ...textWrapperNode.paragraphData,
          depth: block.depth,
        };
        break;
      default:
    }

    const nodes = getTextNodes(block, entityMap);

    if (!isEmpty(nodes)) {
      textWrapperNode.nodes = nodes;
    }

    return textWrapperNode;
  };

  const createListItem = (block: RicosContentBlock): rich_content.Node => ({
    key: block.key,
    type: rich_content.Node.Type.LIST_ITEM,
    nodes: [parseTextBlock(block)],
  });

  const isListBlock = (block: RicosContentBlock): boolean =>
    FROM_DRAFT_LIST_TYPE[block.type] !== undefined;

  const parseListBlocks = (
    listStartIndex: number
  ): { node: rich_content.Node; nextIndex: number } => {
    const { type: listType, depth } = blocks[listStartIndex];
    const listNodes: rich_content.Node[] = [];
    let searchIndex = listStartIndex;
    let nextBlock = blocks[searchIndex];

    while (isListBlock(nextBlock) && nextBlock.depth >= depth) {
      if (nextBlock.depth > depth || nextBlock.type !== listType) {
        const { node, nextIndex } = parseListBlocks(searchIndex);
        listNodes[listNodes.length - 1].nodes.push(node);
        searchIndex = nextIndex;
      } else {
        listNodes.push(createListItem(nextBlock));
        searchIndex++;
      }
      nextBlock = blocks[searchIndex];
    }

    return {
      node: {
        key: genKey(),
        type: FROM_DRAFT_LIST_TYPE[listType],
        nodes: listNodes,
      },
      nextIndex: searchIndex,
    };
  };

  parseBlocks();

  const ricosContentMessage = rich_content.RichContent.fromObject({
    nodes,
    lastEdited: createTimestamp(),
    updatedVersion: version || '',
    createdVersion: version || '',
  });

  const err = rich_content.RichContent.verify(ricosContentMessage);
  if (err) {
    console.log('ERROR! Invalid content');
    console.log(err);
    process.exit(1);
  }

  const ricosContent = rich_content.RichContent.toObject(ricosContentMessage, {
    arrays: true,
    enums: String,
    longs: Number,
  });

  return ricosContent;
};

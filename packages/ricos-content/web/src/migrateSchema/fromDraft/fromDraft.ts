/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import { cloneDeep, isEmpty } from 'lodash';
import { RicosContent, RicosContentBlock } from '../..';
import { BlockType, FROM_DRAFT_LIST_TYPE, HeaderLevel } from '../consts';
import { RichContent, Node, Node_Type, Timestamp } from 'ricos-schema';
import { genKey } from '../generateRandomKey';
import { getTextNodes } from './getTextNodes';
import { getEntity, parseBlockData } from './getRicosEntityData';

const createTimestamp = (): Timestamp => {
  const timeMS = Date.now();
  return {
    seconds: Math.floor(timeMS / 1000),
    nanos: (timeMS % 1000) * 1e6,
  };
};

export const ensureRicosContent = (content: RichContent | RicosContent) =>
  'blocks' in content ? fromDraft(content) : content;

export const fromDraft = (draftJSON: RicosContent): RichContent => {
  const { blocks, entityMap, VERSION: version } = cloneDeep(draftJSON);
  const nodes: Node[] = [];

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

  const parseAtomicBlock = (block: RicosContentBlock): Node => {
    return {
      key: block.key,
      nodes: [],
      ...getEntity(block.entityRanges[0].key, entityMap),
    };
  };

  const parseQuoteBlock = (block: RicosContentBlock): Node => ({
    key: block.key,
    type: Node_Type.BLOCKQUOTE,
    nodes: [parseTextBlock(block)],
  });

  const parseCodeBlock = (block: RicosContentBlock): Node => ({
    key: block.key,
    type: Node_Type.CODEBLOCK,
    nodes: getTextNodes(block, entityMap),
    codeData: {
      ...parseBlockData(block.data),
    },
  });

  const parseHeadingBlock = (block: RicosContentBlock): Node => {
    const getLevel = (blockType: string) => {
      if (Object.keys(HeaderLevel).includes(blockType)) {
        return HeaderLevel[blockType];
      }
      console.log(`ERROR! Unknown header level "${blockType}"!`);
      process.exit(1);
    };
    return {
      key: block.key,
      type: Node_Type.HEADING,
      headingData: {
        level: getLevel(block.type),
        depth: block.depth || undefined,
        ...parseBlockData(block.data),
      },
      nodes: getTextNodes(block, entityMap),
    };
  };

  const parseTextBlock = (block: RicosContentBlock): Node => {
    const textWrapperNode: Node = {
      key: genKey(),
      type: Node_Type.PARAGRAPH,
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

  const createListItem = (block: RicosContentBlock): Node => ({
    key: block.key,
    type: Node_Type.LIST_ITEM,
    nodes: [parseTextBlock(block)],
  });

  const isListBlock = (block: RicosContentBlock): boolean =>
    FROM_DRAFT_LIST_TYPE[block.type] !== undefined;

  const parseListBlocks = (listStartIndex: number): { node: Node; nextIndex: number } => {
    const { type: listType, depth } = blocks[listStartIndex];
    const listNodes: Node[] = [];
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

  const ricosContent = RichContent.toJSON(
    RichContent.fromJSON({
      nodes,
      metadata: {
        lastEdited: createTimestamp(),
        updatedVersion: version,
        createdVersion: version,
      },
    })
  );

  // Should consider creating a new type for RichContent with string enums
  return ricosContent as RichContent;
};

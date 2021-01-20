/* eslint-disable no-console */
import { RicosContent, RicosNode } from 'ricos-schema';
import { RicosContent as RicosContentDraft, RicosContentBlock } from '../..';
import { genKey } from '../generateRandomKey';
import { NodeType, BlockType, HeaderLevel, TO_DRAFT_LIST_TYPE } from '../consts';
import { DraftBlockType } from 'draft-js';
import { merge } from 'lodash';
import { createTextBlockData, createAtomicEntityData } from './getDraftEntityData';
import {
  getParagraphNode,
  mergeTextNodes,
  parseDecorations,
  parseInlineStyleDecorations,
  parseEntityDecorations,
} from './decorationParsers';

export const toDraft = (ricosContent: RicosContent): RicosContentDraft => {
  const {
    doc: { nodes },
    version,
  } = ricosContent;
  const draftContent: RicosContentDraft = {
    blocks: [],
    entityMap: {},
  };
  let latestEntityKey = -1;

  const parseNodes = (index = 0) => {
    const node = nodes[index];
    if (node) {
      switch (node.type) {
        case NodeType.Blockquote:
          parseTextNodes(getParagraphNode(node), { type: BlockType.Blockquote, key: node.key });
          break;
        case NodeType.CodeBlock:
          parseTextNodes(node, { type: BlockType.CodeBlock, key: node.key });
          break;
        case NodeType.Heading:
          if (!node.ricosHeading) {
            console.log(`ERROR! Heading node with no data!`);
            process.exit(1);
          }
          parseTextNodes(node, { type: HeaderLevel[node.ricosHeading.level], key: node.key });
          break;
        case NodeType.OrderedList:
        case NodeType.UnorderedList:
          parseListNode(node);
          break;
        case NodeType.Paragraph:
          parseTextNodes(node, { type: BlockType.Unstyled, key: node.key });
          break;
        default:
          if (node.type.includes('ricos')) {
            parseAtomicNode(node);
          } else {
            console.log(`ERROR! Unknown node type "${node.type}"!`);
            process.exit(1);
          }
      }
      parseNodes(index + 1);
    }
  };

  const parseAtomicNode = (node: RicosNode) => {
    latestEntityKey += 1;
    const entityMap = createAtomicEntityData(node, latestEntityKey);
    addBlock({
      key: node.key,
      type: BlockType.Atomic,
      text: ' ',
      entityRanges: [{ offset: 0, length: 1, key: latestEntityKey }],
    });
    draftContent.entityMap = { ...draftContent.entityMap, ...entityMap };
  };

  const parseListNode = (node: RicosNode) => {
    node.nodes.forEach(listItem => {
      const [paragraph, childNode] = listItem.nodes;
      parseTextNodes(paragraph, {
        type: TO_DRAFT_LIST_TYPE[node.type],
        key: listItem.key,
      });
      if (childNode) {
        parseListNode(childNode);
      }
    });
  };

  const parseTextNodes = (
    node: RicosNode,
    { type, key }: { type: DraftBlockType; key: string }
  ) => {
    const { text, decorationMap } = mergeTextNodes(node.nodes);
    const { inlineStyleDecorations, entityDecorations } = parseDecorations(decorationMap, text);
    const inlineStyleRanges = parseInlineStyleDecorations(inlineStyleDecorations);
    const { entityRanges, entityMap, latestEntityKey: newLatestEntityKey } = parseEntityDecorations(
      entityDecorations,
      latestEntityKey
    );
    latestEntityKey = newLatestEntityKey;
    const { depth, ...data } = createTextBlockData(node, type);
    addBlock({
      key,
      type,
      text,
      depth,
      inlineStyleRanges,
      entityRanges,
      data,
    });
    draftContent.entityMap = { ...draftContent.entityMap, ...entityMap };
  };

  const addBlock = (blockProps?: Partial<RicosContentBlock>) => {
    const newBlock: RicosContentBlock = merge(
      {
        key: genKey(),
        type: BlockType.Unstyled,
        text: '',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      blockProps
    );
    draftContent.blocks = [...draftContent.blocks, newBlock];
  };

  parseNodes();

  draftContent.VERSION = version;
  return draftContent;
};

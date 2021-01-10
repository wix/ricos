/* eslint-disable no-console */
import { RicosContent, RicosNode, RicosDecoration } from 'ricos-schema';
import {
  RicosContent as RicosContentDraft,
  RicosContentBlock,
  RicosEntityMap,
  RicosEntityRange,
  RicosInlineStyleRange,
} from '../..';
import { genKey } from '../generateRandomKey';
import {
  NodeType,
  BlockType,
  HeaderLevel,
  FROM_RICOS_DECORATION_TYPE,
  ENTITY_DECORATION_TO_DATA_FIELD,
} from '../consts';
import { emojiRegex } from '../emojiRegex';
import { DraftBlockType } from 'draft-js';
import { merge } from 'lodash';
import {
  createTextBlockData,
  createDecorationEntityData,
  createAtomicEntityData,
} from './getDraftEntityData';

interface DecorationDescriptor extends RicosDecoration {
  start: number;
  end: number;
  ricosEmoji?: { emojiUnicode: string };
}

const pipe = (arg, ...fns: ((arg) => unknown)[]) => {
  return fns.reduce((v, fn) => fn(v), arg);
};

const convertDecorationTypes = (decorations: RicosDecoration[]): RicosDecoration[] =>
  decorations.flatMap(decoration => pipe(decoration, toDraftDecorationType, splitColorDecoration));

const createEmojiDecorations = (text: string) =>
  Array.from(text.matchAll(emojiRegex)).flatMap(({ 0: emojiUnicode, index: start }) => {
    if (start) {
      const decoration: DecorationDescriptor = {
        type: 'EMOJI_TYPE',
        ricosEmoji: { emojiUnicode },
        start,
        end: start + Array.from(emojiUnicode).length,
      };
      return decoration;
    }
    return [];
  });

const toDraftDecorationType = (decoration: RicosDecoration): RicosDecoration => {
  if (FROM_RICOS_DECORATION_TYPE[decoration.type]) {
    decoration.type = FROM_RICOS_DECORATION_TYPE[decoration.type];
  }
  return decoration;
};

const splitColorDecoration = ({
  ricosColor,
  ...decoration
}: RicosDecoration): RicosDecoration | RicosDecoration[] => {
  if (!ricosColor) {
    return decoration;
  }
  const { foreground, background } = ricosColor;
  return [foreground && { FG: foreground }, background && { BG: background }]
    .filter(x => x)
    .map(type => ({ ...decoration, type: JSON.stringify(type) }));
};

export const toDraft = (ricosContent: RicosContent): RicosContentDraft => {
  const {
    doc: { nodes },
    version,
  } = ricosContent;
  const draftContent: RicosContentDraft = {
    blocks: [],
    entityMap: {},
  };

  const parseNodes = (index = 0) => {
    const node = nodes[index];
    if (node) {
      switch (node.type) {
        case NodeType.Blockquote:
          parseTextNodes(getParagraphNode(node), { type: BlockType.Blockquote, key: node.key });
          parseNodes(index + 1);
          break;
        case NodeType.CodeBlock:
          parseTextNodes(node, { type: BlockType.CodeBlock, key: node.key });
          parseNodes(index + 1);
          break;
        case NodeType.Heading:
          if (!node.ricosHeading) {
            console.log(`ERROR! Heading node with no data!`);
            process.exit(1);
          }
          parseTextNodes(node, { type: HeaderLevel[node.ricosHeading.level], key: node.key });
          parseNodes(index + 1);
          break;
        case NodeType.OrderedList:
          node.nodes.forEach(listItem =>
            parseTextNodes(getParagraphNode(listItem), {
              type: BlockType.OrderedListItem,
              key: listItem.key,
            })
          );
          parseNodes(index + 1);
          break;
        case NodeType.UnorderedList:
          node.nodes.forEach(listItem =>
            parseTextNodes(getParagraphNode(listItem), {
              type: BlockType.UnorderedListItem,
              key: listItem.key,
            })
          );
          parseNodes(index + 1);
          break;
        case NodeType.Paragraph:
          parseTextNodes(node, { type: BlockType.Unstyled, key: node.key });
          parseNodes(index + 1);
          break;
        default:
          if (node.type.includes('ricos')) {
            parseAtomicNode(node);
            parseNodes(index + 1);
          } else {
            console.log(`ERROR! Unknown node type "${node.type}"!`);
            process.exit(1);
          }
      }
    }
  };

  const parseAtomicNode = (node: RicosNode) => {
    const { entityKey, entityMap } = createAtomicEntityData(node);
    addBlock({
      key: node.key,
      type: BlockType.Atomic,
      text: ' ',
      entityRanges: [{ offset: 0, length: 1, key: entityKey }],
    });
    draftContent.entityMap = { ...draftContent.entityMap, ...entityMap };
  };

  const getParagraphNode = (node: RicosNode) => {
    if (node.nodes[0].type === 'paragraph') {
      return node.nodes[0];
    } else {
      console.log(`ERROR! Expected a paragraph node but found ${node.nodes[0].type}`);
      process.exit(1);
    }
  };

  const parseTextNodes = (
    node: RicosNode,
    { type, key }: { type: DraftBlockType; key: string }
  ) => {
    const { text, decorations } = mergeTextNodes(node.nodes);
    const { inlineStyleRanges, entityRanges, entityMap } = parseDecorations(decorations);
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

const mergeTextNodes = (
  nodes: RicosNode[]
): { text: string; decorations: DecorationDescriptor[] } => {
  let length = 0;
  const { text, decorationMap } = nodes.reduce<{
    text: string;
    decorationMap: { [type: string]: DecorationDescriptor[] };
  }>(
    ({ text, decorationMap }, currNode) => {
      let accText = text;
      if (currNode.ricosText) {
        const { text: currText, decorations: currDecorations } = currNode.ricosText;
        const textLength = Array.from(currText).length; // required for properly reading emojis
        accText += currText;
        if (currDecorations) {
          convertDecorationTypes(currDecorations).forEach(decoration => {
            if (!decorationMap[decoration.type]) {
              decorationMap[decoration.type] = [];
            }
            decorationMap[decoration.type] = [
              ...decorationMap[decoration.type],
              {
                ...decoration,
                start: length,
                end: length + textLength,
              },
            ];
          });
        }
        length += textLength;
      }
      return { text: accText, decorationMap };
    },
    { text: '', decorationMap: {} }
  );
  const decorations = Object.values(decorationMap)
    .sort((a, b) => a[0].start - b[0].start)
    .reduce((decorations: DecorationDescriptor[], currentDecorations) => {
      if (currentDecorations.length > 0) {
        const firstDecoration = currentDecorations.shift() as DecorationDescriptor;
        const mergedDecorations: DecorationDescriptor[] = [firstDecoration];
        currentDecorations.forEach(decoration => {
          const lastDecoration = mergedDecorations.pop() as DecorationDescriptor;
          if (decoration.start === lastDecoration.end) {
            mergedDecorations.push({ ...lastDecoration, end: decoration.end });
          } else {
            mergedDecorations.push(lastDecoration, decoration);
          }
        });
        return [...decorations, ...mergedDecorations.sort((a, b) => a.start - b.start)];
      }
      return decorations;
    }, []);
  const allDecorations = [...decorations, ...createEmojiDecorations(text)];
  const entityRanges = allDecorations
    .filter(({ type }) => ENTITY_DECORATION_TO_DATA_FIELD[type])
    .sort((a, b) => a.start - b.start);
  const inlineStyleRanges = allDecorations.filter(
    ({ type }) => !ENTITY_DECORATION_TO_DATA_FIELD[type]
  );

  return {
    text,
    decorations: [...entityRanges, ...inlineStyleRanges],
  };
};

const parseDecorations = (
  decorations: DecorationDescriptor[]
): {
  inlineStyleRanges: RicosInlineStyleRange[];
  entityRanges: RicosEntityRange[];
  entityMap: RicosEntityMap;
} => {
  const { inlineStyleRanges, entityRanges, entityMap } = decorations.reduce<{
    inlineStyleRanges: RicosInlineStyleRange[];
    entityRanges: RicosEntityRange[];
    entityMap: RicosEntityMap;
  }>(
    ({ inlineStyleRanges, entityRanges, entityMap }, decoration) => {
      if (ENTITY_DECORATION_TO_DATA_FIELD[decoration.type]) {
        const { entityKey, entityMap: newEntityMap } = createDecorationEntityData(decoration);
        return {
          inlineStyleRanges,
          entityRanges: [
            ...entityRanges,
            {
              key: entityKey,
              offset: decoration.start,
              length: decoration.end - decoration.start,
            },
          ],
          entityMap: { ...entityMap, ...newEntityMap },
        };
      }
      return {
        inlineStyleRanges: [
          ...inlineStyleRanges,
          {
            style: decoration.type,
            offset: decoration.start,
            length: decoration.end - decoration.start,
          },
        ],
        entityRanges,
        entityMap,
      };
    },
    { inlineStyleRanges: [], entityRanges: [], entityMap: {} }
  );
  return {
    inlineStyleRanges,
    entityRanges,
    entityMap,
  };
};

// const sortEntityRangesByOffset = (a: DecorationDescriptor, b: DecorationDescriptor) => {
//   // const aVal = ENTITY_DECORATION_TO_DATA_FIELD[a.type] ? a.start : 0;
//   // const bVal = ENTITY_DECORATION_TO_DATA_FIELD[b.type] ? b.start : 0;
//   return a.start - b.start;
// };

// const sortInlineStyleRangesByType = (a: DecorationDescriptor[], b: DecorationDescriptor[]) => {
//   if (a[0].type < b[0].type) {
//     return -1;
//   }
//   if (a[0].type > b[0].type) {
//     return 1;
//   }
//   return 0;
//   // return a.start - b.start;
// };

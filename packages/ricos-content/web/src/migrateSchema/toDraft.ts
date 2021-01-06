/* eslint-disable no-console */
import { RicosContent, RicosNode, RicosDecoration } from 'ricos-schema';
import { RicosContent as RicosContentDraft, RicosContentBlock } from '..';
import {
  EditorState,
  convertToRaw,
  createBlock,
  ContentBlock,
  genKey,
  ContentState,
  Modifier,
  createSelection,
  SelectionState,
} from 'wix-rich-content-editor-common';
import {
  NodeType,
  BlockType,
  HeaderLevel,
  FROM_RICOS_DECORATION_TYPE,
  ENTITY_DECORATION_TO_MUTABILITY,
  emojiRegex,
} from './consts';
import { DraftBlockType } from 'draft-js';
import { merge } from 'lodash';
import {
  createTextBlockData,
  getDecorationEntityData,
  getNodeEntityData,
} from './getDraftEntityData';

interface DecorationDescriptor extends RicosDecoration {
  start: number;
  end: number;
}

const pipe = (arg, ...fns: ((arg) => unknown)[]) => {
  return fns.reduce((v, fn) => fn(v), arg);
};

const convertDecorationTypes = (decorations: DecorationDescriptor[]): DecorationDescriptor[] =>
  decorations.flatMap(decoration => pipe(decoration, splitColorDecoration, toDraftDecorationType));

const toDraftDecorationType = (decoration: DecorationDescriptor): DecorationDescriptor => {
  if (FROM_RICOS_DECORATION_TYPE[decoration.type]) {
    decoration.type = FROM_RICOS_DECORATION_TYPE[decoration.type];
  }
  return decoration;
};

const splitColorDecoration = ({
  ricosColor,
  ...decoration
}: DecorationDescriptor): DecorationDescriptor | DecorationDescriptor[] => {
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
  let editorState = removeFirstBlock(EditorState.createEmpty());

  const parseNodes = (index = 0) => {
    const node = nodes[index];
    if (node) {
      switch (node.type) {
        case NodeType.Blockquote:
          parseTextNodes(getParagraphNode(node), BlockType.Blockquote);
          parseNodes(index + 1);
          break;
        case NodeType.CodeBlock:
          parseTextNodes(node, BlockType.CodeBlock, node);
          parseNodes(index + 1);
          break;
        case NodeType.Heading:
          if (!node.ricosHeading) {
            console.log(`ERROR! Heading node with no data!`);
            process.exit(1);
          }
          parseTextNodes(node, HeaderLevel[node.ricosHeading.level], node);
          parseNodes(index + 1);
          break;
        case NodeType.OrderedList:
          node.nodes.forEach(listItem =>
            parseTextNodes(getParagraphNode(listItem), BlockType.OrderedListItem)
          );
          parseNodes(index + 1);
          break;
        case NodeType.UnorderedList:
          node.nodes.forEach(listItem =>
            parseTextNodes(getParagraphNode(listItem), BlockType.UnorderedListItem)
          );
          parseNodes(index + 1);
          break;
        case NodeType.Paragraph:
          parseTextNodes(node, BlockType.Unstyled);
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
    const { type, data } = getNodeEntityData(node);
    editorState = createBlock(editorState, data, type).newEditorState;
  };

  const getParagraphNode = (node: RicosNode) => {
    if (node.nodes[0].type === 'paragraph') {
      return node.nodes[0];
    } else {
      console.log(`ERROR! Expected a paragraph node but found ${node.nodes[0].type}`);
      process.exit(1);
    }
  };

  const parseTextNodes = (node: RicosNode, blockType: DraftBlockType, wrapperNode?: RicosNode) => {
    const { text, decorations } = mergeTextNodes(node.nodes);
    const {
      editorState: editorStateWithEntities,
      inlineStyleRanges,
      entityRanges,
    } = parseDecorations(editorState, decorations, text);
    const data = createTextBlockData(wrapperNode || node, blockType);
    editorState = addTextBlock(editorStateWithEntities, {
      key: node.key,
      type: blockType,
      text,
      data,
    });
    const contentState = [...entityRanges, ...inlineStyleRanges].reduce((contentState, range) => {
      const selectionState = createSelection({
        blockKey: node.key,
        anchorOffset: range.start,
        focusOffset: range.end,
      });
      const content =
        'style' in range
          ? Modifier.applyInlineStyle(contentState, selectionState, range.style)
          : Modifier.applyEntity(contentState, selectionState, range.key);
      return content;
    }, editorState.getCurrentContent());
    editorState = EditorState.push(editorState, contentState, 'change-inline-style');
  };

  parseNodes();

  const rawContentState: RicosContentDraft = convertToRaw(editorState.getCurrentContent());
  rawContentState.VERSION = version;
  return rawContentState;
};

const addTextBlock = (
  editorState: EditorState,
  blockProps?: Pick<RicosContentBlock, 'key' | 'type' | 'text' | 'data'>
): EditorState => {
  const newBlock = new ContentBlock(
    merge(
      {
        key: genKey(),
        type: BlockType.Unstyled,
        text: '',
      },
      blockProps
    )
  );

  const contentState = editorState.getCurrentContent();
  const newBlockMap = contentState.getBlockMap().set(newBlock.getKey(), newBlock);
  const newEditorState = EditorState.push(
    editorState,
    ContentState.createFromBlockArray(newBlockMap.toArray())
      .set('selectionBefore', contentState.getSelectionBefore())
      .set('selectionAfter', contentState.getSelectionAfter()) as ContentState,
    'insert-fragment'
  );
  const selectionState = SelectionState.createEmpty(
    newEditorState
      .getCurrentContent()
      .getLastBlock()
      .getKey()
  );

  return EditorState.acceptSelection(newEditorState, selectionState);
};

const removeFirstBlock = (editorState: EditorState): EditorState => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const firstBlockKey = contentState.getFirstBlock().getKey();
  const newBlockMap = blockMap.remove(firstBlockKey);
  const newContentState = contentState.merge({
    blockMap: newBlockMap,
  }) as ContentState;
  const newEditorState = EditorState.push(editorState, newContentState, 'remove-range');
  return newEditorState;
};

const mergeTextNodes = (
  nodes: RicosNode[]
): { text: string; decorations: DecorationDescriptor[] } => {
  let length = 0;
  return nodes.reduce<{
    text: string;
    decorations: DecorationDescriptor[];
  }>(
    (accNode, currNode) => {
      if (currNode.ricosText) {
        const text = currNode.ricosText.text;
        const textLength = Array.from(text).length; // required for properly reading emojis
        accNode.text += text;
        const decorations: DecorationDescriptor[] | undefined = currNode.ricosText.decorations?.map(
          decoration => ({
            ...decoration,
            start: length,
            end: length + textLength,
          })
        );
        if (decorations) {
          accNode.decorations = accNode.decorations.concat(decorations);
        }
        length += textLength;
      }
      return accNode;
    },
    { text: '', decorations: [] }
  );
};

interface InlineStyleRange {
  style: string;
  start: number;
  end: number;
}

interface EntityRange {
  key: string;
  start: number;
  end: number;
}

const parseDecorations = (
  editorState: EditorState,
  decorations: DecorationDescriptor[],
  text: string
): {
  editorState: EditorState;
  inlineStyleRanges: InlineStyleRange[];
  entityRanges: EntityRange[];
} => {
  const contentState = editorState.getCurrentContent();
  const { inlineStyleRanges, entityRanges } = convertDecorationTypes(decorations).reduce<{
    inlineStyleRanges: InlineStyleRange[];
    entityRanges: EntityRange[];
  }>(
    ({ inlineStyleRanges, entityRanges }, decoration) => {
      if (ENTITY_DECORATION_TO_MUTABILITY[decoration.type]) {
        const { type, data, mutability } = getDecorationEntityData(decoration);
        const entityKey = contentState
          .createEntity(type, mutability, data)
          .getLastCreatedEntityKey();
        return {
          inlineStyleRanges,
          entityRanges: [
            ...entityRanges,
            {
              key: entityKey,
              start: decoration.start,
              end: decoration.end,
            },
          ],
        };
      }
      return {
        inlineStyleRanges: [
          ...inlineStyleRanges,
          { style: decoration.type, start: decoration.start, end: decoration.end },
        ],
        entityRanges,
      };
    },
    { inlineStyleRanges: [], entityRanges: [] }
  );
  const emojiEntityRanges: EntityRange[] = Array.from(text.matchAll(emojiRegex)).flatMap(
    ({ 0: emojiUnicode, index: start }) =>
      start
        ? {
            key: contentState
              .createEntity('EMOJI_TYPE', 'IMMUTABLE', { emojiUnicode })
              .getLastCreatedEntityKey(),
            start,
            end: (start || 0) + 1,
          }
        : []
  );
  return {
    editorState: EditorState.push(editorState, contentState, 'apply-entity'),
    inlineStyleRanges,
    entityRanges: [...emojiEntityRanges, ...entityRanges],
  };
};

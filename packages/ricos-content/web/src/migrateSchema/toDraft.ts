/* eslint-disable no-console */
import { RicosContent, RicosNode, RicosDecoration } from 'ricos-schema';
import { RicosContent as RicosContentDraft } from 'ricos-content';
import {
  EditorState,
  convertToRaw,
  createBlock,
  ContentBlock,
  genKey,
  ContentState,
  createSelection,
  Modifier,
} from 'wix-rich-content-editor-common';
import { FROM_RICOS_ENTITY_TYPE_MAP, NodeType, BlockType } from './consts';
import { DraftBlockType, RawDraftContentBlock } from 'draft-js';
import { merge } from 'lodash';
import toSlugCase from 'to-slug-case';

interface DecorationDescriptor extends RicosDecoration {
  start: number;
  end: number;
}

const splitColorDecoration = (decorations: DecorationDescriptor[]): DecorationDescriptor[] =>
  decorations.flatMap(({ ricosColor, ...decorationProps }) => {
    const { foreground, background } = ricosColor || {};
    return [foreground && { FG: foreground }, background && { BG: background }]
      .filter(x => x)
      .map(type => ({
        ...decorationProps,
        type: JSON.stringify(type),
      }));
  });

export const toDraft = (ricosContent: RicosContent): RicosContentDraft => {
  const {
    doc: { nodes },
    version,
  } = ricosContent;
  let editorState = EditorState.createEmpty();

  const parseNodes = (index = 0) => {
    const node = nodes[index];
    if (node) {
      switch (node.type) {
        case NodeType.Blockquote:
          parseQuoteNode(node);
          parseNodes(index + 1);
          break;
        // case NodeType.CodeBlock:
        //   parseCodeNode(node);
        //   parseNodes(index + 1);
        //   break;
        // case NodeType.Heading:
        //   parseHeadingNode(node);
        //   parseNodes(index + 1);
        //   break;
        // case NodeType.OrderedList:
        // case NodeType.UnorderedList:
        //   // const { node, nextIndex } = parseListBlocks(index);
        //   // node);
        //   // parseNodes(nextIndex);
        //   break;
        // case NodeType.Text:
        //   parseTextNode(node);
        //   parseNodes(index + 1);
        //   break;
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
    const dataField = FROM_RICOS_ENTITY_TYPE_MAP[node.type];
    editorState = createBlock(editorState, node.type, dataField).newEditorState;
  };

  const parseQuoteNode = (node: RicosNode) => {
    // const { key, nodes: quoteNodes } = node;
    const paragraph: RicosNode = getParagraphNode(node);
    parseTextNodes(paragraph);

    // addTextBlock(editorState, { text: node.text, key: node.key, type: BlockType.Blockquote });
  };

  // const parseCodeNode = (node: RicosNode) => ({
  //   key: block.key,
  //   type: 'codeblock',
  //   nodes: getTextNodes(block),
  // });

  // const parseHeadingNode = (node: RicosNode) => {
  //   const getLevel = (blockType: string) => {
  //     switch (blockType) {
  //       case BlockType.HeaderOne:
  //         return HeaderLevel[BlockType.HeaderOne];
  //       case BlockType.HeaderTwo:
  //         return HeaderLevel[BlockType.HeaderTwo];
  //       case BlockType.HeaderThree:
  //         return HeaderLevel[BlockType.HeaderThree];
  //       case BlockType.HeaderFour:
  //         return HeaderLevel[BlockType.HeaderFour];
  //       case BlockType.HeaderFive:
  //         return HeaderLevel[BlockType.HeaderFive];
  //       case BlockType.HeaderSix:
  //         return HeaderLevel[BlockType.HeaderSix];
  //       default:
  //         console.log(`ERROR! Unknown header level "${blockType}"!`);
  //         process.exit(1);
  //     }
  //   };
  //   return {
  //     key: block.key,
  //     type: 'heading',
  //     ricosHeading: {
  //       level: getLevel(block.type),
  //     },
  //     nodes: getTextNodes(block),
  //   };
  // };

  // const parseTextNode = (node: RicosNode) => {
  //   const textWrapperNode: RicosNode = {
  //     key: genKey(),
  //     type: 'paragraph',
  //     nodes: [],
  //   };

  //   keyMapping[block.key] = textWrapperNode.key;

  //   const nodes = getTextNodes(block);
  //   if (!isEmpty(nodes)) {
  //     textWrapperNode.nodes = nodes;
  //   }

  //   return textWrapperNode;
  // };

  // const parseListNode = (listStartIndex: number): { node: RicosNode; nextIndex: number } => {
  //   const listType = blocks[listStartIndex].type;
  //   const listBlocks: RicosNode[] = [];
  //   let searchIndex = listStartIndex;

  //   while (searchIndex >= 0) {
  //     const nextBlock = blocks[searchIndex];
  //     if (nextBlock.type === listType) {
  //       listBlocks.push(nextBlock);
  //       searchIndex++;
  //     } else {
  //       searchIndex = -1;
  //     }
  //   }

  //   return {
  //     node: {
  //       key: genKey(),
  //       type: FromDraftListType[listType],
  //       nodes: listBlocks.map(block => ({
  //         key: block.key,
  //         type: 'list_item',
  //         nodes: [parseTextNode(block)],
  //       })),
  //     },
  //     nextIndex: listStartIndex + listBlocks.length,
  //   };
  // };

  const getParagraphNode = (node: RicosNode) => {
    if (node.nodes[0].type === 'paragraph') {
      return node.nodes[0];
    } else {
      console.log(`ERROR! Expected a paragraph node but found ${node.nodes[0].type}`);
      process.exit(1);
    }
  };

  const applyDecoration = (
    contentState: ContentState,
    key: string,
    decoration: DecorationDescriptor
  ): ContentState => {
    const selection = createSelection({
      blockKey: key,
      anchorOffset: decoration.start,
      focusOffset: decoration.end,
    });
    return Modifier.applyInlineStyle(contentState, selection, decoration.type);
  };

  const parseTextNodes = (node: RicosNode, blockType: DraftBlockType) => {
    let length = 0;
    const { text, decorations } = node.nodes.reduce<{
      text: string;
      decorations: DecorationDescriptor[];
    }>(
      (accNode, currNode) => {
        accNode.text += currNode.ricosText?.text;
        const decorations = currNode.ricosText?.decorations?.map(decoration => ({
          ...decoration,
          start: length,
          end: accNode.text.length,
        }));
        if (decorations) {
          accNode.decorations = accNode.decorations.concat(decorations);
        }
        length += accNode.text.length;
        return accNode;
      },
      { text: '', decorations: [] }
    );
    const { textAlignment, dynamicStyles } = node.ricosParagraph || {};
    const data = Object.assign(
      {},
      textAlignment ? { textAlignment: textAlignment.toString().toLowerCase() } : undefined,
      dynamicStyles
        ? {
            dynamicStyles: Object.fromEntries(
              Object.entries(dynamicStyles).map(([key, value]) => [toSlugCase(key), value])
            ),
          }
        : undefined
    );
    editorState = addTextBlock(editorState, {
      key: node.key,
      type: blockType,
      text,
      data,
    });
    const contentState = editorState.getCurrentContent();
    const newContentState = splitColorDecoration(decorations).reduce(
      (accContentState, decoration) => applyDecoration(accContentState, node.key, decoration),
      contentState
    );
    return EditorState.push(editorState, newContentState, 'change-inline-style');
  };

  parseNodes();

  const rawContentState: RicosContentDraft = convertToRaw(editorState.getCurrentContent());
  rawContentState.VERSION = version;
  return rawContentState;
};

const addTextBlock = (
  editorState: EditorState,
  blockProps?: Partial<RawDraftContentBlock>
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

  return EditorState.push(
    editorState,
    ContentState.createFromBlockArray(newBlockMap.toArray())
      .set('selectionBefore', contentState.getSelectionBefore())
      .set('selectionAfter', contentState.getSelectionAfter()) as ContentState,
    'insert-fragment'
  );
};

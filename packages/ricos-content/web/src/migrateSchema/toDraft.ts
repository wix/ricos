/* eslint-disable  */

import { RicosContent, RicosNode } from 'ricos-schema';
import { RicosContent as RicosContentDraft } from 'ricos-content';
import { EditorState, convertToRaw, createBlock } from 'wix-rich-content-editor-common';
import { FROM_RICOS_ENTITY_TYPE_MAP, NodeType } from './consts';

export const toDraft = (ricosContent: RicosContent): RicosContentDraft => {
  const {
    doc: { nodes },
    version,
  } = ricosContent;
  let editorState = EditorState.createEmpty();
  ricosContent.doc.nodes;

  const parseNodes = (index = 0) => {
    const node = nodes[index];
    if (node) {
      switch (node.type) {
        case NodeType.Blockquote:
          parseQuoteBlock(node);
          parseNodes(index + 1);
          break;
        case NodeType.CodeBlock:
          parseCodeBlock(node);
          parseNodes(index + 1);
          break;
        case NodeType.Heading:
          parseHeaderBlock(node);
          parseNodes(index + 1);
          break;
        case NodeType.OrderedList:
        case NodeType.UnorderedList:
          // const { node, nextIndex } = parseListBlocks(index);
          // node);
          // parseNodes(nextIndex);
          break;
        case NodeType.Text:
          parseTextBlock(node);
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
    const dataField = FROM_RICOS_ENTITY_TYPE_MAP[node.type];
    editorState = createBlock(editorState, node.type, dataField).newEditorState;
  };

  const parseQuoteBlock = (node: RicosNode) => ({
    key: block.key,
    type: 'blockquote',
    nodes: [parseTextBlock(node)],
  });

  const parseCodeBlock = (node: RicosNode) => ({
    key: block.key,
    type: 'codeblock',
    nodes: getTextNodes(block),
  });

  const parseHeaderBlock = (node: RicosNode) => {
    const getLevel = (blockType: string) => {
      switch (blockType) {
        case BlockType.HeaderOne:
          return HeaderLevel[BlockType.HeaderOne];
        case BlockType.HeaderTwo:
          return HeaderLevel[BlockType.HeaderTwo];
        case BlockType.HeaderThree:
          return HeaderLevel[BlockType.HeaderThree];
        case BlockType.HeaderFour:
          return HeaderLevel[BlockType.HeaderFour];
        case BlockType.HeaderFive:
          return HeaderLevel[BlockType.HeaderFive];
        case BlockType.HeaderSix:
          return HeaderLevel[BlockType.HeaderSix];
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

  const parseTextBlock = (node: RicosNode) => {
    const textWrapperNode: RicosNode = {
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

  const parseListBlocks = (listStartIndex: number): { node: RicosNode; nextIndex: number } => {
    const listType = blocks[listStartIndex].type;
    const listBlocks: RicosNode[] = [];
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

  const rawContentState: RicosContentDraft = convertToRaw(contentState);
  rawContentState.VERSION = version;
  return rawContentState;
};

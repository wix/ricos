import { pipe, flow } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import { Element, DocumentFragment } from 'parse5';
import { toAst, isLeaf, not, isText, isComment } from './ast-utils';
import { RichContent, Node, Decoration, Decoration_Type, Node_Type } from 'ricos-schema';
import { ContentNode, Rule } from './models';
import {
  createDecoration,
  createHeadingNode,
  createNode,
  createParagraphNode,
  createTextNode,
  createLinkData,
  initializeMetadata,
  reduceDecorations,
} from '../../../nodeUtils';

const htmlToNodes = (decorations: Decoration[] = []) => (element: ContentNode): Node[] => {
  if (isText(element)) {
    return element.value === '\n'
      ? []
      : [createTextNode(element.value, reduceDecorations(decorations))];
  }
  switch (element.nodeName) {
    case 'strong':
    case 'em':
    case 'u':
      return addDecoration(element, decorations, TAG_TO_DECORATION_TYPE[element.nodeName]);
    case 'a':
      return addDecoration(element, decorations, Decoration_Type.LINK, createLinkData(element));
    case 'ul':
    case 'ol':
    case 'li':
      return [createNode(TAG_TO_NODE_TYPE[element.nodeName], traverse(element, decorations))];
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return [
        createHeadingNode(traverse(element, decorations), {
          level: parseInt(element.nodeName.substring(1), 10),
        }),
      ];
    case 'p':
      return [createParagraphNode(traverse(element, decorations))];
    default:
      return [];
  }
};

const TAG_TO_DECORATION_TYPE = {
  strong: Decoration_Type.BOLD,
  em: Decoration_Type.ITALIC,
  u: Decoration_Type.UNDERLINE,
};

const TAG_TO_NODE_TYPE = {
  ul: Node_Type.BULLET_LIST,
  ol: Node_Type.ORDERED_LIST,
  li: Node_Type.LIST_ITEM,
};

const addDecoration = (
  element: Element,
  decorations: Decoration[],
  type: Decoration_Type,
  data: Omit<Decoration, 'type'> = {}
) => {
  const decoration = createDecoration(type, data);
  const innerElement = pipe(element, getChildNodes, filterComments)[0] as ContentNode;
  return htmlToNodes([...decorations, decoration])(innerElement);
};

const getChildNodes = (element: Element | DocumentFragment): ContentNode[] =>
  isLeaf(element) ? [] : (element.childNodes as ContentNode[]);

const filterComments = A.filter(not(isComment));

const traverse = (element: Element | DocumentFragment, decorations: Decoration[] = []): Node[] =>
  pipe(element, getChildNodes, filterComments, A.chain(htmlToNodes(decorations)));

const toRichContent = (nodes: Node[]): RichContent => ({ nodes, metadata: initializeMetadata() });

export const parse = (rules: Rule[], html: string) =>
  pipe(html, toAst, traverse, toRichContent, RichContent.fromJSON);

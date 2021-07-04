import { pipe, flow } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import { merge } from 'lodash';
import { Element, TextNode, DocumentFragment } from 'parse5';
import { toAst, isLeaf, not, isComment } from './ast-utils';
import { RichContent, Node, Decoration, Decoration_Type, Node_Type } from 'ricos-schema';
import {
  createDecoration,
  createHeadingNode,
  createNode,
  createParagraphNode,
  createTextNode,
  initializeMetadata,
} from '../../../nodeUtils';

const parseHtmlElement = (
  element: Element | TextNode,
  decorations: Decoration[] = []
): Node | Node[] => {
  // TextNode
  if ('value' in element) {
    return element.value === '\n'
      ? []
      : createTextNode(element.value, reduceDecorations(decorations));
  }
  // ElementNode
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
      return createNode(TAG_TO_NODE_TYPE[element.nodeName], traverse(element, decorations));
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return createHeadingNode(traverse(element, decorations), {
        level: parseInt(element.nodeName.substring(1), 10),
      });
    case 'p':
    default:
      return createParagraphNode(traverse(element, decorations));
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
  const innerElement = getChildNodes(element)[0];
  return parseHtmlElement(innerElement, [...decorations, decoration]);
};

const createLinkData = (element: Element) => {
  const url = element.attrs.find(attr => attr.name === 'href')?.value;
  return url ? { linkData: { url } } : {};
};

const toRichContentNodes = (decorations: Decoration[]) => (elements: (TextNode | Element)[]) =>
  elements.flatMap(el => parseHtmlElement(el, decorations));

const traverse = (element: Element | DocumentFragment, decorations: Decoration[] = []): Node[] =>
  pipe(element, getChildNodes, filterComments, toRichContentNodes(decorations));

const getChildNodes = (element: Element | DocumentFragment): (TextNode | Element)[] =>
  isLeaf(element) ? [] : (element.childNodes as (Element | TextNode)[]);

const filterComments = A.filter(not(isComment));

type DecorationMap = Record<Decoration_Type, Decoration>;

const reduceDecorations = (decorations: Decoration[]): Decoration[] => {
  const reducedDecorationsMap: DecorationMap = decorations.reduce(
    (decorationMap, { type, ...data }) => {
      const currentDecoration: Decoration = decorationMap[type] || { type };
      const nextDecoration: Decoration = { type, ...data };
      return {
        ...decorationMap,
        [type]: merge(currentDecoration, nextDecoration),
      };
    },
    {} as DecorationMap
  );
  const reducedDecorations = Object.values(reducedDecorationsMap);
  return reducedDecorations;
};

const toRichContent = (nodes: Node[]): RichContent => ({ nodes, metadata: initializeMetadata() });

export const parse = flow(toAst, traverse, toRichContent, RichContent.fromJSON);

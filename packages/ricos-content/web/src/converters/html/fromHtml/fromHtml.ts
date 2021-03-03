import { merge } from 'lodash';
import { parseFragment, ChildNode, Element, TextNode, DocumentFragment } from 'parse5';
import { RichContent, Node, Decoration, Decoration_Type, Node_Type } from 'ricos-schema';
import {
  createDecoration,
  createHeadingNode,
  createNode,
  createParagraphNode,
  createTextNode,
  initializeMetadata,
} from '../../nodeUtils';

export const fromHtml = (htmlString: string): RichContent => {
  const html = parseFragment(removeLineSpaces(htmlString));
  const nodes: Node[] = getChildElements(html).map(element => parseHtmlElement(element));
  const content: RichContent = { nodes, metadata: initializeMetadata() };
  return RichContent.toJSON(RichContent.fromJSON(content)) as RichContent;
};

const parseHtmlElement = (element: Element | TextNode, decorations: Decoration[] = []): Node => {
  // TextNode
  if ('value' in element) {
    return createTextNode(element.value, reduceDecorations(decorations));
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
      return createNode(TAG_TO_NODE_TYPE[element.nodeName], getChildNodes(element, decorations));
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return createHeadingNode(getChildNodes(element, decorations), {
        level: parseInt(element.nodeName.substring(1), 10),
      });
    case 'p':
    case 'br':
    default:
      return createParagraphNode(getChildNodes(element, decorations));
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

const removeLineSpaces = (html: string) =>
  html
    .replace(/\s*\n\s*/g, '')
    .replace('"<', '<')
    .replace('>"', '>')
    .replace(/""/g, '"');

const addDecoration = (
  element: Element,
  decorations: Decoration[],
  type: Decoration_Type,
  data: Omit<Decoration, 'type'> = {}
) => {
  const decoration = createDecoration(type, data);
  return parseHtmlElement(getChildElements(element)[0], [...decorations, decoration]);
};

const createLinkData = (element: Element) => {
  const url = element.attrs.find(attr => attr.name === 'href')?.value;
  return url ? { linkData: { url } } : {};
};

const getChildNodes = (element: Element, decorations: Decoration[]): Node[] =>
  getChildElements(element).map(childElement => parseHtmlElement(childElement, decorations));

const getChildElements = (element: ChildNode | DocumentFragment): (TextNode | Element)[] =>
  'childNodes' in element ? filterCommentElements(element.childNodes) : [];

const filterCommentElements = (nodes: ChildNode[]): (Element | TextNode)[] =>
  nodes.flatMap((element: ChildNode) => ('data' in element ? [] : element));

const reduceDecorations = (decorations: Decoration[]): Decoration[] =>
  Object.values(
    decorations.reduce((decorationMap, { type, ...data }) => {
      const currentDecoration: Decoration = decorationMap[type] || { type };
      return {
        ...decorationMap,
        [type]: merge(currentDecoration, {
          type,
          ...data,
        }),
      };
    }, {})
  );

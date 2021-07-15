import { merge } from 'lodash';
import { parseFragment, ChildNode, Element, TextNode, DocumentFragment } from 'parse5';
import { RichContent, Node, Decoration, Decoration_Type, Node_Type, LinkData } from 'ricos-schema';
import {
  createDecoration,
  createHeadingNode,
  createLink,
  createNode,
  createParagraphNode,
  createTextNode,
  initializeMetadata,
} from '../../nodeUtils';

export const fromHtml = (htmlString: string): RichContent => {
  const htmlElement = parseFragment(preprocessHtmlString(htmlString));
  const nodes: Node[] = getChildNodes(htmlElement);
  const content: RichContent = {
    nodes,
    metadata: initializeMetadata(),
  };
  return RichContent.fromJSON(content);
};

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

const preprocessHtmlString = (html: string) =>
  html
    .replace(/\s*\n\s*/g, '') // remove spaces between lines (they count as elements)
    .replace('"<', '<') // remove first `"` if exists
    .replace('>"', '>') // remove last `"` if exists
    .replace(/""/g, '"') // convert `""string""` to `"string"`
    .replace(/<\s*br\s*\/?>/g, '\n'); // replace br tags with new lines

const addDecoration = (
  element: Element,
  decorations: Decoration[],
  type: Decoration_Type,
  data: Omit<Decoration, 'type'> = {}
) => {
  const decoration = createDecoration(type, data);
  const innerElement = getChildElements(element)[0];
  return parseHtmlElement(innerElement, [...decorations, decoration]);
};

const createLinkData = (element: Element) => {
  const url = element.attrs.find(attr => attr.name === 'href')?.value;
  const rel = element.attrs.find(attr => attr.name === 'rel')?.value;
  const target = element.attrs.find(attr => attr.name === 'target')?.value;
  return url ? { linkData: { link: createLink({ url, rel, target }) } } : {};
};

const getChildNodes = (
  element: Element | DocumentFragment,
  decorations: Decoration[] = []
): Node[] =>
  getChildElements(element).flatMap(childElement => parseHtmlElement(childElement, decorations));

const getChildElements = (element: ChildNode | DocumentFragment): (TextNode | Element)[] =>
  'childNodes' in element ? filterCommentElements(element.childNodes) : [];

const filterCommentElements = (nodes: ChildNode[]): (Element | TextNode)[] =>
  nodes.flatMap((element: ChildNode) => ('data' in element ? [] : element));

type DecorationMap = Record<Decoration_Type, Decoration>;

const reduceDecorations = (decorations: Decoration[]): Decoration[] => {
  const reducedDecorationsMap: DecorationMap = decorations.reduce(
    (decorationMap, { type, ...data }) => {
      const currentDecoration: Decoration = decorationMap[type] || { type };
      const nextDecoration: Decoration = { type, ...data };
      return {
        [type]: merge(currentDecoration, nextDecoration),
        ...decorationMap,
      };
    },
    {} as DecorationMap
  );
  const reducedDecorations = Object.values(reducedDecorationsMap);
  return reducedDecorations;
};

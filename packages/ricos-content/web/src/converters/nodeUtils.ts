import { merge } from 'lodash';
import { Element } from 'parse5';
import {
  TextStyle_TextAlignment,
  Node_Type,
  NodeStyle,
  ParagraphData,
  Node,
  Decoration,
  Metadata,
  Decoration_Type,
  HeadingData,
  LATEST_VERSION,
} from 'ricos-schema';
import { genKey } from './generateRandomKey';

export const createNode = (type: Node_Type, nodes: Node[] = [], style?: NodeStyle): Node => ({
  type,
  key: genKey(),
  nodes,
  style,
});

export const createParagraphNode = (
  nodes: Node[] = [],
  data?: ParagraphData,
  style?: NodeStyle
): Node => ({
  ...createNode(Node_Type.PARAGRAPH, nodes, style),
  paragraphData: {
    textStyle: { textAlignment: TextStyle_TextAlignment.AUTO },
    ...data,
  },
});

export const createTextNode = (text: string, decorations: Decoration[] = []): Node => ({
  ...createNode(Node_Type.TEXT),
  textData: {
    text,
    decorations,
  },
});

export const createHeadingNode = (nodes: Node[] = [], data: HeadingData): Node => ({
  ...createNode(Node_Type.HEADING, nodes),
  headingData: {
    textStyle: { textAlignment: TextStyle_TextAlignment.AUTO },
    ...data,
  },
});

export const createLinkData = (element: Element) => {
  const url = element.attrs.find(attr => attr.name === 'href')?.value;
  return url ? { linkData: { url } } : {};
};

export const createDecoration = (
  type: Decoration_Type,
  data: Omit<Decoration, 'type'> = {}
): Decoration => ({ type, ...data });

export const initializeMetadata = (version?: number): Metadata => ({
  version: version || LATEST_VERSION,
  createdTimestamp: new Date(),
  updatedTimestamp: new Date(),
});

type DecorationMap = Record<Decoration_Type, Decoration>;

export const reduceDecorations = (decorations: Decoration[]): Decoration[] => {
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

import { merge } from 'lodash';
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

export const createNode = (type: Node_Type, nodes: Node[] = [], style?: NodeStyle): Node =>
  merge(
    {
      type,
      key: genKey(),
      nodes,
    },
    style && { style }
  );

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

export const createDecoration = (
  type: Decoration_Type,
  data: Omit<Decoration, 'type'> = {}
): Decoration => ({ type, ...data });

export const initializeMetadata = (version?: number): Metadata => ({
  version: version || LATEST_VERSION,
  createdTimestamp: new Date(),
  updatedTimestamp: new Date(),
});

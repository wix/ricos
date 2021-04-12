import {
  TextStyle_TextAlignment,
  Node_Type,
  ParagraphData,
  Node,
  Decoration,
  Metadata,
  Decoration_Type,
  HeadingData,
} from 'ricos-schema';
import { Version } from '..';
import { genKey } from './generateRandomKey';

export const createNode = (type: Node_Type, nodes: Node[] = []): Node => ({
  type,
  key: genKey(),
  nodes,
});

export const createParagraphNode = (nodes: Node[] = [], data?: ParagraphData): Node => ({
  ...createNode(Node_Type.PARAGRAPH, nodes),
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

export const initializeMetadata = (version?: string): Metadata => ({
  createdVersion: version || Version.currentVersion,
  updatedVersion: version || Version.currentVersion,
  updatedDate: new Date(),
});

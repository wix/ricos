import {
  TextStyle_TextAlignment,
  Node_Type,
  ParagraphData,
  Node,
  Decoration,
  Metadata,
  Timestamp,
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
    textStyle: { textAlignment: TextStyle_TextAlignment.LEFT },
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
    textStyle: { textAlignment: TextStyle_TextAlignment.LEFT },
    ...data,
  },
});

export const createDecoration = (
  type: Decoration_Type,
  data: Omit<Decoration, 'type'> = {}
): Decoration => ({ type, ...data });

export const createTimestamp = (): Timestamp => {
  const timeMS = Date.now();
  return {
    seconds: Math.floor(timeMS / 1000),
    nanos: (timeMS % 1000) * 1e6,
  };
};

export const initializeMetadata = (version?: string): Metadata => ({
  createdVersion: version || Version.currentVersion,
  updatedVersion: version || Version.currentVersion,
  updatedDate: createTimestamp(),
});

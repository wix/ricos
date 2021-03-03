import {
  Common_TextAlignment,
  Node_Type,
  ParagraphData,
  Node,
  Decoration,
  Metadata,
  Timestamp,
} from 'ricos-schema';
import { Version } from '..';
import { genKey } from './generateRandomKey';

export const createParagraphNode = (nodes: Node[] = [], data?: ParagraphData): Node => ({
  type: Node_Type.PARAGRAPH,
  key: genKey(),
  nodes,
  paragraphData: {
    textAlignment: Common_TextAlignment.LEFT,
    ...data,
  },
});

export const createTextNode = (text: string, decorations: Decoration[] = []): Node => ({
  type: Node_Type.TEXT,
  key: genKey(),
  nodes: [],
  textData: {
    text,
    decorations,
  },
});

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

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
  Link,
  Link_Target,
} from 'ricos-schema';
import { genKey } from './generateRandomKey';
import fromEntries from 'fromentries';

export const createNode = (
  type: Node_Type,
  nodes: Node[] = [],
  { style, key }: { style?: NodeStyle; key?: string } = {}
): Node => ({
  type,
  key: key ?? genKey(),
  nodes,
  style,
});

export const createParagraphNode = (
  nodes: Node[] = [],
  data?: ParagraphData,
  style?: NodeStyle
): Node => ({
  ...createNode(Node_Type.PARAGRAPH, nodes, { style }),
  paragraphData: {
    textStyle: { textAlignment: TextStyle_TextAlignment.AUTO },
    ...data,
  },
});

export const createTextNode = (text: string, decorations: Decoration[] = []): Node => ({
  ...createNode(Node_Type.TEXT, [], { key: '' }),
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

export const createLink = ({
  url,
  rel,
  target,
  anchor,
}: {
  url?: string;
  rel?: string;
  target?: string;
  anchor?: string;
}): Link => {
  const relValues: [string, boolean][] =
    rel
      ?.split(' ')
      .filter(key => ['nofollow', 'sponsored', 'ugc'].includes(key))
      .map(key => [key, true]) || [];
  return {
    anchor,
    url,
    rel: relValues.length > 0 ? fromEntries(relValues) : undefined,
    target: target?.toUpperCase().substring(1) as Link_Target,
  };
};

export const createLinkDecoration = (data: { url?: string; rel?: string; target?: string }) =>
  createDecoration(Decoration_Type.LINK, { linkData: { link: createLink(data) } });

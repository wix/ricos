import { Node, Decoration, Decoration_Type } from 'ricos-schema';
import { TextNode, Element, CommentNode } from 'parse5';

export type ContentNode = Element | TextNode | CommentNode;

export type Context = {
  readonly decorations: Decoration[];
  visit: (element: Element) => Node[];
  addDecoration: (
    type: Decoration_Type,
    data: Omit<Decoration, 'type'>,
    element: Element
  ) => Node[];
};

export type Rule = [
  (contentNode: ContentNode) => boolean,
  (context: Context) => (contentNode: ContentNode) => Node[]
];

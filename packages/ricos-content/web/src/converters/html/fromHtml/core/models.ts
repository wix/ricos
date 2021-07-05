import { Node, TextData, NodeStyle, Decoration, RichContent } from 'ricos-schema';
import { TextNode, Element } from 'parse5';

export type ContentNode = Element | TextNode;

export type Rule = {
  _if: (contentNode: ContentNode) => boolean;
  _then: (context, decorations: Decoration[], contentNode: ContentNode) => Node[];
};

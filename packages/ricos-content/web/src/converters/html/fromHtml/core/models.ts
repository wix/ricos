import { Node, TextData, NodeStyle, RichContent } from 'ricos-schema';
import { ChildNode } from 'parse5';

export interface Parser {
  preprocess: (html: string) => string;
  parse: (html: string, rules: Rule[]) => RichContent;
  postprocess: (content: RichContent) => RichContent;
}

export type Rule = (node: ChildNode, context: Context) => Context;

export type Rules = {
  '#text': Rule;
  p: Rule;
  strong: Rule;
  em: Rule;
  u: Rule;
  a: Rule;
  ul: Rule;
  ol: Rule;
  li: Rule;
  h1: Rule;
  h2: Rule;
  h3: Rule;
  h4: Rule;
  h5: Rule;
  h6: Rule;
  img: Rule;
};

export interface Context {
  node: Node;
  style: NodeStyle;
  textData: TextData[];
}

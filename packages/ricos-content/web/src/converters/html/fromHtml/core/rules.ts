import { ChildNode } from 'parse5';
import { Rule, Context, Rules } from './models';
import { createParagraphNode } from '../../../nodeUtils';

const emptyContext: Context = {
  node: createParagraphNode(),
  style: {},
  textData: [],
};

const emptyRule = (_, context: Context) => context;

const textToParagraph = (childNode: ChildNode, context) => {};

export const rules: Rules = {
  '#text': emptyRule,
  p: emptyRule,
  strong: emptyRule,
  em: emptyRule,
  u: emptyRule,
  a: emptyRule,
  ul: emptyRule,
  ol: emptyRule,
  li: emptyRule,
  h1: emptyRule,
  h2: emptyRule,
  h3: emptyRule,
  h4: emptyRule,
  h5: emptyRule,
  h6: emptyRule,
  img: emptyRule,
};

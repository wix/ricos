import { Context, Rules } from './models';

const emptyContext: Context = {
  nodes: [],
  style: {},
  textData: [],
};

const emptyRule = (_, context: Context) => context;

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

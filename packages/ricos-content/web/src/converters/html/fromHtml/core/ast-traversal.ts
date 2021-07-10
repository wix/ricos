import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';

import { DocumentFragment } from 'parse5';
import { getChildNodes, AstRule } from './ast-utils';
import { ContentNode } from './models';
import { log } from '../../../../fp-utils';

const appyRule = (rule: AstRule) => (node: ContentNode): ContentNode => {
  const [_if, then] = rule;
  const processed = _if(node) ? then(node) : node;
  return {
    ...processed,
    childNodes: visit(rule)(processed),
  };
};

const visit = (rule: AstRule) => (element: ContentNode | DocumentFragment) =>
  pipe(element, getChildNodes, A.map(appyRule(rule)));

export default (rule: AstRule) => visit(rule);

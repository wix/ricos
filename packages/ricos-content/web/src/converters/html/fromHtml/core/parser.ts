import { parseFragment } from 'parse5';
import traverse from 'parse5-traverse';
// import { ChildNode, Element, DocumentFragment } from 'parse5';
import { RichContent } from 'ricos-schema';
import { initializeMetadata } from '../../../nodeUtils';
import { Rules } from './models';

export const Parser = (rules: Rules) => (html: string): RichContent => {
  const nodes = [];
  const ast = parseFragment(html);
  traverse(ast, {
    pre(node, parent) {
      console.dir(node, { depth: null }); // eslint-disable-line no-console
    },
  });

  return { nodes, metadata: initializeMetadata() };
};

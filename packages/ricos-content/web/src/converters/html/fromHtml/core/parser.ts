import { flow, pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';

import { Element, DocumentFragment } from 'parse5';
import { toAst, isLeaf, not, isComment } from './ast-utils';
import { RichContent, Node, Decoration, Decoration_Type } from 'ricos-schema';
import { ContentNode, Context, Rule } from './models';
import { initializeMetadata, createDecoration, reduceDecorations } from '../../../nodeUtils';

const contextOf = (rules: Rule[], decorations: Decoration[]): Context => ({
  visit: visit(rules, decorations),
  decorations: reduceDecorations(decorations),
  addDecoration: addDecoration(rules, decorations),
});

const htmlToNodes = (rules: Rule[], decorations: Decoration[] = []) => (
  node: ContentNode
): Node[] =>
  pipe(
    rules,
    A.filter(([_if]) => _if(node)),
    A.chain(([, then]) => then(contextOf(rules, decorations))(node))
  );

const addDecoration = (rules: Rule[], decorations: Decoration[]) => (
  type: Decoration_Type,
  data: Omit<Decoration, 'type'> = {},
  element: Element
) => {
  const decoration = createDecoration(type, data);
  const innerElement = getChildNodes(element)[0] as ContentNode;
  return htmlToNodes(rules, [...decorations, decoration])(innerElement);
};

const getChildNodes = (element: Element | DocumentFragment): ContentNode[] =>
  isLeaf(element) ? [] : (element.childNodes as ContentNode[]);

const visit = (rules: Rule[], decorations: Decoration[]) => (element: Element | DocumentFragment) =>
  pipe(element, getChildNodes, A.chain(htmlToNodes(rules, decorations)));

const traverse = (rules: Rule[]) => visit(rules, []);

const toRichContent = (nodes: Node[]): RichContent => ({ nodes, metadata: initializeMetadata() });

export default (rules: Rule[]) => flow(toAst, traverse(rules), toRichContent, RichContent.fromJSON);

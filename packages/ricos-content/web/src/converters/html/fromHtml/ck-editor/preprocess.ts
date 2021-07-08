import { flow } from 'fp-ts/function';
import { ChildNode, DocumentFragment, Element, Node, serialize } from 'parse5';
import { toAst, isText, isLeaf, hasDescendant, appendChild, partitionBy } from '../core/ast-utils';
import { not } from '../../../../fp-utils';

const addParagraph = (parentNode: Element) => (): ChildNode => ({
  nodeName: 'p',
  tagName: 'p',
  childNodes: [],
  parentNode,
  attrs: parentNode.attrs,
  namespaceURI: parentNode.namespaceURI,
});

// TODO: purify
const visit = (visitor: (node: ChildNode) => ChildNode) => (node: Node): Node => {
  if (isLeaf(node)) {
    return node;
  }
  const element = node as Element;
  element.childNodes = element.childNodes.map(visitor);
  element.childNodes.map(visit(visitor));
  return node;
};

const isBlock = (node: ChildNode): boolean => ['img', 'iframe', 'ol', 'ul'].includes(node.nodeName);

const isParagraph = (node: ChildNode): boolean => node.nodeName === 'p';

const isListItem = (node: ChildNode): boolean => ['ol', 'ul', 'li'].includes(node.nodeName);

// TODO: purify
const blockWrapParagraphToDiv = (node: Element): ChildNode => {
  if (isParagraph(node) && hasDescendant(isBlock)(node)) {
    node.nodeName = 'div';
    node.tagName = 'div';
    node.childNodes = partitionBy<ChildNode>(
      hasDescendant(isBlock),
      isParagraph,
      addParagraph(node),
      appendChild
    )(node.childNodes);
  }
  return node;
};

const leafParagraphToDiv = (node: Element): ChildNode =>
  isParagraph(node) && isLeaf(node) ? { ...node, nodeName: 'div', tagName: 'div' } : node;

// TODO: purify
const cleanListPadding = (node: Element): ChildNode => {
  if (isListItem(node)) {
    node.childNodes = node.childNodes.filter(not(isText));
  }
  return node;
};

const traverse = (visitor: (node: ChildNode) => ChildNode) => (root: DocumentFragment): Node =>
  visit(visitor)(root);

export const preprocess = flow(
  toAst,
  traverse(cleanListPadding),
  traverse(leafParagraphToDiv),
  traverse(blockWrapParagraphToDiv),
  serialize
);

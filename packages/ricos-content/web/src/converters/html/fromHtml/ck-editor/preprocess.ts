import { flow, pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import { MonoidAny } from 'fp-ts/boolean';
import { concatAll } from 'fp-ts/Monoid';
import {
  ChildNode,
  CommentNode,
  DocumentFragment,
  Element,
  Node,
  TextNode,
  parseFragment,
  serialize,
} from 'parse5';

const isText = (node: Node): node is TextNode => node.nodeName === '#text';
const isComment = (node: Node): node is CommentNode => node.nodeName === '#comment';

const isLeaf = (node: Node): boolean =>
  isText(node) || isComment(node) || (node as Element).childNodes.length === 0;

const not = (val: boolean) => !val;

const log = (tag: string) => (data: unknown) => {
  console.log(tag, data); // eslint-disable-line no-console
  return data;
};

const hasDescendant = (predicate: (child: Node) => boolean) => (node: Node): boolean =>
  predicate(node) ||
  (!isLeaf(node) &&
    pipe((node as Element).childNodes, A.map(hasDescendant(predicate)), concatAll(MonoidAny)));

const hasAscendant = (predicate: (parent: Node) => boolean) => (node: ChildNode): boolean =>
  node.parentNode &&
  (predicate(node.parentNode) || hasAscendant(predicate)(node.parentNode as Element));

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

const isBlock = (node: Node): boolean => ['img', 'iframe', 'ol', 'ul'].includes(node.nodeName);

const isParagraph = (node: Node): boolean => node.nodeName === 'p';

const isListItem = (node: Node): boolean => ['ol', 'ul', 'li'].includes(node.nodeName);

// TODO: purify
const blockWrapParagraphToDiv = (node: Element): ChildNode => {
  if (isParagraph(node) && hasDescendant(isBlock)(node)) {
    node.nodeName = 'div';
    node.tagName = 'div';
  }
  return node;
};

const leafParagraphToDiv = (node: Element): ChildNode =>
  isParagraph(node) && isLeaf(node) ? { ...node, nodeName: 'div', tagName: 'div' } : node;

// TODO: purify
const cleanListPadding = (node: Element): ChildNode => {
  if (isListItem(node)) {
    node.childNodes = node.childNodes.filter(flow(isText, not));
  }
  return node;
};

const traverse = (visitor: (node: ChildNode) => ChildNode) => (root: DocumentFragment): Node =>
  visit(visitor)(root);

const toAst = (html: string) => parseFragment(html);

export const preprocess = flow(
  toAst,
  traverse(cleanListPadding),
  traverse(leafParagraphToDiv),
  traverse(blockWrapParagraphToDiv),
  serialize
);

import { pipe, flow } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import { MonoidAny } from 'fp-ts/boolean';
import { concatAll } from 'fp-ts/Monoid';

import {
  parseFragment,
  ChildNode,
  DocumentFragment,
  Node,
  Element,
  TextNode,
  CommentNode,
  Attribute,
} from 'parse5';
import { equals } from '../../../../fp-utils';
import { ContentNode } from './models';

export type AstContext = {
  visit: (node: Element | DocumentFragment) => ContentNode;
};
export type AstRule = [(node: ContentNode) => boolean, (node: ContentNode) => ContentNode];
export const isText = (node: Node): node is TextNode => node.nodeName === '#text';
export const isComment = (node: Node): node is CommentNode => node.nodeName === '#comment';

export const isLeaf = (node: Node): boolean =>
  isText(node) || isComment(node) || (node as Element).childNodes.length === 0;

export const hasDescendant = (predicate: (child: Node) => boolean) => (node: Node): boolean =>
  !isLeaf(node) &&
  (pipe((node as Element).childNodes, A.map(predicate), concatAll(MonoidAny)) ||
    pipe((node as Element).childNodes, A.map(hasDescendant(predicate)), concatAll(MonoidAny)));

export const last = arr => (arr.length > 0 ? arr[arr.length - 1] : null);

export const partitionBy = <T>(
  isSeparator: (node: T) => boolean,
  isPartition: (node: T) => boolean,
  Partition: () => T,
  addToPartition: (partition, node: T) => void
) => (nodes: T[]): T[] =>
  nodes.reduce((partitions: T[], node: T) => {
    if (isSeparator(node)) {
      partitions.push(node);
    } else {
      let lastPartition = last(partitions);
      if (!lastPartition || !isPartition(lastPartition)) {
        const partition = Partition();
        partitions.push(partition);
        lastPartition = last(partitions);
      }
      addToPartition(lastPartition, node);
    }
    return partitions;
  }, []);

const toAttrs = (node: Element) => node.attrs;

type AttrRecord = Record<Attribute['name'], Attribute['value']>;

const toRecord = A.reduce({} as AttrRecord, (rec, { name, value }) => ({
  ...rec,
  [name]: value,
}));

export const getAttributes = flow(toAttrs, toRecord);

export const getChildNodes = (element: Element | DocumentFragment): ContentNode[] =>
  isLeaf(element) ? [] : (element.childNodes as ContentNode[]);

export const appendChild = (element: Element, node: ContentNode) => element.childNodes.push(node);

export const setParent = (parent: ContentNode) => (child: ContentNode) => ({
  ...child,
  parentNode: parent,
});

export const toDocumentFragment = (nodes: ChildNode[]): DocumentFragment => {
  const fragment: DocumentFragment = {
    nodeName: '#document-fragment' as DocumentFragment['nodeName'],
    childNodes: [] as ChildNode[],
  };
  fragment.childNodes = nodes.map(n => ({ ...n, parentNode: fragment }));
  return fragment;
};

export const toName = (node: ContentNode) => node.nodeName;

export const hasTag = (tag: string) => flow(toName, equals(S.Eq)(tag));

export const oneOf = (tags: string[]) => (node: ContentNode) =>
  pipe(tags, A.map(equals(S.Eq)(node.nodeName)), concatAll(MonoidAny));

export const toAst = (html: string) => parseFragment(html);

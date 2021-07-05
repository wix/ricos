import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import { MonoidAny } from 'fp-ts/boolean';
import { concatAll } from 'fp-ts/Monoid';
import { parseFragment, Node, Element, TextNode, CommentNode } from 'parse5';

export const isText = (node: Node): node is TextNode => node.nodeName === '#text';
export const isComment = (node: Node): node is CommentNode => node.nodeName === '#comment';

export const isLeaf = (node: Node): boolean =>
  isText(node) || isComment(node) || (node as Element).childNodes.length === 0;

export const not = <T>(predicate: (data: T) => boolean) => (data: T) => !predicate(data);

export const log = <T>(tag: string) => (data: T) => {
  console.log(tag, data); // eslint-disable-line no-console
  return data;
};

export const hasDescendant = (predicate: (child: Node) => boolean) => (node: Node): boolean =>
  predicate(node) ||
  (!isLeaf(node) &&
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

export const toAst = (html: string) => parseFragment(html);

import { findIndex } from 'lodash/fp';
import { RichContent, Node } from 'ricos-schema';

const fun = (data: unknown) => ({
  fold: fn => fn(data),
  map: fn => fun(fn(data)),
});

const append = (node: Node) => (content: RichContent) => ({
  ...content,
  nodes: [...content.nodes, node],
});

const inRange = (index?: number) => (content: RichContent) =>
  typeof index === 'number' && index >= 0 && index < content.nodes.length;

const keyExists = (nodeKey?: string) => (content: RichContent) =>
  content.nodes.some(({ key }) => key === nodeKey);

const insert = (node: Node, index: number) => (content: RichContent) => ({
  ...content,
  nodes: [...content.nodes.slice(0, index), node, ...content.nodes.slice(index)],
});

const insertByKey = (node: Node, nodeKey: string, isAfter?: boolean) => (content: RichContent) =>
  fun(content)
    .map(({ nodes }) => nodes)
    .map(findIndex(({ key }) => key === nodeKey))
    .fold(index => insert(node, isAfter ? index + 1 : index)(content));

export function addNode({
  node,
  index,
  before,
  after,
  content,
}: {
  node: Node;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
}): RichContent {
  const contentFn = fun(content);
  return fun([
    [() => contentFn.fold(inRange(index)), () => contentFn.fold(insert(node, <number>index))],
    [
      () => contentFn.fold(keyExists(before)),
      () => contentFn.fold(insertByKey(node, <string>before)),
    ],
    [
      () => contentFn.fold(keyExists(after)),
      () => contentFn.fold(insertByKey(node, <string>after, true)),
    ],
    [() => true, () => contentFn.fold(append(node))],
  ])
    .map(cases => cases.find(([predicate]) => predicate()))
    .fold(([, resolve]) => resolve());
}

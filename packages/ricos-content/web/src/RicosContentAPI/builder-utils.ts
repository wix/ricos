import { curry, compose, find, map, findIndex, has, isString, isArray } from 'lodash/fp';
import { RichContent, TextData, Node } from 'ricos-schema';

// functional stuff
const fun = (data: unknown) => ({
  fold: fn => fn(data),
  map: fn => fun(fn(data)),
});

const right = (data: unknown) => ({
  map: fn => right(fn(data)),
  fold: r => r(data),
});

const left = (data: unknown) => ({
  map: () => left(data),
  fold: (r, l) => l(data),
});

const either = predicate => data => {
  const res = predicate(data);
  return res ? right(data) : left(data);
};

const isIndexFound = either(i => i !== -1);

// content transformers
const appendNode = curry((node: Node, content: RichContent) => ({
  ...content,
  nodes: [...content.nodes, node],
}));

const insertNode = curry((node: Node, index: number, content: RichContent) => ({
  ...content,
  nodes: [...content.nodes.slice(0, index), node, ...content.nodes.slice(index)],
}));

const replaceNode = curry((node: Node, index: number, content: RichContent) => ({
  ...content,
  nodes: [...content.nodes.slice(0, index), node, ...content.nodes.slice(index + 1)],
}));

const insertNodeByKey = (node: Node, nodeKey: string, isAfter?: boolean) => (
  content: RichContent
) =>
  fun(content.nodes)
    .map(findIndex(({ key }) => key === nodeKey))
    .fold(index => insertNode(node, isAfter ? index + 1 : index)(content));

export const removeNode = (nodeKey: string, content: RichContent) => ({
  ...content,
  nodes: content.nodes.filter(({ key }) => key !== nodeKey),
});

// predicates
const keyExists = (nodeKey?: string) => (content: RichContent) =>
  content.nodes.some(({ key }) => key === nodeKey);

const indexInRange = (index?: number) => (content: RichContent) =>
  typeof index === 'number' && index >= 0 && index < content.nodes.length;

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
    [
      () => contentFn.fold(indexInRange(index)),
      () => contentFn.fold(insertNode(node, <number>index)),
    ],
    [
      () => contentFn.fold(keyExists(before)),
      () => contentFn.fold(insertNodeByKey(node, <string>before)),
    ],
    [
      () => contentFn.fold(keyExists(after)),
      () => contentFn.fold(insertNodeByKey(node, <string>after, true)),
    ],
    [() => true, () => contentFn.fold(appendNode(node))],
  ])
    .map(find(([predicate]) => predicate()))
    .fold(([, resolve]) => resolve());
}

// key is preserved
export function setNode({
  node,
  key: nodeKey,
  content,
}: {
  node: Node;
  key: string;
  content: RichContent;
}): RichContent {
  return isIndexFound(findIndex(({ key }) => key === nodeKey, content.nodes)).fold(
    index => replaceNode({ ...node, key: nodeKey }, index)(content),
    () => content
  );
}

// key and type are preserved
export function updateNode({
  node,
  key: nodeKey,
  content,
}: {
  node: Node;
  key: string;
  content: RichContent;
}): RichContent {
  return isIndexFound(
    findIndex(({ key, type }) => key === nodeKey && type === node.type, content.nodes)
  ).fold(
    index => replaceNode({ ...node, key: nodeKey }, index)(content),
    () => content
  );
}

const isTextData = text => has('text', text) && has('decorations', text);

const toArray = t => [t];

const toTextData = text => ({ text, decorations: [] });

export function toTextDataArray(text?: string | TextData | (string | TextData)[]): TextData[] {
  return fun([
    [() => isString(text), () => compose(toArray, toTextData)(text)],
    [() => isTextData(text), () => toArray(text)],
    [() => isArray(text), () => fun(text).fold(map(t => (isString(t) ? toTextData(t) : t)))],
    [() => true, () => []],
  ])
    .map(find(([predicate]) => predicate()))
    .fold(([, resolve]) => resolve());
}

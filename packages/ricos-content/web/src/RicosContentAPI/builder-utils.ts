import { isNil, find, map, findIndex, has, isString, isArray, isObject } from 'lodash/fp';
import { RichContent, TextData, Node } from 'ricos-schema';

const fun = (data: unknown) => ({
  fold: fn => fn(data),
  map: fn => fun(fn(data)),
});

const right = (data: unknown) => ({
  map: fn => right(fn(data)),
  fold: (l, r) => r(data),
});

const left = (data: unknown) => ({
  map: (/*fn*/) => left(data),
  fold: l => l(data),
});

const fromNullable = (data?: unknown) => (isNil(data) ? left(null) : right(data));

const combine = (f, g) => data => f(g(data));

const appendNode = (node: Node) => (content: RichContent) => ({
  ...content,
  nodes: [...content.nodes, node],
});

const indexInRange = (index?: number) => (content: RichContent) =>
  typeof index === 'number' && index >= 0 && index < content.nodes.length;

const keyExists = (nodeKey?: string) => (content: RichContent) =>
  content.nodes.some(({ key }) => key === nodeKey);

const insertNode = (node: Node, index: number) => (content: RichContent) => ({
  ...content,
  nodes: [...content.nodes.slice(0, index), node, ...content.nodes.slice(index)],
});

const replaceNode = (node: Node, index) => (content: RichContent) => ({
  ...content,
  nodes: [...content.nodes.slice(0, index), node, ...content.nodes.slice(index + 1)],
});

// key is preserved
const replaceNodeByKey = (node: Node, nodeKey: string) => (content: RichContent) => {
  return fromNullable(
    fun(content)
      .map(({ nodes }) => nodes)
      .map(findIndex(({ key }) => key === nodeKey))
  ).fold(
    () => content,
    index => replaceNode({ ...node, key: nodeKey }, index)(content)
  );
};

// key and type are preserved
const updateNodeByKey = (node: Node, nodeKey: string) => (content: RichContent) => {
  return fromNullable(
    fun(content)
      .map(({ nodes }) => nodes)
      .map(findIndex(({ key, type }) => key === nodeKey && type === node.type))
  ).fold(
    () => content,
    index => replaceNode({ ...node, key: nodeKey }, index)(content)
  );
};

const insertNodeByKey = (node: Node, nodeKey: string, isAfter?: boolean) => (
  content: RichContent
) =>
  fun(content)
    .map(({ nodes }) => nodes)
    .map(findIndex(({ key }) => key === nodeKey))
    .fold(index => insertNode(node, isAfter ? index + 1 : index)(content));

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

export function setNode({
  node,
  key,
  content,
}: {
  node: Node;
  key: string;
  content: RichContent;
}): RichContent {
  return fun(content).fold(replaceNodeByKey(node, key));
}

export function updateNode({
  node,
  key,
  content,
}: {
  node: Node;
  key: string;
  content: RichContent;
}): RichContent {
  return fun(content).fold(updateNodeByKey(node, key));
}

export const removeNode = (nodeKey: string, content: RichContent) => ({
  ...content,
  nodes: content.nodes.filter(({ key }) => key !== nodeKey),
});

const isTextData = text => isObject(text) && has('text', text) && has('decorations', text);

const toArray = t => [t];

const toTextData = text => ({ text, decorations: [] });

export function toTextDataArray(text?: string | TextData | (string | TextData)[]): TextData[] {
  const textFn = fun(text);
  return fun([
    [() => textFn.fold(isString), () => textFn.fold(combine(toArray, toTextData))],
    [() => textFn.fold(isTextData), () => textFn.fold(toArray)],
    [() => textFn.fold(isArray), () => textFn.fold(map(t => (isString(t) ? toTextData(t) : t)))],
    [() => true, () => []],
  ])
    .map(find(([predicate]) => predicate()))
    .fold(([, resolve]) => resolve());
}

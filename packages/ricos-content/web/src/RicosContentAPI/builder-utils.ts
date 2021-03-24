import { curry, compose, find, findIndex, has, isString, isArray } from 'lodash/fp';
import { RichContent, TextData, Node } from 'ricos-schema';

// functional stuff
const fun = (data: unknown) => ({
  map: fn => fun(fn(data)),
  fold: fn => fn(data),
});

const right = (data: unknown) => ({
  map: fn => right(fn(data)),
  fold: r => r(data),
});

const left = (data: unknown) => ({
  map: () => left(data),
  fold: (r, l) => l(data),
});

const either = curry((predicate, data) => (predicate(data) ? right(data) : left(data)));

const isIndexFound = either(index => index !== -1);

const switchCase = compose(
  ([, resolve]) => resolve(),
  find(([predicate]) => predicate())
);

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

const insertNodeByKey = (content: RichContent, node: Node, nodeKey: string, isAfter?: boolean) =>
  fun(content.nodes)
    .map(findIndex(({ key }) => key === nodeKey))
    .fold(index => insertNode(node, isAfter ? index + 1 : index)(content));

export const removeNode = (nodeKey: string, content: RichContent) => ({
  ...content,
  nodes: content.nodes.filter(({ key }) => key !== nodeKey),
});

// predicates
const keyExists = (content: RichContent, nodeKey?: string) =>
  content.nodes.some(({ key }) => key === nodeKey);

const indexInRange = (content: RichContent, index?: number) =>
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
  return switchCase([
    [() => indexInRange(content, index), () => insertNode(node, <number>index, content)],
    [() => keyExists(content, before), () => insertNodeByKey(content, node, <string>before)],
    [() => keyExists(content, after), () => insertNodeByKey(content, node, <string>after, true)],
    [() => true, () => appendNode(node, content)],
  ]);
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
  return switchCase([
    [() => isString(text), () => compose(toArray, toTextData)(text)],
    [() => isTextData(text), () => toArray(text)],
    [
      () => isArray(text),
      () => (<(string | TextData)[]>text).map(t => (isString(t) ? toTextData(t) : t)),
    ],
    [() => true, () => []],
  ]);
}

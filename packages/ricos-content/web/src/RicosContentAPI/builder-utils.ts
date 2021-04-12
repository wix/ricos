import {
  identity,
  merge,
  curry,
  compose,
  map,
  findIndex,
  has,
  isNumber,
  isString,
  isArray,
} from 'lodash/fp';
import { RichContent, TextData, Node } from 'ricos-schema';
import { task, either, firstResolved } from '../fp-utils';
import { PartialDeep } from '../types';

// predicates
const isIndexFound = either(index => index !== -1);

const isIndexInRange = either(
  ({ content, index }: { content: RichContent; index?: number }) =>
    isNumber(index) && index >= 0 && index < content.nodes.length
);

// content transformers
const appendNode = (node: Node, content: RichContent) =>
  task.of({
    ...content,
    nodes: [...content.nodes, node],
  });

const insertNode = curry((content: RichContent, node: Node, index: number) =>
  isIndexInRange({ content, index }).map(() => ({
    ...content,
    nodes: [...content.nodes.slice(0, index), node, ...content.nodes.slice(index)],
  }))
);

const replaceNode = curry((content: RichContent, node: Node, index: number) => ({
  ...content,
  nodes: [...content.nodes.slice(0, index), node, ...content.nodes.slice(index + 1)],
}));

const insertNodeByKey = (content: RichContent, node: Node, nodeKey: string, isAfter?: boolean) =>
  isIndexFound(findIndex(({ key }) => key === nodeKey, content.nodes))
    .map((index: number) => (isAfter ? index + 1 : index))
    .chain(insertNode(content, node));

export const removeNode = (nodeKey: string, content: RichContent) => ({
  ...content,
  nodes: content.nodes.filter(({ key }) => key !== nodeKey),
});

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
  return firstResolved([
    insertNode(content, node, <number>index),
    insertNodeByKey(content, node, <string>before),
    insertNodeByKey(content, node, <string>after, true),
    appendNode(node, content),
  ]);
}

export function setNode({
  node,
  key: nodeKey,
  content,
}: {
  node: Node;
  key: string;
  content: RichContent;
}): RichContent {
  return isIndexFound(findIndex(({ key }) => key === nodeKey, content.nodes)).fork(
    () => content,
    replaceNode(content, { ...node, key: nodeKey })
  );
}

export function toggleNodeType({
  node: sourceNode,
  key: nodeKey,
  canToggle = () => false,
  convert,
  content,
}: {
  node: PartialDeep<Node>;
  key: string;
  canToggle: ({
    sourceNode,
    targetNode,
  }: {
    sourceNode: PartialDeep<Node>;
    targetNode: Node;
  }) => boolean;
  convert: ({
    sourceNode,
    targetNode,
  }: {
    sourceNode: PartialDeep<Node>;
    targetNode: Node;
  }) => PartialDeep<Node>;
  content: RichContent;
}): RichContent {
  const isToggleable = either(canToggle);
  return isIndexFound(findIndex(({ key }) => key === nodeKey, content.nodes))
    .chain((index: number) => isToggleable({ targetNode: content.nodes[index], sourceNode }))
    .map(({ targetNode, sourceNode }) => convert({ targetNode, sourceNode }))
    .map((node: Node) => setNode({ node: { ...node, key: nodeKey }, key: nodeKey, content }))
    .fork(() => content, identity);
}

export function updateNode({
  node: mergedNode,
  key: nodeKey,
  content,
}: {
  node: PartialDeep<Node>;
  key: string;
  content: RichContent;
}): RichContent {
  return isIndexFound(
    findIndex(({ key, type }) => key === nodeKey && type === mergedNode.type, content.nodes)
  )
    .map((index: number) => merge(content.nodes[index], mergedNode))
    .map((node: Node) => setNode({ node: { ...node, key: nodeKey }, key: nodeKey, content }))
    .fork(() => content, identity);
}

const isTextData = text => has('text', text) && has('decorations', text);

const toArray = t => [t];

const toTextData = text => ({ text, decorations: [] });

export function toTextDataArray(text?: string | TextData | (string | TextData)[]): TextData[] {
  return firstResolved([
    either(isString, text).map(compose(toArray, toTextData)),
    either(isTextData, text).map(toArray),
    either(isArray, text).map(map(t => (isString(t) ? toTextData(t) : t))),
    task.of([]),
  ]);
}

import { identity, flow } from 'fp-ts/function';
import { RichContent, Node_Type, Node } from 'ricos-schema';
import { modify } from '../../../RicosContentAPI/modify';
import { extract } from '../../../RicosContentAPI/extract';
import { createNode, partitionBy } from '../../nodeUtils';

// scape goats
const decomposeListItems = (node: Node): Node[] =>
  partitionBy<Node>(
    ({ type }) => type !== Node_Type.PARAGRAPH,
    ({ type }) => type === Node_Type.BULLET_LIST,
    identity,
    () => createNode(Node_Type.BULLET_LIST, { nodes: [], data: {} }),
    (list, paragraph) =>
      list.nodes.push(createNode(Node_Type.LIST_ITEM, { nodes: [paragraph], data: {} }))
  )(node.nodes[0]?.nodes || []);

const getDecomposedListItems = (content: RichContent) =>
  modify(content)
    .filter(({ type }) => type === Node_Type.ORDERED_LIST)
    .set(decomposeListItems);

// ab haedis scindere oves
const splitLists = (node: Node): Node[] =>
  partitionBy<Node>(
    n => n.nodes.filter(({ type }) => type !== Node_Type.PARAGRAPH).length > 0,
    n => n.type === Node_Type.BULLET_LIST,
    n => createNode(Node_Type.ORDERED_LIST, { nodes: [n], data: {} }),
    () => createNode(Node_Type.BULLET_LIST, { nodes: [], data: {} }),
    (list, item) => list.nodes.push(item)
  )(node.nodes);

const getListToSplitKeys = content =>
  extract(content.nodes)
    .filter(({ type }) => type === Node_Type.BULLET_LIST || type === Node_Type.ORDERED_LIST)
    .map(({ key, nodes }) => ({ key, nodes: nodes.flatMap(n => n.nodes) }))
    .filter(
      ({ nodes }) =>
        nodes.filter(({ type }) => ![Node_Type.PARAGRAPH, Node_Type.TEXT].includes(type)).length > 0
    )
    .map(({ key }) => key)
    .get();

const getSplitLists = (content: RichContent) => {
  const listToSplitKeys = getListToSplitKeys(content);
  return modify(content)
    .filter(({ key }) => listToSplitKeys.includes(key))
    .set(splitLists);
};

const newLine: Node = {
  type: Node_Type.TEXT,
  key: '',
  nodes: [],
  textData: { text: '\n', decorations: [] },
};

const mergeAdjasentParagraphs = (node: Node): Node => ({
  ...node,
  nodes: partitionBy<Node>(
    ({ type }) => type !== Node_Type.PARAGRAPH,
    ({ type }) => type === Node_Type.PARAGRAPH,
    identity,
    node => ({ ...node, nodes: [] }),
    (pred, curr) =>
      (pred.nodes = pred.nodes.concat(pred.nodes.length > 0 ? [newLine] : []).concat(curr.nodes))
  )(node.nodes),
});

const mergeListParagraphNodes = (content: RichContent) =>
  modify(content)
    .filter(({ type }) => type === Node_Type.LIST_ITEM)
    .filter(({ nodes }) => nodes.length > 1)
    .set(mergeAdjasentParagraphs);

export default flow(mergeListParagraphNodes, getSplitLists, getDecomposedListItems);

import { flow, identity } from 'fp-ts/function';

import { RichContent, Node_Type, Node } from 'ricos-schema';
import { modify } from '../../../RicosContentAPI/modify';
import { extract } from '../../../RicosContentAPI/extract';
import { partitionBy } from '../../nodeUtils';
import { log } from '../../../fp-utils';

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
    node => ({ ...node, nodes: [] }),
    (pred, curr) =>
      (pred.nodes = pred.nodes.concat(pred.nodes.length > 0 ? [newLine] : []).concat(curr.nodes))
  )(node.nodes),
});

const splitLists = (node: Node): Node[] => [node];

export default content => {
  const listToSplitKeys = extract(content.nodes)
    .filter(({ type }) => type === Node_Type.BULLET_LIST || type === Node_Type.ORDERED_LIST)
    .map(({ key, nodes }) => ({ key, nodes: nodes.flatMap(n => n.nodes) }))
    .filter(
      ({ nodes }) =>
        nodes.filter(({ type }) => ![Node_Type.PARAGRAPH, Node_Type.TEXT].includes(type)).length > 0
    )
    .map(({ key }) => key)
    .get();

  const splitListsNodes = modify(content)
    .filter(({ key }) => listToSplitKeys.includes(key))
    .set(splitLists);

  const mergedParagraphNodes = modify(splitListsNodes)
    .filter(({ type }) => type === Node_Type.LIST_ITEM)
    .filter(({ nodes }) => nodes.length > 1)
    .set(mergeAdjasentParagraphs);

  return mergedParagraphNodes;
};

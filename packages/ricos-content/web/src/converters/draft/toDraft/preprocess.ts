import { identity, flow } from 'fp-ts/function';

import { Node_Type, Node } from 'ricos-schema';
import { modify } from '../../../RicosContentAPI/modify';
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
    identity,
    (pred, curr) => pred.nodes.concat([newLine, ...curr.nodes])
  )(node.nodes),
});

export default content =>
  modify(content.nodes)
    .filter(({ type }) => type === Node_Type.LIST_ITEM)
    .filter(({ nodes }) => nodes.length > 1)
    .set(
      flow(
        log('paragraphs', d => JSON.stringify(d, null, 2)),
        mergeAdjasentParagraphs,
        log('merged paragraphs', d => JSON.stringify(d, null, 2))
      )
    );

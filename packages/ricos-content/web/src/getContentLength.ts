import {
  DraftContent,
  RicosContentBlock,
  isDraftContent,
  isRichContent,
} from '../src/types/contentTypes';
import { RichContent, Node, TextData, Node_Type } from 'ricos-schema';
import { fromTraversable, Lens, Traversal } from 'monocle-ts';
import * as A from 'fp-ts/lib/Array';
import * as T from 'fp-ts/lib/Tree';

export function getContentLength(content: DraftContent): number;
export function getContentLength(content: RichContent): number;

export function getContentLength(content: RichContent | DraftContent): number {
  if (isDraftContent(content)) {
    return getDraftTextLength(content);
  } else if (isRichContent(content)) {
    return getRichContentTextLength(content);
  }
  return NaN;
}

function foldTextLength<T>(traversal: Traversal<T, string>, data: T) {
  return traversal
    .asFold()
    .getAll(data)
    .reduce((count, line) => count + line.length, 0);
}

function getRichContentTextLength(content: RichContent): number {
  const root = {
    key: 'root',
    type: Node_Type.PARAGRAPH,
    nodes: content.nodes,
  };
  const nodeTree = T.unfoldTree<Node, Node>(root, n => [n, n.nodes]);
  const nodeTraversal = fromTraversable(T.tree)<Node>();
  const textDataLens = Lens.fromNullableProp<Node>()('textData', { text: '', decorations: [] });
  const textLens = Lens.fromProp<TextData>()('text');
  return foldTextLength(nodeTraversal.composeLens(textDataLens).composeLens(textLens), nodeTree);
}

function getDraftTextLength(content: DraftContent): number {
  const blocksLens = Lens.fromProp<DraftContent>()('blocks');
  const blockTraversal = fromTraversable(A.array)<RicosContentBlock>();
  const textLens = Lens.fromProp<RicosContentBlock>()('text');
  return foldTextLength(blocksLens.composeTraversal(blockTraversal).composeLens(textLens), content);
}

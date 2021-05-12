import {
  DraftContent,
  RawRichContent,
  RicosContentBlock,
  isDraftContent,
  isRichContent,
} from '../src/types/contentTypes';
import { Node, TextData } from 'ricos-schema';
import { fromTraversable, Lens } from 'monocle-ts';
import { array } from 'fp-ts/lib/Array';

export function getContentLength(content: DraftContent): number;
export function getContentLength(content: RawRichContent): number;

export function getContentLength(content: RawRichContent | DraftContent): number {
  if (isDraftContent(content)) {
    return getDraftTextTraversal()
      .asFold()
      .getAll(content)
      .join('\n').length;
  } else if (isRichContent(content)) {
    const text = getRichContentTextTraversal()
      .asFold()
      .getAll(content)
      .join('\n');
    console.log(text); // eslint-disable-line no-console
    return text.length;
  }

  return NaN;
}

function getRichContentTextTraversal() {
  const nodeLens = Lens.fromProp<RawRichContent>()('nodes');
  const nodeTraversal = fromTraversable(array)<Node>();
  const nestedNodeLens = Lens.fromProp<Node>()('nodes');
  const textDataLens = Lens.fromNullableProp<Node>()('textData', { text: '', decorations: [] });
  const textLens = Lens.fromProp<TextData>()('text');
  return (
    nodeLens
      // .composeTraversal(nodeTraversal.filter(n => n.nodes.length > 0))
      // .composeLens(nestedNodeLens)
      .composeTraversal(nodeTraversal.filter(n => n.type === 'TEXT'))
      .composeLens(textDataLens)
      .composeLens(textLens)
  );
}

function getDraftTextTraversal() {
  const blocksLens = Lens.fromProp<DraftContent>()('blocks');
  const blockTraversal = fromTraversable(array)<RicosContentBlock>();
  const textLens = Lens.fromProp<RicosContentBlock>()('text');
  return blocksLens.composeTraversal(blockTraversal).composeLens(textLens);
}

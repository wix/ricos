import * as T from 'fp-ts/lib/Tree';
// import { flow } from 'fp-ts/lib/function';
import { Prism, fromTraversable, Traversal, Lens } from 'monocle-ts';
import { RichContent, Node, Node_Type } from 'ricos-schema';

export interface Extractor<DT> {
  filter: (predicate: (data: DT) => boolean) => Extractor<DT>;
  map: <MT>(mapper: (data: DT) => MT) => Extractor<MT>;
  get: () => Record<string, DT>;
}

function unfoldTree(content: RichContent) {
  const root = { key: 'root', type: Node_Type.PARAGRAPH, nodes: content.nodes };
  return T.unfoldTree<Node, Node>(root, n => [n, n.nodes]);
}

function mapWithKey<DT, MT>(mapper: (data: DT) => MT) {
  return data => ({ ...mapper(data), key: data.key });
}

class TraversalExtractor<DT> implements Extractor<DT> {
  traversal: Traversal<T.Tree<Node>, DT>;

  tree: T.Tree<Node>;

  constructor(traversal: Traversal<T.Tree<Node>, DT>, tree: T.Tree<Node>) {
    this.traversal = traversal;
    this.tree = tree;
  }

  filter(predicate: (data: DT) => boolean) {
    return new TraversalExtractor<DT>(
      this.traversal.composePrism(Prism.fromPredicate(predicate)),
      this.tree
    );
  }

  map<MT>(mapper: (data: DT) => MT) {
    return new TraversalExtractor<MT>(
      this.traversal.composePrism(Prism.fromPredicate(data => !!mapper(data))).composeLens(
        new Lens<DT, MT>(mapWithKey(mapper), () => (dt: DT) => dt)
      ),
      this.tree
    );
  }

  get() {
    return this.traversal
      .asFold()
      .getAll(this.tree)
      .reduce((map, entry: DT & { key: string }) => {
        const { key, ...rest } = entry;
        return { ...map, [key]: { ...rest } };
      }, {});
  }
}

export function extract(content: RichContent): Extractor<Node> {
  const tree = unfoldTree(content);
  const traversal = fromTraversable(T.tree)<Node>();
  return new TraversalExtractor<Node>(traversal, tree);
}

import * as T from 'fp-ts/lib/Tree';
import { Prism, fromTraversable, Traversal, Lens } from 'monocle-ts';
import { RichContent, Node, Node_Type } from 'ricos-schema';

export interface Extractor<DT> {
  filter: (predicate: (data: DT) => boolean) => Extractor<DT>;
  map: <MT>(mapper: (data: DT) => MT) => Extractor<MT>;
  get: () => DT[];
}

const unfoldTree = (content: RichContent) =>
  T.unfoldTree<Node, Node>({ key: 'root', type: Node_Type.PARAGRAPH, nodes: content.nodes }, n => [
    n,
    n.nodes,
  ]);

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
      this.traversal.composeLens(
        new Lens<DT, MT>(mapper, () => (dt: DT) => dt)
      ),
      this.tree
    );
  }

  get() {
    return this.traversal.asFold().getAll(this.tree);
  }
}

export const extract = (content: RichContent): Extractor<Node> =>
  new TraversalExtractor<Node>(fromTraversable(T.tree)<Node>(), unfoldTree(content));

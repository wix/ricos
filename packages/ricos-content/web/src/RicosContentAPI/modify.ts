import * as T from 'fp-ts/lib/Tree';
import { compact, isArray } from 'lodash';
import { Prism, fromTraversable, Traversal } from 'monocle-ts';
import { RichContent, Node, Node_Type } from 'ricos-schema';

export interface Modifier {
  filter: (pred: (node: Node) => boolean) => Modifier;
  set: (setter: (node: Node) => Node | Node[]) => RichContent;
}

const unfoldTree = (nodes: Node | Node[]) => {
  const root = isArray(nodes) ? { key: 'root', type: Node_Type.UNRECOGNIZED, nodes } : nodes;
  return T.unfoldTree<Node, Node>(root, n => [n, n.nodes]);
};

class TraversalModifier implements Modifier {
  content: RichContent;

  traversal: Traversal<T.Tree<Node>, Node>;

  tree: T.Tree<Node>;

  constructor(traversal: Traversal<T.Tree<Node>, Node>, tree: T.Tree<Node>, content: RichContent) {
    this.traversal = traversal;
    this.content = content;
    this.tree = tree;
  }

  filter(predicate: (node: Node) => boolean) {
    return new TraversalModifier(
      this.traversal.composePrism(Prism.fromPredicate(predicate)),
      this.tree,
      this.content
    );
  }

  set(setter: (node: Node) => Node | Node[]) {
    // this.traversal.modify(setter);
    const selectedKeys = compact(this.traversal.asFold().getAll(this.tree)).map(({ key }) => key);
    const cleverFold = T.fold<Node, Node>((value, forest) => {
      const nodes = forest.reduce((prev, curr) => {
        const leaf = selectedKeys.includes(curr.key) ? setter(curr) : curr;
        const item = isArray(leaf) ? leaf : [leaf];
        return [...prev, ...item];
      }, [] as Node[]) as Node[];
      value.nodes = nodes;
      return value;
    });
    const root = cleverFold(this.tree);
    return { ...this.content, nodes: root.nodes };
  }
}

export const modify = (content: RichContent): Modifier =>
  new TraversalModifier(fromTraversable(T.tree)<Node>(), unfoldTree(content.nodes), content);

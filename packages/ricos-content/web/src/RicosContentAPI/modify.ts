import * as T from 'fp-ts/lib/Tree';
import { compact, isArray } from 'lodash';
import { Prism, fromTraversable, Traversal } from 'monocle-ts';
import { RichContent, Node, Node_Type } from 'ricos-schema';

type ModifierSetter = (node: Node) => Node | Node[];
export interface Modifier {
  filter: (pred: (node: Node) => boolean) => Modifier;
  set: (setter: ModifierSetter) => RichContent;
}

const unfoldTree = (nodes: Node | Node[]) => {
  const root = isArray(nodes) ? { key: 'root', type: Node_Type.UNRECOGNIZED, nodes } : nodes;
  return T.unfoldTree<Node, Node>(root, n => [n, n.nodes]);
};

const foldTree = (tree: T.Tree<Node>, setter: ModifierSetter, keysToSet: string[]) =>
  T.fold<Node, Node>((value, forest) => {
    const nodes = forest.reduce((prev, curr) => {
      const mapped = keysToSet.includes(curr.key) ? setter(curr) : curr;
      const item = isArray(mapped) ? mapped : [mapped];
      return [...prev, ...item];
    }, [] as Node[]);
    value.nodes = nodes;
    return value;
  })(tree);

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

  set(setter: ModifierSetter) {
    const keysToSet = compact(this.traversal.asFold().getAll(this.tree)).map(({ key }) => key);
    const root = foldTree(this.tree, setter, keysToSet);
    return { ...this.content, nodes: root.nodes };
  }
}

export const modify = (content: RichContent): Modifier =>
  new TraversalModifier(fromTraversable(T.tree)<Node>(), unfoldTree(content.nodes), content);

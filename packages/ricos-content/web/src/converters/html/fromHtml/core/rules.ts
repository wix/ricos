import { flow, pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import { Eq } from 'fp-ts/Eq';
import { MonoidAny } from 'fp-ts/boolean';
import { concatAll } from 'fp-ts/Monoid';

import { TextNode, Element } from 'parse5';
import { Node_Type, Decoration_Type } from 'ricos-schema';
import { isText } from './ast-utils';
import { Rule, ContentNode } from './models';
import {
  createTextNode,
  createParagraphNode,
  createHeadingNode,
  createNode,
  createLinkData,
  reduceDecorations,
} from '../../../nodeUtils';

const toName = (node: ContentNode) => node.nodeName;

const equals = <T>(E: Eq<T>) => (lhs: T) => (rhs: T) => E.equals(lhs, rhs);

const hasTag = (tag: string) => flow(toName, equals(S.Eq)(tag));

const oneOf = (tags: string[]) => (node: ContentNode) =>
  pipe(tags, A.map(equals(S.Eq)(node.nodeName)), concatAll(MonoidAny));

export const textToText: Rule = {
  _if: isText,
  _then: (context, decorations, node: TextNode) => [
    createTextNode(node.value, reduceDecorations(decorations)),
  ],
};

export const pToParagraph: Rule = {
  _if: hasTag('p'),
  _then: (context, decorations, node) => [createParagraphNode(context.traverse(node, decorations))],
};

export const hToHeading: Rule = {
  _if: flow(toName, /h[1-6]/.test),
  _then: (context, decorations, node) => [
    createHeadingNode(context.traverse(node, decorations), {
      level: Number(node.nodeName.replace('h', '')),
    }),
  ],
};

export const aToLink: Rule = {
  _if: hasTag('a'),
  _then: (context, decorations, node: Element) =>
    context.addDecoration(node, decorations, Decoration_Type.LINK, createLinkData(node)),
};

export const lToList: Rule = {
  _if: oneOf(['ul', 'ol', 'li']),
  _then: (context, decorations, node) => [
    createNode(
      {
        ul: Node_Type.BULLET_LIST,
        ol: Node_Type.ORDERED_LIST,
        li: Node_Type.LIST_ITEM,
      }[node.nodeName],
      context.traverse(node, decorations)
    ),
  ],
};

export const strongEmUToDecoration: Rule = {
  _if: oneOf(['strong', 'em', 'u']),
  _then: (context, decorations, node) =>
    context.addDecoration(
      node,
      decorations,
      { strong: Decoration_Type.BOLD, em: Decoration_Type.ITALIC, u: Decoration_Type.UNDERLINE }[
        node.nodeName
      ]
    ),
};

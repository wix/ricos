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
} from '../../../nodeUtils';

const toName = (node: ContentNode) => node.nodeName;

const equals = <T>(E: Eq<T>) => (lhs: T) => (rhs: T) => E.equals(lhs, rhs);

const hasTag = (tag: string) => flow(toName, equals(S.Eq)(tag));

const oneOf = (tags: string[]) => (node: ContentNode) =>
  pipe(tags, A.map(equals(S.Eq)(node.nodeName)), concatAll(MonoidAny));

export const textToText: Rule = [
  isText,
  context => (node: TextNode) => [createTextNode(node.value, context.decorations)],
];

export const pToParagraph: Rule = [
  hasTag('p'),
  context => (node: Element) => [createParagraphNode(context.visit(node))],
];

export const hToHeading: Rule = [
  flow(toName, /h[1-6]/.test.bind(/h[1-6]/)),
  context => (node: Element) => [
    createHeadingNode(context.visit(node), {
      level: Number(node.nodeName.replace('h', '')),
    }),
  ],
];

export const aToLink: Rule = [
  hasTag('a'),
  context => (node: Element) =>
    context.addDecoration(Decoration_Type.LINK, createLinkData(node), node),
];

export const lToList: Rule = [
  oneOf(['ul', 'ol', 'li']),
  context => (node: Element) => [
    createNode(
      {
        ul: Node_Type.BULLET_LIST,
        ol: Node_Type.ORDERED_LIST,
        li: Node_Type.LIST_ITEM,
      }[node.nodeName],
      context.visit(node)
    ),
  ],
];

export const strongEmUToDecoration: Rule = [
  oneOf(['strong', 'em', 'u']),
  context => (node: Element) =>
    context.addDecoration(
      { strong: Decoration_Type.BOLD, em: Decoration_Type.ITALIC, u: Decoration_Type.UNDERLINE }[
        node.nodeName
      ],
      {},
      node
    ),
];

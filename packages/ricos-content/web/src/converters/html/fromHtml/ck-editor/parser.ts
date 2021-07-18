import { identity, pipe, flow } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import * as E from 'fp-ts/Either';
import * as R from 'fp-ts/Record';
import * as O from 'fp-ts/Option';

import {
  Link,
  Decoration_Type,
  VideoData,
  Node_Type,
  TextStyle_TextAlignment,
  TextStyle,
  PluginContainerData,
  PluginContainerData_Alignment,
} from 'ricos-schema';
import { TextNode, Element } from 'parse5';
import { getMatches, toUpperCase, replace, split } from '../../../../fp-utils';
import { createNode, createLink, createHeadingNode, createParagraphNode } from '../../../nodeUtils';
import { hasTag, getAttributes, toName } from '../core/ast-utils';
import { preprocess } from './preprocess';
import parse from '../core/parser';
import {
  pToParagraph,
  lToList,
  hToHeading,
  strongEmUToDecoration,
  aToLink,
  textToText,
  imgToImage,
  identityRule,
} from '../core/rules';
import { Rule, ContainerStyle } from '../core/models';

const toURL = (str: string) =>
  E.tryCatch(
    () => new URL(str),
    () => 'invalid URL string'
  );

const getVideoId = (url: URL): E.Either<string, string> =>
  url.host.includes('youtube') && url.pathname.includes('/embed/')
    ? E.right(url.pathname.replace('/embed/', ''))
    : E.left('not a youtube source');

const toYoutubeWatchUrl = flow(
  toURL,
  E.chain(getVideoId),
  E.fold(identity, id => `https://www.youtube.com/watch?v=${id}`)
);

const toVideoData = flow(
  getAttributes,
  ({ src }) => ({ video: { src: { url: toYoutubeWatchUrl(src) } } } as VideoData)
);

const iframeToVideo: Rule = [
  hasTag('iframe'),
  () => (node: Element) => [
    createNode(Node_Type.VIDEO, { nodes: [], data: { ...toVideoData(node) } }), // TODO: add PluginContainerData
  ],
];

const traverseDiv: Rule = [hasTag('div'), identityRule[1]]; // TODO: add PluginContainerData or style

const noEmptyLineText: Rule = [
  node => textToText[0](node) && (node as TextNode).value !== '\n',
  textToText[1],
];

const parseNavigationData = flow(
  replace(/~#~/g, '"'),
  d =>
    E.tryCatch(
      () => JSON.parse(d),
      () => d
    ),
  E.fold(identity, identity)
);

const toCustomData = flow(
  getMatches(/Wix\.(.+)\('(.+)'\)/),
  E.fromOption(() => 'failed to parse custom link onclick'),
  E.map(([, method, data]: string[]) => ({ method, data: parseNavigationData(data) })),
  E.map(JSON.stringify),
  E.fold(identity, identity)
);

const getData = (onclick?: string): Record<string, string> =>
  onclick?.startsWith('Wix.') ? { customData: toCustomData(onclick) } : {};

const mergeData = (onclick?: string) => (link: Link): Link => ({ ...link, ...getData(onclick) });

const createCustomLink = ({ url, onclick, ...rest }: Record<string, string>): Link =>
  pipe({ url, ...rest }, createLink, mergeData(onclick));

const aToCustomLink: Rule = [
  aToLink[0],
  context => (node: Element) => {
    const attrs = getAttributes(node);
    return context.addDecoration(
      Decoration_Type.LINK,
      { linkData: { link: createCustomLink({ ...attrs, url: attrs.href }) } },
      node
    );
  },
];

type Alignment = 'LEFT' | 'RIGHT' | 'CENTER' | '';

const toContainerStyle = (alignment: Alignment): ContainerStyle => ({ alignment });

const toTextStyle = (alignment: Alignment): TextStyle => ({
  textAlignment: alignment as TextStyle_TextAlignment,
});

const toPluginContainerData = (align: Alignment) => ({
  alignment: align as PluginContainerData_Alignment,
});

const getAlignment = flow(
  R.lookup('class'),
  O.map(split(' ')),
  O.map(A.filter(c => ['align-left', 'align-right', 'align-center'].includes(c))),
  O.chain(A.head),
  O.map(replace('align-', '')),
  O.map(toUpperCase),
  O.fold(
    () => <Alignment>'',
    a => <Alignment>a
  )
);

const alignClassToStyle: Rule = [
  flow(getAttributes, getAlignment, Boolean),
  context => (node: Element) =>
    pipe(node, getAttributes, getAlignment, toContainerStyle, context.setStyle(node)),
];

const pToAlignedParagraph: Rule = [
  pToParagraph[0],
  context => (node: Element) =>
    alignClassToStyle[0](node)
      ? [
          createParagraphNode(context.visit(node), {
            textStyle: pipe(node, getAttributes, getAlignment, toTextStyle),
          }),
        ]
      : pToParagraph[1](context)(node),
];

const hToAlignedHeading: Rule = [
  hToHeading[0],
  context => (node: Element) =>
    alignClassToStyle[0](node)
      ? [
          createHeadingNode(context.visit(node), {
            level: pipe(node, toName, replace('h', ''), Number),
            textStyle: pipe(node, getAttributes, getAlignment, toTextStyle),
          }),
        ]
      : hToHeading[1](context)(node),
];

export default flow(
  preprocess,
  parse([
    noEmptyLineText,
    pToAlignedParagraph,
    lToList,
    hToAlignedHeading,
    aToCustomLink,
    strongEmUToDecoration,
    iframeToVideo,
    imgToImage, // TODO: add PluginContainerData
    traverseDiv,
  ])
);

import { identity, pipe, flow } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

import { Link, Decoration_Type, VideoData, Node_Type } from 'ricos-schema';
import { TextNode, Element } from 'parse5';
import { getMatches, replace, log } from '../../../../fp-utils';
import { createNode, createLink } from '../../../nodeUtils';
import { hasTag, getAttributes } from '../core/ast-utils';
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
import { Rule } from '../core/models';

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
  () => (node: Element) => [createNode(Node_Type.VIDEO, { nodes: [], data: toVideoData(node) })],
];

const traverseDiv: Rule = [hasTag('div'), identityRule[1]];

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

export default flow(
  preprocess,
  parse([
    noEmptyLineText,
    pToParagraph,
    lToList,
    hToHeading,
    aToCustomLink,
    strongEmUToDecoration,
    iframeToVideo,
    imgToImage,
    traverseDiv,
  ])
);

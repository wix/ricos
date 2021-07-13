import { identity, pipe, flow } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

import { Link, Decoration_Type, VideoData, Node_Type } from 'ricos-schema';
import { TextNode, Element } from 'parse5';
import { getMatches, replace } from '../../../../fp-utils';
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
// import { log } from '../../../../fp-utils';

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
  ({ src }) =>
    ({
      video: { src: { url: toYoutubeWatchUrl(src) } },
    } as VideoData)
);

const iframeToVideo: Rule = [
  hasTag('iframe'),
  () => (node: Element) => [
    createNode(Node_Type.VIDEO, {
      nodes: [],
      data: toVideoData(node),
    }),
  ],
];

const traverseDiv: Rule = [hasTag('div'), identityRule[1]];

const noEmptyLineText: Rule = [
  node => textToText[0](node) && (node as TextNode).value !== '\n',
  textToText[1],
];

const toCustomData = flow(
  getMatches(/Wix\.(.+)\('(.+)'\)/),
  O.map(([, method, data]: string[]) => ({ method, data })),
  O.map(({ method, data }) => ({ method, data: pipe(data, replace(/~#~/g, '"'), JSON.parse) })),
  O.map(JSON.stringify),
  O.fold(() => 'failed to parse custom data', identity)
);

const getSrc = (onclick: string, url: string): Record<string, string> =>
  url.startsWith('javascript:') && onclick.startsWith('Wix.')
    ? { customData: toCustomData(onclick) }
    : {};

const mergeSrc = (onclick: string, url: string) => (link: Link): Link => ({
  ...link,
  ...getSrc(onclick, url),
});

const createCustomLink = ({ url, onclick, ...rest }: Record<string, string>): Link =>
  pipe({ url, ...rest }, createLink, mergeSrc(onclick, url));

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

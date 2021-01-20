import { RicosNode, VideoSource } from 'ricos-schema';
import { getImageSrc } from '../imageUtils';
import { LINK_TYPE } from '../consts';
import { NodeType } from '../migrateSchema/consts';
import { mergeTextNodes, RangedDecoration } from '../migrateSchema/toDraft/decorationParsers';

export const parseTextNodes = (node: RicosNode) => {
  const {
    text,
    decorationMap: { [LINK_TYPE]: linkDecorations },
  } = mergeTextNodes(node.nodes);
  const textWithLinks = addLinksToText(text, linkDecorations);
  return removeTrailingNewLine(textWithLinks);
};

const getListSymbol = (index: number, type: string) =>
  type === NodeType.OrderedList ? index + 1 + '. ' : '• ';

const parseList = (listNode: RicosNode): { type: string; item: string }[] =>
  listNode.nodes
    .map(({ nodes: [paragraph, childNode] }) => {
      return [
        { type: listNode.type, item: parseTextNodes(paragraph) },
        childNode ? parseList(childNode) : [],
      ];
    })
    .flat(2);

export const parseListNode = (node: RicosNode) =>
  parseList(node)
    .map(({ type, item }, index) => getListSymbol(index, type) + item)
    .join('\n');

export const addLinksToText = (text: string, linkDecorations: RangedDecoration[] = []) =>
  linkDecorations
    .sort((a, b) => a.end - b.end)
    .reduce(
      (newText, link) =>
        insertInText(
          newText,
          link.end + newText.length - text.length + 1,
          `(${link.ricosLink?.url})`
        ),
      text
    );

const insertInText = (text: string, pos: number, insertedText: string) =>
  text.substring(0, pos) + insertedText + text.substring(pos);

const removeTrailingNewLine = (text: string) =>
  text.endsWith('\n') ? text.substring(0, text.length - 1) : text;

export const parseImage = async (
  { ricosImage }: RicosNode,
  urlShortener?: (url: string) => Promise<string>
): Promise<string> => {
  const { caption } = ricosImage?.metadata || {};
  const { fileName, width, height } = ricosImage?.src || {};
  const imageUrlOptions = Object.assign(
    {
      imageType: 'highRes',
      requiredQuality: 90,
    },
    width && { requiredWidth: width },
    height && { requiredHeight: height }
  );
  let url: string = getImageSrc({ file_name: fileName }, undefined, imageUrlOptions);
  if (urlShortener) {
    url = await urlShortener(url);
  }
  return [caption, url].filter(Boolean).join('\n');
};

const getDefaultVideoUrl = async (src: VideoSource) =>
  `https://video.wixstatic.com/${src.pathname}`;

export const parseVideo = async (
  { ricosVideo }: RicosNode,
  getVideoUrl: (src: VideoSource) => Promise<string> = getDefaultVideoUrl
): Promise<string> => {
  const { src, url } = ricosVideo || {};
  const text = src ? getVideoUrl(src) : url;
  return text || '';
};

export const parseSoundCloud = ({ ricosSoundCloud }: RicosNode): string => {
  const { src } = ricosSoundCloud || {};
  return src || '';
};

export const parseGiphy = ({ ricosGiphy }: RicosNode): string => {
  const { originalUrl } = ricosGiphy?.gif || {};
  return originalUrl || '';
};

export const parseMap = ({ ricosMap }: RicosNode): string => {
  const { address } = ricosMap?.mapSettings || {};
  return address || '';
};

export const parseVerticalEmbed = ({ ricosVerticalEmbed }: RicosNode): string => {
  const { html, name } = ricosVerticalEmbed?.selectedProduct || {};
  const href = html
    ?.replace(/.*href="/g, '')
    .replace(/.*=http/g, 'http')
    .replace(/" .*/g, '');
  return [name, href].filter(Boolean).join('\n');
};

export const parseLinkPreview = ({ ricosLinkPreview }: RicosNode): string => {
  const { url } = ricosLinkPreview?.config.link || {};
  return url || '';
};

import { Node, Node_Type, VideoSource } from 'ricos-schema';
import { getImageSrc } from '../../../imageUtils';
import { LINK_TYPE } from '../../../consts';
import { mergeTextNodes, RangedDecoration } from '../../draft/toDraft/decorationParsers';

export const parseTextNodes = (node: Node) => {
  const {
    text,
    decorationMap: { [LINK_TYPE]: linkDecorations },
  } = mergeTextNodes(node.nodes);
  const textWithLinks = addLinksToText(text, linkDecorations);
  return removeTrailingNewLine(textWithLinks);
};

const getListSymbol = (index: number, type: Node_Type) =>
  type === Node_Type.ORDERED_LIST ? index + 1 + '. ' : '• ';

const parseList = (listNode: Node): { type: Node_Type; item: string }[] =>
  listNode.nodes
    .map(({ nodes: [paragraph, childNode] }) => {
      return [
        { type: listNode.type, item: parseTextNodes(paragraph) },
        childNode ? parseList(childNode) : [],
      ];
    })
    .flat(2);

export const parseListNode = (node: Node) =>
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
          `(${link.linkData?.url})`
        ),
      text
    );

const insertInText = (text: string, pos: number, insertedText: string) =>
  text.substring(0, pos) + insertedText + text.substring(pos);

const removeTrailingNewLine = (text: string) =>
  text.endsWith('\n') ? text.substring(0, text.length - 1) : text;

export const parseImage = async (
  { imageData }: Node,
  urlShortener?: (url: string) => Promise<string>
): Promise<string> => {
  const { caption } = imageData?.metadata || {};
  const { fileName, width, height } = imageData?.src || {};
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
  { videoData }: Node,
  getVideoUrl: (src: VideoSource) => Promise<string> = getDefaultVideoUrl
): Promise<string> => {
  const { src, url } = videoData || {};
  const text = src ? getVideoUrl(src) : url;
  return text || '';
};

export const parseSoundCloud = ({ soundCloudData }: Node): string => {
  const { src } = soundCloudData || {};
  return src || '';
};

export const parseGiphy = ({ giphyData }: Node): string => {
  const { originalUrl } = giphyData?.gif || {};
  return originalUrl || '';
};

export const parseMap = ({ mapData }: Node): string => {
  const { address } = mapData?.mapSettings || {};
  return address || '';
};

export const parseVerticalEmbed = ({ verticalEmbedData }: Node): string => {
  const { html, name } = verticalEmbedData?.selectedProduct || {};
  const href = html
    ?.replace(/.*href="/g, '')
    .replace(/.*=http/g, 'http')
    .replace(/" .*/g, '');
  return [name, href].filter(Boolean).join('\n');
};

export const parseLinkPreview = ({ linkPreviewData }: Node): string => {
  const { url } = linkPreviewData?.config?.link || {};
  return url || '';
};

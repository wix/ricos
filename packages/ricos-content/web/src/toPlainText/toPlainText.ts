import { RicosContent, VideoSource } from 'ricos-schema';
import { RicosContent as RicosDraftContent } from 'wix-rich-content-common';
import {
  RICOS_IMAGE_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_GIPHY_TYPE,
  RICOS_MAP_TYPE,
  RICOS_VERTICAL_EMBED_TYPE,
  RICOS_LINK_PREVIEW_TYPE,
  RICOS_SOUND_CLOUD_TYPE,
} from '../consts';
import { getParagraphNode } from '../migrateSchema/toDraft/decorationParsers';
import {
  parseGiphy,
  parseImage,
  parseLinkPreview,
  parseListNode,
  parseMap,
  parseSoundCloud,
  parseTextNodes,
  parseVerticalEmbed,
  parseVideo,
} from './convertNodes';
import { NodeType } from '../migrateSchema/consts';
import { fromDraft } from '../migrateSchema';

interface PlainTextOptions {
  urlShortener?: (url: string) => Promise<string>;
  getVideoUrl?: (src: VideoSource) => Promise<string>;
}

export const toPlainText = async (
  content: RicosContent | RicosDraftContent,
  options?: PlainTextOptions
): Promise<string> => {
  let ricosContent = content;
  if ('blocks' in ricosContent) {
    ricosContent = fromDraft(ricosContent);
  }
  const {
    doc: { nodes },
  } = ricosContent;
  let plainText = '';

  const parseNodes = async (index = 0) => {
    const node = nodes[index];
    if (node) {
      if (index > 0) {
        plainText += '\n';
      }
      switch (node.type) {
        case NodeType.CodeBlock:
        case NodeType.Paragraph:
        case NodeType.Heading:
          plainText += parseTextNodes(node);
          break;
        case NodeType.Blockquote:
          plainText += parseTextNodes(getParagraphNode(node));
          break;
        case NodeType.OrderedList:
        case NodeType.UnorderedList:
          plainText += parseListNode(node);
          break;
        case RICOS_IMAGE_TYPE:
          plainText += await parseImage(node, options?.urlShortener);
          break;
        case RICOS_VIDEO_TYPE:
          plainText += await parseVideo(node, options?.getVideoUrl);
          break;
        case RICOS_SOUND_CLOUD_TYPE:
          plainText += parseSoundCloud(node);
          break;
        case RICOS_GIPHY_TYPE:
          plainText += parseGiphy(node);
          break;
        case RICOS_MAP_TYPE:
          plainText += parseMap(node);
          break;
        case RICOS_VERTICAL_EMBED_TYPE:
          plainText += parseVerticalEmbed(node);
          break;
        case RICOS_LINK_PREVIEW_TYPE:
          plainText += parseLinkPreview(node);
          break;
        default:
      }
      await parseNodes(index + 1);
    }
  };

  await parseNodes();

  return plainText;
};

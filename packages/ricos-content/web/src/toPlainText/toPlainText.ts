import { Node_Type, RichContent, VideoSource } from 'ricos-schema';
import { RicosContent } from '..';
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
import { ensureRicosContent } from '../migrateSchema';

interface PlainTextOptions {
  urlShortener?: (url: string) => Promise<string>;
  getVideoUrl?: (src: VideoSource) => Promise<string>;
}

export const toPlainText = async (
  content: RichContent | RicosContent,
  options?: PlainTextOptions
): Promise<string> => {
  const ricosContent = RichContent.fromJSON(ensureRicosContent(content));
  const { nodes } = ricosContent;
  let plainText = '';

  const parseNodes = async (index = 0) => {
    const node = nodes[index];
    if (node) {
      if (index > 0) {
        plainText += '\n';
      }
      switch (node.type) {
        case Node_Type.CODEBLOCK:
        case Node_Type.PARAGRAPH:
        case Node_Type.HEADING:
          plainText += parseTextNodes(node);
          break;
        case Node_Type.BLOCKQUOTE:
          plainText += parseTextNodes(getParagraphNode(node));
          break;
        case Node_Type.ORDERED_LIST:
        case Node_Type.BULLET_LIST:
          plainText += parseListNode(node);
          break;
        case Node_Type.IMAGE:
          plainText += await parseImage(node, options?.urlShortener);
          break;
        case Node_Type.VIDEO:
          plainText += await parseVideo(node, options?.getVideoUrl);
          break;
        case Node_Type.SOUND_CLOUD:
          plainText += parseSoundCloud(node);
          break;
        case Node_Type.GIPHY:
          plainText += parseGiphy(node);
          break;
        case Node_Type.MAP:
          plainText += parseMap(node);
          break;
        case Node_Type.VERTICAL_EMBED:
          plainText += parseVerticalEmbed(node);
          break;
        case Node_Type.LINK_PREVIEW:
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

import { rich_content } from 'ricos-schema';
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
  getVideoUrl?: (src: rich_content.VideoSource) => Promise<string>;
}

export const toPlainText = async (
  content: rich_content.RichContent | RicosContent,
  options?: PlainTextOptions
): Promise<string> => {
  const ricosContent = rich_content.RichContent.fromObject(ensureRicosContent(content));
  const { nodes } = ricosContent;
  let plainText = '';

  const parseNodes = async (index = 0) => {
    const node = nodes[index];
    if (node) {
      if (index > 0) {
        plainText += '\n';
      }
      switch (node.type) {
        case rich_content.Node.Type.CODEBLOCK:
        case rich_content.Node.Type.PARAGRAPH:
        case rich_content.Node.Type.HEADING:
          plainText += parseTextNodes(node);
          break;
        case rich_content.Node.Type.BLOCKQUOTE:
          plainText += parseTextNodes(getParagraphNode(node));
          break;
        case rich_content.Node.Type.ORDERED_LIST:
        case rich_content.Node.Type.BULLET_LIST:
          plainText += parseListNode(node);
          break;
        case rich_content.Node.Type.IMAGE:
          plainText += await parseImage(node, options?.urlShortener);
          break;
        case rich_content.Node.Type.VIDEO:
          plainText += await parseVideo(node, options?.getVideoUrl);
          break;
        case rich_content.Node.Type.SOUND_CLOUD:
          plainText += parseSoundCloud(node);
          break;
        case rich_content.Node.Type.GIPHY:
          plainText += parseGiphy(node);
          break;
        case rich_content.Node.Type.MAP:
          plainText += parseMap(node);
          break;
        case rich_content.Node.Type.VERTICAL_EMBED:
          plainText += parseVerticalEmbed(node);
          break;
        case rich_content.Node.Type.LINK_PREVIEW:
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

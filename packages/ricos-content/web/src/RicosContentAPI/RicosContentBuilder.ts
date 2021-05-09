import {
  ButtonData,
  CodeData,
  DividerData,
  FileData,
  GalleryData,
  GiphyData,
  HTMLData,
  HeadingData,
  ImageData,
  LinkPreviewData,
  MapData,
  Node,
  Node_Type,
  ParagraphData,
  PollData,
  RichContent,
  TextData,
  VideoData,
} from 'ricos-schema';
import { addNode as add, toTextDataArray } from './builder-utils';
import { ContentBuilder } from '../types';

const dataByNodeType = (type: Node_Type, data: unknown) =>
  ({
    [Node_Type.CODEBLOCK]: { codeData: data as CodeData },
    [Node_Type.DIVIDER]: { dividerData: data as DividerData },
    [Node_Type.HEADING]: { headingData: data as HeadingData },
    [Node_Type.FILE]: { fileData: data as FileData },
    [Node_Type.GALLERY]: { galleryData: data as GalleryData },
    [Node_Type.GIPHY]: { giphyData: data as GiphyData },
    [Node_Type.HTML]: { htmlData: data as HTMLData },
    [Node_Type.IMAGE]: { imageData: data as ImageData },
    [Node_Type.BUTTON]: { buttonData: data as ButtonData },
    [Node_Type.LINK_PREVIEW]: { LinkPreviewData: data as LinkPreviewData },
    [Node_Type.MAP]: { mapData: data as MapData },
    [Node_Type.PARAGRAPH]: { paragraphData: data as ParagraphData },
    [Node_Type.POLL]: { pollData: data as PollData },
    [Node_Type.TEXT]: { textData: data as TextData },
    [Node_Type.VIDEO]: { videoData: data as VideoData },
  }[type]);

type AddMethodParams<TData> = {
  data: TData;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
};

type AddTextMethodParams<T> = AddMethodParams<T> & {
  text?: string | TextData | (string | TextData)[];
};

export interface RicosBuilder extends ContentBuilder {
  new (): ContentBuilder;
}

export const setupContentBuilder = (
  generateKey: () => string
): ContentBuilder & { RicosContentBuilder: RicosBuilder } => {
  function createNode(type: Node_Type, data: unknown): Node {
    return { key: generateKey(), type, ...dataByNodeType(type, data), nodes: [] };
  }

  function createTextNode(type: Node_Type, text: TextData[], data: unknown): Node {
    return {
      ...createNode(type, data),
      nodes: text.map(textData => ({
        nodes: [],
        key: generateKey(),
        type: Node_Type.TEXT,
        ...dataByNodeType(Node_Type.TEXT, textData),
      })),
    };
  }

  function addNode({
    data,
    type,
    index,
    before,
    after,
    content,
  }: {
    data: unknown;
    type: Node_Type;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }): RichContent {
    const node = createNode(type, data);
    return add({ node, index, before, after, content });
  }

  function addTextNode({
    text,
    data,
    type,
    index,
    before,
    after,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data: unknown;
    type: Node_Type;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }): RichContent {
    const textData = toTextDataArray(text);
    const node = createTextNode(type, textData, data);
    return add({ node, index, before, after, content });
  }

  class RicosContentBuilder {}

  const builderApis = {};

  [
    { name: 'Paragraph', type: Node_Type.PARAGRAPH, dataT: {} as ParagraphData },
    { name: 'Heading', type: Node_Type.HEADING, dataT: {} as HeadingData },
    { name: 'Code', type: Node_Type.CODEBLOCK, dataT: {} as CodeData },
    { name: 'Blockquote', type: Node_Type.BLOCKQUOTE, dataT: {} as never },
    { name: 'BulletListItem', type: Node_Type.BULLET_LIST, dataT: {} as never },
    { name: 'OrderedListItem', type: Node_Type.ORDERED_LIST, dataT: {} as never },
  ].forEach(({ name, type, dataT }) => {
    builderApis[`add${name}`] = RicosContentBuilder.prototype[`add${name}`] = function({
      data,
      text,
      index,
      before,
      after,
      content,
    }: AddTextMethodParams<typeof dataT>): RichContent {
      return addTextNode({
        text,
        type,
        data,
        content,
        index,
        before,
        after,
      });
    };
  });

  [
    { name: 'Image', type: Node_Type.IMAGE, dataT: {} as ImageData },
    { name: 'Divider', type: Node_Type.DIVIDER, dataT: {} as DividerData },
    { name: 'LinkPreview', type: Node_Type.LINK_PREVIEW, dataT: {} as LinkPreviewData },
    { name: 'Poll', type: Node_Type.POLL, dataT: {} as PollData },
    { name: 'File', type: Node_Type.FILE, dataT: {} as FileData },
    { name: 'Gallery', type: Node_Type.GALLERY, dataT: {} as GalleryData },
    { name: 'Map', type: Node_Type.MAP, dataT: {} as MapData },
    { name: 'Video', type: Node_Type.VIDEO, dataT: {} as VideoData },
    { name: 'Button', type: Node_Type.BUTTON, dataT: {} as ButtonData },
    { name: 'Giphy', type: Node_Type.GIPHY, dataT: {} as GiphyData },
    { name: 'Html', type: Node_Type.HTML, dataT: {} as HTMLData },
  ].forEach(({ name, type, dataT }) => {
    builderApis[`add${name}`] = RicosContentBuilder.prototype[`add${name}`] = function({
      data,
      index,
      before,
      after,
      content,
    }: AddMethodParams<typeof dataT>): RichContent {
      return addNode({
        type,
        data,
        content,
        index,
        before,
        after,
      });
    };
  });

  return {
    RicosContentBuilder: (RicosContentBuilder as unknown) as RicosBuilder,
    ...(builderApis as ContentBuilder),
  };
};

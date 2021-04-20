import {
  RichContent,
  ImageData,
  DividerData,
  ParagraphData,
  TextData,
  HTMLData,
  GiphyData,
  VideoData,
  FileData,
  MapData,
  ButtonData,
  GalleryData,
  CodeData,
  HeadingData,
  LinkPreviewData,
  PollData,
} from 'ricos-schema';

export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? PartialDeep<U>[]
    : T[P] extends Record<string, unknown>
    ? PartialDeep<T[P]>
    : T[P];
};

type AddMethod<T> = {
  [P in keyof T]: ({
    data,
    index,
    before,
    after,
    content,
  }: {
    data?: Partial<T[P]>;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }) => RichContent;
};

type AddTextMethod<T> = {
  [P in keyof T]: ({
    text,
    data,
    index,
    before,
    after,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: Partial<T[P]>;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }) => RichContent;
};

type SetMethod<T> = {
  [P in keyof T]: ({
    data,
    key,
    content,
  }: {
    data: Partial<T[P]>;
    key: string;
    content: RichContent;
  }) => RichContent;
};

// Common API for set, update and toggle text node
type SetTextMethod<T> = {
  [P in keyof T]: ({
    text,
    data,
    key,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: PartialDeep<T[P]>;
    key: string;
    content: RichContent;
  }) => RichContent;
};

type GetMethod<T> = {
  [P in keyof T]: (content: RichContent) => Record<string, T[P]>;
};

type SetMap = {
  setActionButton: ButtonData;
  setLinkButton: ButtonData;
  setDivider: DividerData;
  setFileUpload: FileData;
  setGallery: GalleryData;
  setGiphy: GiphyData;
  setHtml: HTMLData;
  setImage: ImageData;
  setLinkPreview: LinkPreviewData;
  setMap: MapData;
  setPoll: PollData;
  setVideo: VideoData;
  updateActionButton: ButtonData;
  updateLinkButton: ButtonData;
  updateDivider: DividerData;
  updateFileUpload: FileData;
  updateGallery: GalleryData;
  updateGiphy: GiphyData;
  updateHtml: HTMLData;
  updateImage: ImageData;
  updateLinkPreview: LinkPreviewData;
  updateMap: MapData;
  updatePoll: PollData;
  updateVideo: VideoData;
};

type SetTextMap = {
  setCode: CodeData;
  setHeading: HeadingData;
  setParagraph: ParagraphData;
  updateCode: CodeData;
  updateHeading: HeadingData;
  updateParagraph: ParagraphData;
  toggleCode: CodeData;
  toggleHeading: HeadingData;
  toggleParagraph: ParagraphData;
};

type AddMap = {
  addLinkButton: ButtonData;
  addActionButton: ButtonData;
  addDivider: DividerData;
  addFile: FileData;
  addGallery: GalleryData;
  addGiphy: GiphyData;
  addHtml: HTMLData;
  addImage: ImageData;
  addLinkPreview: LinkPreviewData;
  addMap: MapData;
  addPoll: PollData;
  addVideo: VideoData;
};

type AddTextMap = {
  addCode: CodeData;
  addHeading: HeadingData;
  addParagraph: ParagraphData;
};

type GetMap = {
  getImages: ImageData;
  getDividers: DividerData;
  getParagraphs: ParagraphData;
  getHeadings: HeadingData;
  getLinkPreviews: LinkPreviewData;
  getPolls: PollData;
  getCodes: CodeData;
  getGiphy: GiphyData;
  getButtons: ButtonData;
  getVideos: VideoData;
  getMaps: MapData;
  getGalleries: GalleryData;
  getFiles: FileData;
  getHtmls: HTMLData;
};

type ContentBuilderType = AddMethod<AddMap> &
  AddTextMethod<AddTextMap> &
  SetMethod<SetMap> &
  SetTextMethod<SetTextMap> & {
    removeNode: (key: string, content: RichContent) => RichContent;
  };

export interface ContentBuilder extends ContentBuilderType {}

type ContentExtractorType = GetMethod<GetMap>;

export interface ContentExtractor extends ContentExtractorType {}

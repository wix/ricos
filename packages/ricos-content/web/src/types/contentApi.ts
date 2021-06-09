import {
  RichContent,
  ImageData,
  DividerData,
  ParagraphData,
  TextData,
  HTMLData,
  VideoData,
  FileData,
  ButtonData,
  GalleryData,
  CodeBlockData,
  HeadingData,
} from 'ricos-schema';

export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? PartialDeep<U>[]
    : T[P] extends Record<string, unknown>
    ? PartialDeep<T[P]>
    : T[P];
};

type AddListMethod = ({
  items,
  data,
  index,
  before,
  after,
  content,
}: {
  items: string | TextData | ListItemData | (string | TextData | ListItemData)[];
  data?: ParagraphData;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
}) => RichContent;

type AddLists = {
  addOrderedList: AddListMethod;
  addBulletList: AddListMethod;
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

type AddMap = {
  addLinkButton: ButtonData;
  addActionButton: ButtonData;
  addDivider: DividerData;
  addFile: FileData;
  addGallery: GalleryData;
  addHtml: HTMLData;
  addImage: ImageData;
  addVideo: VideoData;
};

type AddTextMap = {
  addCode: CodeBlockData;
  addHeading: HeadingData;
  addParagraph: ParagraphData;
};

export type ListItemData = {
  text: TextData[];
  data: ParagraphData;
};

type ContentBuilderType = AddMethod<AddMap> & AddTextMethod<AddTextMap> & AddLists;

export interface ContentBuilder extends ContentBuilderType {}

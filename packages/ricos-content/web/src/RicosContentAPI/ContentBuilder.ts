import { isString } from 'lodash';
import {
  RichContent,
  ImageData,
  DividerData,
  ParagraphData,
  TextData,
  Node_Type,
  Node,
} from 'ricos-schema';
import { addNode, toTextDataArray } from './builder-utils';
import { ContentBuilder, dataByNodeType } from '../types';

type AddMethodParams<TData> = {
  data: TData;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
};

type AddTextMethodParams<T> = AddMethodParams<T> & {
  text: string | TextData | (string | TextData)[];
};

export class RicosContentBuilder implements ContentBuilder {
  generateKey: () => string;

  constructor(generateKey: () => string) {
    this.generateKey = generateKey;
  }

  createNode(type: Node_Type, data: unknown): Node {
    return { key: this.generateKey(), type, ...dataByNodeType(type, data) };
  }

  createTextNode(type: Node_Type, text: TextData[], data: unknown): Node {
    return {
      ...this.createNode(type, data),
      nodes: text.map(textData => ({
        key: this.generateKey(),
        type: Node_Type.TEXT,
        ...dataByNodeType(Node_Type.TEXT, textData),
      })),
    };
  }

  addNode({
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
    const node = this.createNode(type, data);
    return addNode({ node, index, before, after, content });
  }

  addTextNode({
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
    const node = this.createTextNode(type, textData, data);
    return addNode({ node, index, before, after, content });
  }

  addImage({ data, index, before, after, content }: AddMethodParams<ImageData>): RichContent {
    return this.addNode({ type: Node_Type.IMAGE, data, content, index, before, after });
  }

  addDivider({ data, index, before, after, content }: AddMethodParams<DividerData>): RichContent {
    return this.addNode({ type: Node_Type.DIVIDER, data, content, index, before, after });
  }

  addParagraph({
    data,
    index,
    before,
    after,
    content,
    text,
  }: AddTextMethodParams<ParagraphData>): RichContent {
    return this.addTextNode({
      type: Node_Type.PARAGRAPH,
      data,
      content,
      index,
      before,
      after,
      text,
    });
  }
}

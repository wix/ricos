import { isString } from 'lodash';
import {
  RichContent,
  ImageData,
  DividerData,
  ParagraphData,
  TextData,
  Node_Type,
  Node,
  Decoration,
} from 'ricos-schema';
import { ContentBuilder, dataByNodeType } from '../types';

export class RicosContentBuilder implements ContentBuilder {
  generateKey: () => string;

  constructor(generateKey: () => string) {
    this.generateKey = generateKey;
  }

  addNode(type: Node_Type, data: unknown, content: RichContent) {
    const node: Node = {
      type,
      ...dataByNodeType(type, data),
      nodes: [],
      key: this.generateKey(),
    };
    content.nodes?.push(node);
    return content;
  }

  addTextNode(type: Node_Type, data: unknown, textData: TextData, content: RichContent) {
    const node: Node = {
      type,
      ...dataByNodeType(type, data),
      key: this.generateKey(),
      nodes: [
        {
          type: Node_Type.TEXT,
          textData,
          key: this.generateKey(),
          nodes: [],
        },
      ],
    };
    content.nodes?.push(node);
    return content;
  }

  addImage(data: ImageData, content: RichContent) {
    return this.addNode(Node_Type.IMAGE, data, content);
  }

  addDivider(data: DividerData, content: RichContent) {
    return this.addNode(Node_Type.DIVIDER, data, content);
  }

  addParagraph(text: string | TextData, data: ParagraphData, content: RichContent) {
    const textData: TextData = isString(text)
      ? {
          text,
          decorations: [],
        }
      : text;

    return this.addTextNode(Node_Type.PARAGRAPH, data, textData, content);
  }

  toggleDecoration(
    nodeKey: string,
    decoratedText: string,
    decorations: Decoration[],
    content: RichContent
  ) {
    return content;
  }
}

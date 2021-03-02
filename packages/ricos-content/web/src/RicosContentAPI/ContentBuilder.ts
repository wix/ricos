import { RichContent, ImageData, DividerData, Node_Type, Node } from 'ricos-schema';
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
    content.nodes.push(node);
    return content;
  }

  addImage(data: ImageData, content: RichContent) {
    return this.addNode(Node_Type.IMAGE, data, content);
  }

  addDivider(data: DividerData, content: RichContent) {
    return this.addNode(Node_Type.DIVIDER, data, content);
  }
}

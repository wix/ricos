import { RichContent, ImageData, DividerData, Node_Type, Node } from 'ricos-schema';
import { ContentBuilder, dataByNodeType } from '../types';

export class RicosContentBuilder implements ContentBuilder {
  content: RichContent;

  generateKey: () => string;

  constructor(generateKey) {
    this.content = { nodes: [] };
    this.generateKey = generateKey;
  }

  setContent(content: RichContent) {
    this.content = content;
  }

  addNode(type: Node_Type, data: unknown) {
    const node: Node = {
      type,
      ...dataByNodeType(type, data),
      nodes: [],
      key: this.generateKey(),
    };
    this.content.nodes.push(node);
    return this.content;
  }

  addImage(data: ImageData) {
    return this.addNode(Node_Type.IMAGE, data);
  }

  addDivider(data: DividerData) {
    return this.addNode(Node_Type.DIVIDER, data);
  }
}

import { ContentExtractor, nodeDataMapByType } from '../types';
import { RichContent, Node_Type, ImageData, DividerData } from 'ricos-schema';

export class RicosContentExtractor implements ContentExtractor {
  getNodeDataByType(content: RichContent, nodeType: Node_Type) {
    return content.nodes.filter(({ type }) => type === nodeType).map(nodeDataMapByType[nodeType]);
  }

  getImages(content: RichContent) {
    return this.getNodeDataByType(content, Node_Type.IMAGE) as ImageData[];
  }

  getDividers(content: RichContent) {
    return this.getNodeDataByType(content, Node_Type.DIVIDER) as DividerData[];
  }
}

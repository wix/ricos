import { ContentExtractor } from '../types';
import { RichContent, Node_Type, Node, ImageData, DividerData, ParagraphData } from 'ricos-schema';

const nodeDataMapByType = (node: Node) =>
  ({
    [Node_Type.IMAGE]: ({ imageData }) => imageData as ImageData,
    [Node_Type.DIVIDER]: ({ dividerData }) => dividerData as DividerData,
    [Node_Type.PARAGRAPH]: ({ paragraphData }) => paragraphData as ParagraphData,
  }[node.type](node));

function getNodeDataByType(content: RichContent, nodeType: Node_Type) {
  return content.nodes.reduce(
    (map, node) => (node.type === nodeType ? { ...map, [node.key]: nodeDataMapByType(node) } : map),
    {}
  );
}

export interface RicosExtractor extends ContentExtractor {
  new (): ContentExtractor;
}

export const setupContentExtractor = (): ContentExtractor & {
  RicosContentExtractor: RicosExtractor;
} => {
  class RicosContentExtractor {}

  const extractorAPIs = {};

  [
    { name: 'Images', type: Node_Type.IMAGE },
    { name: 'Paragraph', type: Node_Type.PARAGRAPH },
    { name: 'Dividers', type: Node_Type.DIVIDER },
  ].forEach(({ name, type }) => {
    RicosContentExtractor.prototype[`get${name}`] = function(content: RichContent) {
      return getNodeDataByType(content, type);
    };
  });

  return {
    RicosContentExtractor: (RicosContentExtractor as unknown) as RicosExtractor,
    ...(extractorAPIs as ContentExtractor),
  };
};

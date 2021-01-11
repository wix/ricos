import { RicosNode, RicosContent } from 'ricos-schema';
import { RenderVisitor } from './RenderVisitor';

type RenderTypeMap = Record<RicosNode['type'], (node: RicosNode) => void>;

export class ContentRenderer {
  renderTypeMap: RenderTypeMap;
  visitor: RenderVisitor;

  constructor(visitor: RenderVisitor) {
    this.visitor = visitor;
  }

  initializePluginRenderMap(plugins) {
    this.renderTypeMap = plugins.reduce((map: RenderTypeMap, { type, renderer }) => {
      map[type] = renderer(this.visitor);
      return map;
    }, {});
  }

  renderContent(content: RicosContent) {
    content.doc.nodes.forEach((node: RicosNode) => this.renderTypeMap[node.type](node));
    return this.visitor.getView();
  }
}

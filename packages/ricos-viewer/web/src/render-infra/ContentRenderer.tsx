import { RicosNode, RicosContent } from 'ricos-schema';
import { RenderVisitor } from './RenderVisitor';
import { getTextRenderMap } from './element-mappers';
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
    this.renderTypeMap = { ...this.renderTypeMap, ...getTextRenderMap(this.visitor) };
  }

  render(content: RicosContent) {
    content.doc.nodes.forEach((node: RicosNode) => {
      // eslint-disable-next-line no-console
      console.assert(this.renderTypeMap[node.type], `unsupported node ${JSON.stringify(node)}`);
      this.renderTypeMap[node.type]?.(node);
    });
    return this.visitor.getView();
  }
}

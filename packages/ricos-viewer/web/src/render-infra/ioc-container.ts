import { ContentRenderer } from './ContentRenderer';
import { RenderVisitor } from './RenderVisitor';
import { ViewBuilder } from './ViewBuilder';

const contentRenderer = new ContentRenderer(new RenderVisitor(new ViewBuilder()));

export default {
  getContentRenderer: () => contentRenderer,
};

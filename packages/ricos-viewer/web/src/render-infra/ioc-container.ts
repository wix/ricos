import { ContentRenderer } from './ContentRenderer';
import { RenderVisitor } from './RenderVisitor';
import { ViewBuilder } from './ViewBuilder';
import { TransitionManager } from './TransitionManager';
import { ViewerTransitionManager } from './types';

const contentRenderer = new ContentRenderer(new RenderVisitor(new ViewBuilder()));
const transitionManager = new TransitionManager();

export default {
  getContentRenderer: () => contentRenderer,
  getViewerTransitionManager: () => transitionManager as ViewerTransitionManager,
};

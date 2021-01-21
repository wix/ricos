import { ContentRenderer } from './ContentRenderer';
import { RenderVisitor } from './RenderVisitor';
import { ViewBuilder } from './ViewBuilder';
import { TransitionManager } from './TransitionManager';
import { ViewerTransitionManager } from './types';

const transitionManager = new TransitionManager();

export default {
  getContentRenderer: () => new ContentRenderer(new RenderVisitor(new ViewBuilder())),
  getViewerTransitionManager: () => transitionManager as ViewerTransitionManager,
};

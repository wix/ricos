import React, { ReactElement } from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { themeStrategy, pluginsStrategy, localeStrategy, previewStrategy } from 'ricos-common';
import { shouldRenderChild } from './utils';
import { ricosViewerPluginStrategy } from './ricosViewerPluginStrategy';
import { ViewerTransitionManager } from './types';

export class TransitionManager implements ViewerTransitionManager {
  viewerChild: ReactElement;
  strategies: Record<string, () => void>;

  initializeRichContentViewerStrategies() {
    return {
      plugins: pluginsStrategy,
      locale: localeStrategy,
      theme: themeStrategy,
      preview: previewStrategy,
    };
  }

  initializeRicosContentViewerStrategies() {
    return { ...this.initializeRichContentViewerStrategies(), plugins: ricosViewerPluginStrategy };
  }

  initialize(viewerChild?: ReactElement) {
    if (!viewerChild) {
      this.viewerChild = React.createElement(RichContentViewer);
      this.strategies = this.initializeRichContentViewerStrategies();
    } else if (shouldRenderChild('RichContentViewer', viewerChild)) {
      this.viewerChild = viewerChild;
      this.strategies = this.initializeRichContentViewerStrategies();
    } else if (shouldRenderChild('RicosContentViewer', viewerChild)) {
      this.viewerChild = viewerChild;
      this.strategies = this.initializeRicosContentViewerStrategies();
    } else {
      throw new TypeError('invalid child component provided');
    }
  }

  getViewerChild() {
    return this.viewerChild;
  }

  getViewerStrategies() {
    return this.strategies;
  }
}

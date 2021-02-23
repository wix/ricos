import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import contentState from './contentState';
import { RicosContent } from 'ricos-common';
import { ViewerPlugin } from 'wix-rich-content-common';

export function createViewerBundle(plugin?: ViewerPlugin | ViewerPlugin[]) {
  const content: RicosContent = contentState;

  const plugins: ViewerPlugin[] = Array.isArray(plugin) ? plugin : [plugin];
  return <RicosViewer plugins={plugins} content={content} />;
}

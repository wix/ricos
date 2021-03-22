import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import contentState from './contentState';
import { DraftContent } from 'ricos-common';
import { ViewerPlugin } from 'wix-rich-content-common';
import 'ricos-viewer/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';

export function createViewerBundle(plugin?: ViewerPlugin | ViewerPlugin[]) {
  const content: DraftContent = contentState;

  const plugins: ViewerPlugin[] = Array.isArray(plugin) ? plugin : [plugin];
  return <RicosViewer plugins={plugins} content={content} />;
}

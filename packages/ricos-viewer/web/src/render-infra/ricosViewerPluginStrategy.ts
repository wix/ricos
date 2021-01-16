import { RichContentProps, RicosCssOverride } from 'ricos-common/src/types';
import { RicosContent } from 'ricos-content';
import { RenderVisitor } from './RenderVisitor';

type RicosViewerPluginRenderer = (visitor: RenderVisitor) => void;
type RicosViewerPlugin = { pluginRenderer: { type: string; renderer: RicosViewerPluginRenderer } };
type RicosViewerPluginsStrategy = {
  plugins: { type: string; renderer: RicosViewerPluginRenderer }[];
};

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
export function ricosViewerPluginStrategy(
  isViewer: boolean,
  plugins: RicosViewerPlugin[] = [],
  childProps: RichContentProps,
  cssOverride: RicosCssOverride,
  content?: RicosContent
): RicosViewerPluginsStrategy {
  return { ...childProps, plugins: plugins.map(({ pluginRenderer }) => pluginRenderer) };
}

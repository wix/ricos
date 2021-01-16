import { RichContentProps, RicosCssOverride } from 'ricos-common/src/types';
import { RicosContent } from 'ricos-content';
import { RenderVisitor } from './RenderVisitor';

type RicosViewerPluginRenderer = (visitor: RenderVisitor) => void;
type RicosViewerPlugin = { pluginRenderer: { type: string; renderer: RicosViewerPluginRenderer } };
type RicosViewerPluginsStrategy = {
  pluginRenderers: { type: string; renderer: RicosViewerPluginRenderer }[];
};

export function ricosViewerPluginStrategy(
  isViewer: boolean,
  plugins: RicosViewerPlugin[] = [],
  childProps: RichContentProps,
  cssOverride: RicosCssOverride,
  content?: RicosContent
): RicosViewerPluginsStrategy {
  console.debug({ isViewer, cssOverride, content }); // eslint-disable-line
  return { pluginRenderers: plugins.map(({ pluginRenderer }) => pluginRenderer), ...childProps };
}

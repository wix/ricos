import { editorPluginsParse } from '../../../../../../examples/main/shared/editor/EditorPlugins';

export default function pluginsStrategy({ settings = {} }) {
  const { plugins } = settings;
  if (Array.isArray(plugins)) {
    return {
      config: plugins,
      plugins: Object.values(
        Object.entries(editorPluginsParse).filter(entry => plugins[entry[0]] !== undefined)
      ),
    };
  }
  return { plugins };
}

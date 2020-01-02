import { editorPluginsParse } from './defaultPlugins';

export default function pluginsStrategy({ settings = {} }) {
  const { plugins = {} } = settings;
  if (plugins !== {}) {
    const config = plugins;
    const newPlugins = Object.entries(editorPluginsParse)
      .filter(entry => plugins[entry[0]] !== undefined)
      .map(val => val[1]);
    return {
      config,
      plugins: newPlugins,
    };
  }
  return {};
}

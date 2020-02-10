const createPluginsStrategy = (pack = {}) => (innerProps = {}) => {
  const { config = {}, plugins = [], ModalsMap = {} } = pack;
  return {
    config: { ...config, ...(innerProps.config || {}) },
    plugins: plugins.concat(innerProps.plugins || []),
    ModalsMap: { ...ModalsMap, ...(innerProps.ModalsMap || {}) },
  };
};

export default function pluginsStrategyProvider({ plugins }) {
  const emptyPack = { config: {}, plugins: [], ModalsMap: {} };
  if (Array.isArray(plugins) && plugins !== []) {
    const pack = plugins.reduce((prev, curr) => {
      const { createPlugin, type, config, ModalsMap } = curr;
      const pConfig = { [type]: config };
      return {
        config: { ...prev.config, ...pConfig },
        plugins: prev.plugins.concat(createPlugin),
        ModalsMap: { ...prev.ModalsMap, ...ModalsMap },
      };
    }, emptyPack);
    return createPluginsStrategy(pack);
  }
  return createPluginsStrategy(emptyPack);
}

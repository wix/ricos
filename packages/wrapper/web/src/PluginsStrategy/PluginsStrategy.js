export default function pluginsStrategy({ settings = {} }) {
  const { plugins = [] } = settings;
  const emptyRet = { config: {}, plugins: [] };
  if (Array.isArray(plugins) && plugins !== []) {
    return plugins.reduce((prev, curr) => {
      const { createPlugin, type, config } = curr;
      const pConfig = { [type]: config };
      return {
        config: { ...prev.config, pConfig },
        plugins: prev.plugins.concat(createPlugin),
      };
    }, emptyRet);
  }
  return emptyRet;
}

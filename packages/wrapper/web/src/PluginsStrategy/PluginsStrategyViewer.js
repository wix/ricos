export default function pluginsStrategyViewer({ settings = {} }) {
  const { plugins = [] } = settings;
  const emptyRet = { config: {}, type: [], typeMappers: [], decorators: [] };
  if (Array.isArray(plugins) && plugins !== []) {
    return plugins.reduce((prev, curr) => {
      const { config, type, typeMapper, decorator } = curr;
      const pConfig = { [type]: config };
      return {
        config: { ...prev.config, pConfig },
        type: prev.type.concat(type),
        typeMappers: prev.typeMappers.concat(typeMapper),
        decorators: prev.plugins.concat(decorator),
      };
    }, emptyRet);
  }
  return emptyRet;
}

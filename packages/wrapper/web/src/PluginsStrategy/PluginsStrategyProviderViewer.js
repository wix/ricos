const createPluginsStrategyViewer = (pack = {}) => (innerProps = {}) => {
  const { config = {}, typeMappers = [], decorators = [] } = pack;
  return {
    config: { ...config, ...(innerProps.config || {}) },
    typeMappers: typeMappers.concat(innerProps.typeMappers || []),
    decorators: decorators.concat(innerProps.decorators || []),
  };
};

const isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object;

export default function pluginsStrategyProviderViewer({ plugins = [] }) {
  const emptyRet = { config: {}, type: [], typeMappers: [], decorators: [] };
  if (Array.isArray(plugins) && plugins !== []) {
    const pack = plugins.reduce((prev, curr) => {
      const { config, type, typeMapper, decorator } = curr;
      const pConfig = { [type]: config };
      return {
        config: { ...prev.config, ...pConfig },
        typeMappers: (typeMapper && prev.typeMappers.concat([typeMapper])) || prev.typeMappers,
        decorators: (!isEmpty(decorator) && prev.decorators.concat([decorator])) || prev.decorators,
      };
    }, emptyRet);
    return createPluginsStrategyViewer(pack);
  }
  return createPluginsStrategyViewer(emptyRet);
}

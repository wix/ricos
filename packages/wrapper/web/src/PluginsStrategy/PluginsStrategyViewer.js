const isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object;
export default function pluginsStrategyViewer({ settings = {} }) {
  const { plugins = [] } = settings;
  const emptyRet = { config: {}, type: [], typeMappers: [], decorators: [] };
  if (Array.isArray(plugins) && plugins !== []) {
    return plugins.reduce((prev, curr) => {
      const { config, type, typeMapper, decorator } = curr;
      const pConfig = { [type]: config };
      return {
        config: { ...prev.config, ...pConfig },
        type: prev.type.concat(type),
        typeMappers: (typeMapper && prev.typeMappers.concat([typeMapper])) || prev.typeMappers,
        decorators: (!isEmpty(decorator) && prev.decorators.concat([decorator])) || prev.decorators,
      };
    }, emptyRet);
  }
  return emptyRet;
}

// TODO: move to common
function assert(predicate, error) {
  if (!predicate) {
    throw error;
  }
}

const createPluginsStrategy = ({
  config = {},
  plugins = [],
  ModalsMap = {},
  typeMappers = [],
  decorators = [],
} = {}) => (innerProps = {}) => {
  const isEditor = true;
  if (isEditor)
    return {
      config: { ...config, ...(innerProps.config || {}) },
      plugins: [...plugins, ...(innerProps.plugins || [])],
      ModalsMap: { ...ModalsMap, ...(innerProps.ModalsMap || {}) },
    };
  else
    return {
      config: { ...config, ...(innerProps.config || {}) },
      typeMappers: typeMappers.concat(innerProps.typeMappers || []),
      decorators: decorators.concat(innerProps.decorators || []),
    };
};

const isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object;

export default function pluginsStrategyProvider(isEditor, { plugins = [] }) {
  const emptyAccumulator = isEditor
    ? { config: {}, plugins: [], ModalsMap: {} }
    : { config: {}, typeMappers: [], decorators: [] };

  assert(Array.isArray(plugins), 'plugins is expected to be an object array');
  const pack = plugins.reduce((prev, curr) => {
    const { createPlugin, type, config, ModalsMap, typeMapper, decorator } = curr;
    const pConfig = { [type]: config };
    if (isEditor)
      return {
        config: { ...prev.config, ...pConfig },
        plugins: prev.plugins.concat(createPlugin),
        ModalsMap: { ...prev.ModalsMap, ...ModalsMap },
      };
    return {
      config: { ...prev.config, ...pConfig },
      typeMappers: (typeMapper && prev.typeMappers.concat([typeMapper])) || prev.typeMappers,
      decorators: (!isEmpty(decorator) && prev.decorators.concat([decorator])) || prev.decorators,
    };
  }, emptyAccumulator);

  return createPluginsStrategy(pack);
}

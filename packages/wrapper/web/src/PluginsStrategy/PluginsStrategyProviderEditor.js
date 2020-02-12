// TODO: move to common
function assert(predicate, error) {
  if (!predicate) {
    throw error;
  }
}

const createPluginsStrategy = ({ config = {}, plugins = [], ModalsMap = {} } = {}) => (
  innerProps = {}
) => {
  return {
    config: { ...config, ...(innerProps.config || {}) },
    plugins: [...plugins, ...(innerProps.plugins || [])],
    ModalsMap: { ...ModalsMap, ...(innerProps.ModalsMap || {}) },
  };
};

export default function pluginsStrategyProvider({ plugins = [] }) {
  assert(Array.isArray(plugins), 'plugins is expected to be an object array');
  const pack = plugins.reduce(
    (prev, curr) => {
      const { createPlugin, type, config, ModalsMap } = curr;
      const pConfig = { [type]: config };
      return {
        config: { ...prev.config, ...pConfig },
        plugins: prev.plugins.concat(createPlugin),
        ModalsMap: { ...prev.ModalsMap, ...ModalsMap },
      };
    },
    { config: {}, plugins: [], ModalsMap: {} }
  );

  return createPluginsStrategy(pack);
}

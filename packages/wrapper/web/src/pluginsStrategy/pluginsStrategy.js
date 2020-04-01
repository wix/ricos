import { merge } from 'lodash';

// TODO: move to common
function assert(predicate, error) {
  if (!predicate) {
    throw error;
  }
}

const isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object;

const getPluginProps = (
  isEditor,
  {
    config = {},
    plugins = [],
    ModalsMap = {},
    typeMapper = [],
    decorators = [],
    inlineStyleMappers = [],
    theme = {},
    initialState,
  }
) =>
  isEditor
    ? { config, plugins, ModalsMap }
    : {
        config,
        typeMapper,
        decorators: decorators.map(decorator => decorator(theme, config)),
        inlineStyleMappers:
          initialState && inlineStyleMappers.map(mapper => mapper(config, initialState)),
      };

export default function pluginsStrategy(isEditor, plugins = [], childProps = {}) {
  const emptyAccumulator = isEditor
    ? { config: {}, plugins: [], ModalsMap: {} }
    : { config: {}, typeMappers: [], decorators: [], inlineStyleMappers: [] };

  assert(Array.isArray(plugins), 'plugins is expected to be an object array');
  const pack = plugins.reduce((prev, curr) => {
    const {
      createPlugin,
      type,
      config,
      ModalsMap,
      typeMapper,
      decorator = {},
      inlineStyleMapper,
    } = curr;
    const pConfig = { [type]: config };
    const { theme = {}, initialState } = childProps;
    if (isEditor)
      return {
        config: { ...prev.config, ...pConfig },
        plugins: prev.plugins.concat(createPlugin),
        ModalsMap: { ...prev.ModalsMap, ...ModalsMap },
      };
    return {
      config: { ...prev.config, ...pConfig },
      typeMappers: (typeMapper && prev.typeMappers.concat([typeMapper])) || prev.typeMappers,
      decorators:
        (!isEmpty(decorator) && prev.decorators.concat([decorator(theme, config)])) ||
        prev.decorators,
      inlineStyleMappers:
        (inlineStyleMapper &&
          initialState &&
          prev.inlineStyleMappers.concat([inlineStyleMapper(config, initialState)])) ||
        prev.inlineStyleMappers,
    };
  }, emptyAccumulator);

  const childPluginProps = getPluginProps(isEditor, childProps);

  return merge(pack, childPluginProps);
}

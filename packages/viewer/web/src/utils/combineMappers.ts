import { PluginTypeMapper, PluginMapping } from 'wix-rich-content-common';

export const combineMappers = (mappers: PluginTypeMapper[], ...args): PluginMapping => {
  if (!mappers || !mappers.length || mappers.some(resolver => typeof resolver !== 'function')) {
    console.warn(`${mappers} is expected to be a function array`); // eslint-disable-line no-console
    return {};
  }
  return mappers.reduce<PluginMapping>((map, mapper) => Object.assign(map, mapper(...args)), {});
};

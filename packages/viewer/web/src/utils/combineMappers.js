export const combineMappers = (mappers, ...args) => {
  if (!mappers || !mappers.length || mappers.some(resolver => typeof resolver !== 'function')) {
    console.warn(`${mappers} is expected to be a function array`); // eslint-disable-line no-console
    return {};
  }
  return mappers.reduce((map, mapper) => Object.assign(map, mapper(...args)), {});
};

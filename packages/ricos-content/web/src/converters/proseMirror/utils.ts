import { DECORATION_TYPES, NODE_TYPES } from './consts';

export const isNode = object =>
  NODE_TYPES.includes(object?.type?.toUpperCase()) && ('nodes' in object || 'content' in object);

export const isDecoration = object => DECORATION_TYPES.includes(object?.type?.toUpperCase());

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const toDataField = (type: string) =>
  type
    .toLowerCase()
    .split('_')
    .map((str, index) => (index === 0 ? str : capitalize(str)))
    .join('')
    .concat('Data');

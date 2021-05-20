import { capitalize } from 'lodash';
import { DECORATION_TYPES, NODE_TYPES } from './consts';

export const isNode = object =>
  NODE_TYPES.includes(object?.type?.toUpperCase()) && ('nodes' in object || 'content' in object);

export const isDecoration = object => DECORATION_TYPES.includes(object?.type?.toUpperCase());

export const toDataFieldName = (type: string) =>
  type
    .toLowerCase()
    .split('_')
    .map((str, index) => (index === 0 ? str : capitalize(str)))
    .join('')
    .concat('Data');

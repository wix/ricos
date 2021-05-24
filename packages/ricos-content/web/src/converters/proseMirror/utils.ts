import { capitalize } from 'lodash';
import { Node_Type } from 'ricos-schema';
import { DECORATION_TYPES, NODE_TYPES } from './consts';

const TYPES = [...NODE_TYPES, ...DECORATION_TYPES];

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

export const DATA_FIELDS_MAP = {
  ...TYPES.reduce((map, type) => ({ ...map, [type]: toDataFieldName(type) }), {}),
  [Node_Type.CODEBLOCK]: 'codeData',
};

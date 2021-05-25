import { transform, isObject, pickBy, identity } from 'lodash';
import { RichContent } from 'ricos-schema';
import { JSONContent } from '@tiptap/core';
import { initializeMetadata } from '../../nodeUtils';
import { genKey } from '../../generateRandomKey';
import { DATA_FIELDS_MAP, isDecoration, isNode } from '../utils';

export const fromProseMirror = (proseDocument: JSONContent): RichContent => {
  const { type: _, ...content } = convertFromProse(proseDocument);
  if (!content.metadata) {
    content.metadata = initializeMetadata();
  }
  return content;
};

const FIELDS_MAP = {
  content: 'nodes',
  marks: 'decorations',
};

const typeToUpper = object => ({ ...object, type: object.type.toUpperCase() });

const isTextNode = value => value?.type === 'text' && 'marks' in value;

const moveTextData = object => {
  const { marks, text, ...newValue } = object;
  return { ...newValue, attrs: { marks, text } };
};

const convertDataField = object => {
  const dataField = DATA_FIELDS_MAP[object.type];
  const { attrs, ...newValue } = object;
  return { ...newValue, ...(attrs ? { [dataField]: attrs } : {}) };
};

const moveNodeStyle = object => {
  const { attrs: { style, ...rest } = { style }, ...newValue } = object;
  const attrs = Object.keys(rest).length > 0 && rest;
  return pickBy({ ...newValue, attrs, style }, identity);
};

const convertValue = value => {
  let newValue = value;
  if (isTextNode(newValue)) {
    newValue = moveTextData(newValue);
  }
  if (isNode(newValue)) {
    newValue = moveNodeStyle(newValue);
  }
  if (isNode(newValue) || isDecoration(newValue)) {
    newValue = typeToUpper(newValue);
    newValue = convertDataField(newValue);
  }
  if (isNode(newValue) && !newValue.key) {
    newValue.key = genKey();
  }
  return newValue;
};

const convertFromProse = obj => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return transform<any, any>(obj, (result, value, key) => {
    const convertedValue = convertValue(value);
    const convertedKey = FIELDS_MAP[key] || key;
    result[convertedKey] = isObject(convertedValue)
      ? convertFromProse(convertedValue)
      : convertedValue;
  });
};

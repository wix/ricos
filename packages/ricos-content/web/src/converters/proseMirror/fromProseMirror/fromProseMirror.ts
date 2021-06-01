import { transform, isObject, pickBy, identity } from 'lodash';
import { RichContent, Node } from 'ricos-schema';
import { JSONContent } from '@tiptap/core';
import { initializeMetadata } from '../../nodeUtils';
import { genKey } from '../../generateRandomKey';
import { DATA_FIELDS_MAP, isDecoration, isNode, isProseContent } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromProseMirror = <T extends JSONContent | Record<string, any>>(
  proseContent: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): T extends JSONContent ? RichContent | Node : Record<string, any> => {
  const { richContent } = convertFromProse({ richContent: proseContent });
  return richContent;
};

const FIELDS_MAP = {
  content: 'nodes',
  marks: 'decorations',
};

const typeToUpper = object => ({ ...object, type: object.type.toUpperCase() });

const isTextNode = value => value?.type === 'text' && 'marks' in value;

const removeDocType = ({ type: _, ...content }: JSONContent) => content;

const addMetadata = ({ metadata, ...content }: JSONContent) => ({
  metadata: metadata || initializeMetadata(),
  ...content,
});

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
  if (isProseContent(newValue)) {
    newValue = removeDocType(newValue);
    newValue = addMetadata(newValue);
  }
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

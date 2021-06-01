import { DATA_FIELDS_MAP, isRichContent } from './../utils';
import { transform, isObject, merge } from 'lodash';
import { Node, Decoration, RichContent } from 'ricos-schema';
import { TO_RICOS_DATA_FIELD } from '../../draft/consts';
import { JSONContent } from '@tiptap/core';
import { isDecoration, isNode } from '../utils';

declare const a: RichContent;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toProseMirror = <T extends RichContent | Node | Record<string, any>>(
  richContent: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): T extends RichContent | Node ? JSONContent : Record<string, any> => {
  const jsonContent = isRichContent(richContent)
    ? RichContent.toJSON(richContent)
    : isNode(richContent)
    ? Node.toJSON(richContent)
    : JSON.parse(JSON.stringify(richContent)); // remove undefined values
  const { proseContent } = convertToProse({ proseContent: jsonContent });
  return proseContent;
};

const PROSE_DATA_FIELDS_MAP = Object.fromEntries(
  Object.values(TO_RICOS_DATA_FIELD)
    .concat('textData')
    .map(value => [value, 'attrs'])
);
const FIELDS_MAP = {
  nodes: 'content',
  decorations: 'marks',
  ...PROSE_DATA_FIELDS_MAP,
};

const typeToLower = (object: Node | Decoration) => ({ ...object, type: object.type.toLowerCase() });

const addDocType = (content: RichContent) => ({ type: 'doc', ...content });

const flattenTextData = (node: Node) => {
  const { textData, ...newNode } = node;
  return { ...newNode, ...textData };
};

const styleAsData = value => {
  const { style, ...rest } = value;
  const dataField = DATA_FIELDS_MAP[value.type];
  return merge({ [dataField]: { style } }, rest);
};

const convertValue = value => {
  let newValue = value;
  if (isRichContent(newValue)) {
    newValue = addDocType(newValue);
  }
  if (isNode(newValue) && newValue.style) {
    newValue = styleAsData(newValue);
  }
  if (isNode(newValue) || isDecoration(newValue)) {
    newValue = typeToLower(newValue);
  }
  if (newValue?.textData) {
    newValue = flattenTextData(newValue);
  }
  return newValue;
};

const convertToProse = obj => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return transform<any, any>(obj, (result, value, key) => {
    const convertedValue = convertValue(value);
    const convertedKey = FIELDS_MAP[key] || key;
    result[convertedKey] = isObject(convertedValue)
      ? convertToProse(convertedValue)
      : convertedValue;
  });
};

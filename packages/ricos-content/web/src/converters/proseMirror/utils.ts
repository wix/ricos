import { JSONContent } from '@tiptap/core';
import { capitalize } from 'lodash';
import { Decoration, Node, Node_Type, RichContent } from 'ricos-schema';
import { DraftContent, IMAGE_TYPE } from '../..';
import { DECORATION_TYPES, NODE_TYPES } from './consts';

const TYPES = [...NODE_TYPES, ...DECORATION_TYPES];

export const isNode = (object): object is Node =>
  NODE_TYPES.includes(object?.type?.toUpperCase()) && ('nodes' in object || 'content' in object);

export const isDecoration = (object): object is Decoration =>
  DECORATION_TYPES.includes(object?.type?.toUpperCase());

export const isRichContent = (object): object is RichContent => !!object?.nodes && !isNode(object);

export const isProseContent = (object): object is JSONContent =>
  !!object?.content && !isNode(object);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getImageNode = <T extends { content?: any; nodes?: any }>({
  content,
  nodes,
}: T): T extends RichContent ? Node : T extends JSONContent ? JSONContent : undefined =>
  (nodes || content).find(({ type }) => type.toUpperCase() === Node_Type.IMAGE) || {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getImageBlockData = (content: DraftContent): any =>
  Object.values(content.entityMap).find(({ type }) => type === IMAGE_TYPE)?.data;

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

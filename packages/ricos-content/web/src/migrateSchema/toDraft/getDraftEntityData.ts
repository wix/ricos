/* eslint-disable fp/no-delete */
import { Node } from 'ricos-schema';
import {
  DRAFT_BLOCK_TYPE_TO_DATA_FIELD,
  ENTITY_DECORATION_TO_DATA_FIELD,
  ENTITY_DECORATION_TO_MUTABILITY,
  FROM_RICOS_ENTITY_TYPE_MAP,
  TO_RICOS_ENTITY_TYPE,
} from '../consts';
import toCamelCase from 'to-camel-case';
import toSlugCase from 'to-slug-case';
import toSnakeCase from 'to-snake-case';
import { has } from 'lodash';
import { MENTION_TYPE, RicosEntity, RicosEntityMap } from '../..';
import { DraftBlockType } from 'draft-js';
import { DraftTypedDecoration } from './decorationParsers';

const migrateVideoData = data => {
  if (data.url) {
    data.src = data.url;
    delete data.url;
  }
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
  if (data.metadata) {
    data.metadata = keysToSnakeCase(data.metadata);
  }
};

const migrateDividerData = data => {
  has(data, 'type') && (data.type = toCamelCase(data.type));
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

const migrateImageData = data => {
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
  if (has(data, 'src.originalFileName')) {
    data.src.original_file_name = data.src.originalFileName;
    delete data.src.originalFileName;
  }
  if (has(data, 'src.fileName')) {
    data.src.file_name = data.src.fileName;
    delete data.src.fileName;
  }
};

const migrateGalleryData = data => {
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

const migratePollData = data => {
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
  has(data, 'layout.poll.type') && (data.layout.poll.type = toCamelCase(data.layout.poll.type));
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = toCamelCase(data.layout.poll.direction));
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = toCamelCase(data.design.poll.backgroundType));
};

const migrateVerticalEmbedData = data => {
  has(data, 'type') && (data.type = toCamelCase(data.type));
};

const migrateHtmlData = data => {
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

const migrateGiphyData = data => {
  has(data, 'configViewer.sizes.desktop') &&
    (data.configViewer.sizes.desktop = toCamelCase(data.configViewer.sizes.desktop));
  has(data, 'configViewer.sizes.mobile') &&
    (data.configViewer.sizes.mobile = toCamelCase(data.configViewer.sizes.mobile));
};

const migrateLinkPreviewData = data => {
  if (has(data, 'thumbnailUrl')) {
    data.thumbnail_url = data.thumbnailUrl;
    delete data.thumbnailUrl;
  }
  if (has(data, 'providerUrl')) {
    data.provider_url = data.providerUrl;
    delete data.providerUrl;
  }
};

const migrateSoundCloudData = data => {
  if (data.metadata) {
    data.metadata = keysToSnakeCase(data.metadata);
  }
};

const getNodeEntityData = (node: Node) => {
  const { type } = node;
  const draftPluginType = FROM_RICOS_ENTITY_TYPE_MAP[type];
  const dataFieldName = TO_RICOS_ENTITY_TYPE[draftPluginType];
  if (!dataFieldName) {
    // eslint-disable-next-line no-console
    console.error(`ERROR! Unknown entity type "${type}"!`);
    process.exit(1);
  }
  const data = node[dataFieldName];

  switch (type) {
    case Node.Type.VIDEO:
      migrateVideoData(data);
      break;
    case Node.Type.DIVIDER:
      migrateDividerData(data);
      break;
    case Node.Type.IMAGE:
      migrateImageData(data);
      break;
    case Node.Type.GALLERY:
      migrateGalleryData(data);
      break;
    case Node.Type.POLL:
      migratePollData(data);
      break;
    case Node.Type.VERTICAL_EMBED:
      migrateVerticalEmbedData(data);
      break;
    case Node.Type.HTML:
      migrateHtmlData(data);
      break;
    case Node.Type.GIPHY:
      migrateGiphyData(data);
      break;
    case Node.Type.LINK_PREVIEW:
      migrateLinkPreviewData(data);
      break;
    case Node.Type.SOUND_CLOUD:
      migrateSoundCloudData(data);
      break;
    default:
  }

  return { type: draftPluginType, data };
};

export const createDecorationEntityData = (
  decoration: DraftTypedDecoration,
  entityKey: number
): RicosEntityMap => {
  const { type } = decoration;
  const dataFieldName = ENTITY_DECORATION_TO_DATA_FIELD[type];
  if (!dataFieldName) {
    // eslint-disable-next-line no-console
    console.error(`ERROR! Unknown entity type "${type}"!`);
    process.exit(1);
  }

  const data = decoration[dataFieldName];
  const mutability = ENTITY_DECORATION_TO_MUTABILITY[decoration.type];

  switch (type) {
    case MENTION_TYPE:
      data.mention = { slug: data.slug, name: data.name };
      delete data.name;
      delete data.slug;
      break;
    default:
  }

  return createEntity(entityKey, { type, mutability, data });
};

export const createAtomicEntityData = (node: Node, entityKey: number): RicosEntityMap => {
  const { type, data } = getNodeEntityData(node);
  return createEntity(entityKey, { type, mutability: 'IMMUTABLE', data });
};

export const createTextBlockData = (node: Node, blockType: DraftBlockType) => {
  const { textAlignment, dynamicStyles, depth } =
    node[DRAFT_BLOCK_TYPE_TO_DATA_FIELD[blockType]] || {};
  return Object.assign(
    {},
    textAlignment ? { textAlignment: textAlignment.toString().toLowerCase() } : undefined,
    dynamicStyles
      ? {
          dynamicStyles: Object.fromEntries(
            Object.entries(dynamicStyles).map(([key, value]) => [toSlugCase(key), value])
          ),
        }
      : undefined,
    depth ? { depth } : undefined
  );
};

const keysToSnakeCase = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value]));

const createEntity = (key: number, { type, mutability, data }: RicosEntity): RicosEntityMap => {
  return { [key.toString()]: { type, mutability, data } };
};

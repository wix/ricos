/* eslint-disable fp/no-delete */
import { RicosDecoration, RicosNode } from 'ricos-schema';
import {
  DRAFT_BLOCK_TYPE_TO_DATA_FIELD,
  ENTITY_DECORATION_TO_DATA_FIELD,
  ENTITY_DECORATION_TO_MUTABILITY,
  FROM_RICOS_ENTITY_TYPE_MAP,
  TO_RICOS_ENTITY_TYPE_MAP,
} from '../consts';
import toCamelCase from 'to-camel-case';
import toSlugCase from 'to-slug-case';
import toSnakeCase from 'to-snake-case';
import { has } from 'lodash';
import {
  RICOS_DIVIDER_TYPE,
  RICOS_FILE_TYPE,
  RICOS_GALLERY_TYPE,
  RICOS_HTML_TYPE,
  RICOS_IMAGE_TYPE,
  RICOS_LINK_PREVIEW_TYPE,
  RICOS_POLL_TYPE,
  RICOS_VERTICAL_EMBED_TYPE,
  RICOS_VIDEO_TYPE,
  MENTION_TYPE,
  RICOS_GIPHY_TYPE,
  RicosEntity,
  RicosEntityMap,
  RICOS_SOUND_CLOUD_TYPE,
} from '../..';
import { DraftBlockType } from 'draft-js';

export const migrateVideoData = data => {
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

export const migrateDividerData = data => {
  has(data, 'type') && (data.type = toCamelCase(data.type));
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

export const migrateFileData = data => {
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

export const migrateImageData = data => {
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

export const migrateGalleryData = data => {
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

export const migratePollData = data => {
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
  has(data, 'layout.poll.type') && (data.layout.poll.type = toCamelCase(data.layout.poll.type));
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = toCamelCase(data.layout.poll.direction));
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = toCamelCase(data.design.poll.backgroundType));
};

export const migrateVerticalEmbedData = data => {
  has(data, 'type') && (data.type = toCamelCase(data.type));
};

export const migrateHtmlData = data => {
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

export const migrateGiphyData = data => {
  has(data, 'configViewer.sizes.desktop') &&
    (data.configViewer.sizes.desktop = toCamelCase(data.configViewer.sizes.desktop));
  has(data, 'configViewer.sizes.mobile') &&
    (data.configViewer.sizes.mobile = toCamelCase(data.configViewer.sizes.mobile));
};

export const migrateLinkPreviewData = data => {
  if (has(data, 'thumbnailUrl')) {
    data.thumbnail_url = data.thumbnailUrl;
    delete data.thumbnailUrl;
  }
  if (has(data, 'providerUrl')) {
    data.provider_url = data.providerUrl;
    delete data.providerUrl;
  }
};

export const migrateSoundCloudData = data => {
  if (data.metadata) {
    data.metadata = keysToSnakeCase(data.metadata);
  }
};

const getNodeEntityData = (node: RicosNode) => {
  const { type } = node;
  const draftPluginType = FROM_RICOS_ENTITY_TYPE_MAP[type];
  const dataFieldName = TO_RICOS_ENTITY_TYPE_MAP[draftPluginType];
  if (!dataFieldName) {
    // eslint-disable-next-line no-console
    console.error(`ERROR! Unknown entity type "${type}"!`);
    process.exit(1);
  }
  const data = node[dataFieldName];

  switch (type) {
    case RICOS_VIDEO_TYPE:
      migrateVideoData(data);
      break;
    case RICOS_DIVIDER_TYPE:
      migrateDividerData(data);
      break;
    case RICOS_FILE_TYPE:
      migrateFileData(data);
      break;
    case RICOS_IMAGE_TYPE:
      migrateImageData(data);
      break;
    case RICOS_GALLERY_TYPE:
      migrateGalleryData(data);
      break;
    case RICOS_POLL_TYPE:
      migratePollData(data);
      break;
    case RICOS_VERTICAL_EMBED_TYPE:
      migrateVerticalEmbedData(data);
      break;
    case RICOS_HTML_TYPE:
      migrateHtmlData(data);
      break;
    case RICOS_GIPHY_TYPE:
      migrateGiphyData(data);
      break;
    case RICOS_LINK_PREVIEW_TYPE:
      migrateLinkPreviewData(data);
      break;
    case RICOS_SOUND_CLOUD_TYPE:
      migrateSoundCloudData(data);
      break;
    default:
  }

  return { type: draftPluginType, data };
};

export const createDecorationEntityData = (
  decoration: RicosDecoration,
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

export const createAtomicEntityData = (node: RicosNode, entityKey: number): RicosEntityMap => {
  const { type, data } = getNodeEntityData(node);
  return createEntity(entityKey, { type, mutability: 'IMMUTABLE', data });
};

export const createTextBlockData = (node: RicosNode, blockType: DraftBlockType) => {
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

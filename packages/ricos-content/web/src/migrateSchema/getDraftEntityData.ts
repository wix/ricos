import { RicosDecoration, RicosNode } from 'ricos-schema';
import {
  DRAFT_BLOCK_TYPE_TO_DATA_FIELD,
  ENTITY_DECORATION_TO_DATA_FIELD,
  ENTITY_DECORATION_TO_MUTABILITY,
  FROM_RICOS_ENTITY_TYPE_MAP,
  TO_RICOS_ENTITY_TYPE_MAP,
} from './consts';
import toCamelCase from 'to-camel-case';
import toSlugCase from 'to-slug-case';
import toSnakeCase from 'to-snake-case';
import { has } from 'lodash';
import {
  RICOS_DIVIDER_TYPE,
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
} from '..';
import { DraftBlockType } from 'draft-js';
import { Map as immutableMap } from 'immutable';

let latestEntityKey = 0;

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
  decoration: RicosDecoration
): { entityKey: number; entityMap: RicosEntityMap } => {
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

  return createEntity({ type, mutability, data });
};

export const createAtomicEntityData = (
  node: RicosNode
): { entityKey: number; entityMap: RicosEntityMap } => {
  const { type, data } = getNodeEntityData(node);
  return createEntity({ type, mutability: 'IMMUTABLE', data });
};

export const createTextBlockData = (node: RicosNode, blockType: DraftBlockType) => {
  const { textAlignment, dynamicStyles } = node[DRAFT_BLOCK_TYPE_TO_DATA_FIELD[blockType]] || {};
  return immutableMap(
    Object.assign(
      {},
      textAlignment ? { textAlignment: textAlignment.toString().toLowerCase() } : undefined,
      dynamicStyles
        ? {
            dynamicStyles: Object.fromEntries(
              Object.entries(dynamicStyles).map(([key, value]) => [toSlugCase(key), value])
            ),
          }
        : undefined
    )
  );
};

const keysToSnakeCase = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value]));

const createEntity = ({
  type,
  mutability,
  data,
}: RicosEntity): { entityKey: number; entityMap: RicosEntityMap } => {
  const entityKey = latestEntityKey;
  latestEntityKey += 1;
  return { entityKey, entityMap: { [entityKey.toString()]: { type, mutability, data } } };
};

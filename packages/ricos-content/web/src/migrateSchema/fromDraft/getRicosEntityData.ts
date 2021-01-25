/* eslint-disable fp/no-delete */
import { RicosEntityMap, RicosContentBlock } from '../..';
import toConstantCase from 'to-constant-case';
import toCamelCase from 'to-camel-case';
import {
  VIDEO_TYPE,
  VIDEO_TYPE_LEGACY,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  IMAGE_TYPE,
  IMAGE_TYPE_LEGACY,
  VERTICAL_EMBED_TYPE,
  POLL_TYPE,
  MENTION_TYPE,
  GALLERY_TYPE,
  HTML_TYPE,
  GIPHY_TYPE,
  LINK_PREVIEW_TYPE,
  SOUND_CLOUD_TYPE,
} from '../../consts';
import { TO_RICOS_ENTITY_TYPE_MAP, TO_RICOS_PLUGIN_TYPE_MAP } from '../consts';
import { has } from 'lodash';

const migrateVideoData = data => {
  // src is split into src for objects and url for strings
  if (typeof data.src === 'string') {
    data.url = data.src;
    delete data.src;
  }
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
  if (data.metadata) {
    data.metadata = keysToCamelCase(data.metadata);
  }
};

const migrateDividerData = data => {
  has(data, 'type') && (data.type = toConstantCase(data.type));
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
};

const migrateFileData = data => {
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
};

const migrateImageData = data => {
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
  has(data, 'src.original_file_name') && (data.src.originalFileName = data.src.original_file_name);
  has(data, 'src.file_name') && (data.src.fileName = data.src.file_name);
};

const migrateGalleryData = data => {
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
};

const migratePollData = data => {
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
  has(data, 'layout.poll.type') && (data.layout.poll.type = toConstantCase(data.layout.poll.type));
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = toConstantCase(data.layout.poll.direction));
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = toConstantCase(data.design.poll.backgroundType));
};

const migrateVerticalEmbedData = data => {
  has(data, 'type') && (data.type = toConstantCase(data.type));
};

const migrateHtmlData = data => {
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
};

const migrateGiphyData = data => {
  has(data, 'configViewer.sizes.desktop') &&
    (data.configViewer.sizes.desktop = toConstantCase(data.configViewer.sizes.desktop));
  has(data, 'configViewer.sizes.mobile') &&
    (data.configViewer.sizes.mobile = toConstantCase(data.configViewer.sizes.mobile));
};

const migrateLinkPreviewData = data => {
  has(data, 'thumbnail_url') && (data.thumbnailUrl = data.thumbnail_url);
  has(data, 'provider_url') && (data.providerUrl = data.provider_url);
};

const migrateSoundCloudData = data => {
  if (data.metadata) {
    data.metadata = keysToCamelCase(data.metadata);
  }
};

export const getEntity = (key: string | number, entityMap: RicosEntityMap) => {
  const { type, data } = entityMap[key];
  const dataFieldName = TO_RICOS_ENTITY_TYPE_MAP[type];
  if (!dataFieldName) {
    // eslint-disable-next-line no-console
    console.error(`ERROR! Unknown entity type "${type}"!`);
    process.exit(1);
  }

  switch (type) {
    case MENTION_TYPE:
      data.name = data.mention.name;
      data.slug = data.mention.slug;
      delete data.mention;
      break;
    case VIDEO_TYPE:
    case VIDEO_TYPE_LEGACY:
      migrateVideoData(data);
      break;
    case DIVIDER_TYPE:
      migrateDividerData(data);
      break;
    case FILE_UPLOAD_TYPE:
      migrateFileData(data);
      break;
    case IMAGE_TYPE:
    case IMAGE_TYPE_LEGACY:
      migrateImageData(data);
      break;
    case GALLERY_TYPE:
      migrateGalleryData(data);
      break;
    case POLL_TYPE:
      migratePollData(data);
      break;
    case VERTICAL_EMBED_TYPE:
      migrateVerticalEmbedData(data);
      break;
    case HTML_TYPE:
      migrateHtmlData(data);
      break;
    case GIPHY_TYPE:
      migrateGiphyData(data);
      break;
    case LINK_PREVIEW_TYPE:
      migrateLinkPreviewData(data);
      break;
    case SOUND_CLOUD_TYPE:
      migrateSoundCloudData(data);
      break;
    default:
  }

  return { type: TO_RICOS_PLUGIN_TYPE_MAP[type], [dataFieldName]: data };
};

export const parseBlockData = (blockData?: RicosContentBlock['data']) => {
  const { textAlignment, dynamicStyles } = blockData || {};
  return Object.assign(
    {},
    textAlignment ? { textAlignment: textAlignment.toUpperCase() } : undefined,
    dynamicStyles
      ? {
          dynamicStyles: keysToCamelCase(dynamicStyles),
        }
      : undefined
  );
};

const keysToCamelCase = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [toCamelCase(key), value]));

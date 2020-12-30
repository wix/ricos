import { RicosEntityMap, RicosContentBlock } from '..';
import toConstantCase from 'to-constant-case';

import {
  ANCHOR_TYPE,
  VIDEO_TYPE,
  VIDEO_TYPE_LEGACY,
  DIVIDER_TYPE,
  IMAGE_TYPE,
  IMAGE_TYPE_LEGACY,
  VERTICAL_EMBED_TYPE,
  POLL_TYPE,
  MENTION_TYPE,
} from '../consts';

import { TO_RICOS_ENTITY_TYPE_MAP, TO_RICOS_PLUGIN_TYPE_MAP } from './consts';

const migrateVideoData = data => {
  // src is split into src for objects and url for strings
  if (typeof data.src === 'string') {
    data.url = data.src;
    delete data.src;
  } else {
    data.config.size = toConstantCase(data.config.size);
    data.config.alignment = toConstantCase(data.config.alignment);
  }
};

const migrateDividerData = data => {
  data.type = toConstantCase(data.type);
  data.config.size = toConstantCase(data.config.size);
  data.config.alignment = toConstantCase(data.config.alignment);
};

const migrateImageData = data => {
  data.config.size = toConstantCase(data.config.size);
  data.config.alignment = toConstantCase(data.config.alignment);
};

const migratePollData = data => {
  data.config.size = toConstantCase(data.config.size);
  data.config.alignment = toConstantCase(data.config.alignment);
  data.layout.poll.type = toConstantCase(data.layout.poll.type);
  data.layout.poll.direction = toConstantCase(data.layout.poll.direction);
  data.design.backgroundType = toConstantCase(data.design.backgroundType);
};

const migrateVerticalEmbedData = data => {
  data.type = toConstantCase(data.type);
};

export const getEntity = (
  key: string | number,
  entityMap: RicosEntityMap,
  keyMapping: Record<string, string>
) => {
  const { type, data } = entityMap[key];
  const dataFieldName = TO_RICOS_ENTITY_TYPE_MAP[type];
  if (!dataFieldName) {
    // eslint-disable-next-line no-console
    console.error(`ERROR! Unknown entity type "${type}"!`);
    process.exit(1);
  }

  switch (type) {
    case ANCHOR_TYPE:
      // Remap anchor key for text blocks
      if (keyMapping[data.anchor]) {
        data.anchor = keyMapping[data.anchor];
      }
      break;
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
    case IMAGE_TYPE:
    case IMAGE_TYPE_LEGACY:
      migrateImageData(data);
      break;
    case POLL_TYPE:
      migratePollData(data);
      break;
    case VERTICAL_EMBED_TYPE:
      migrateVerticalEmbedData(data);
      break;
    default:
  }

  return { type: TO_RICOS_PLUGIN_TYPE_MAP[type], [dataFieldName]: data };
};

export const parseBlockData = (blockData?: RicosContentBlock['data']) => {
  const { textAlignment } = blockData || {};
  return Object.assign(
    {},
    textAlignment ? { textAlignment: textAlignment.toUpperCase() } : undefined
  );
};

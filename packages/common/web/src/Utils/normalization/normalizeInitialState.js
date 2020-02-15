import { cloneDeep, mapValues } from 'lodash';
import { processContentState } from './processContentState';
import {
  IMAGE_TYPE,
  VIDEO_TYPE,
  LINK_TYPE,
  VIDEO_TYPE_LEGACY,
  IMAGE_TYPE_LEGACY,
  GALLERY_TYPE,
} from '../../consts';
import { linkDataNormalizer, imageDataNormalizer } from './dataNormalizers';

const dataNormalizers = {
  [LINK_TYPE]: linkDataNormalizer,
  [IMAGE_TYPE]: imageDataNormalizer,
};

const normalizeComponentData = (type, componentData, config) =>
  dataNormalizers[type](componentData, config);

/* eslint-disable */

// TODO: create configNormalizers map and separate the IMAGE and VIDEO normalizers
const normalizeComponentConfig = (entityType, componentData, config) => {
  if (
    entityType === GALLERY_TYPE &&
    config?.config?.[entityType]?.displayTitleDefault !== undefined
  ) {
    const { items } = componentData;
    const displayTitleDefault = config?.config?.[entityType]?.displayTitleDefault;
    return {
      ...componentData,
      items: items.map(item => ({ displayTitle: displayTitleDefault, ...item })),
      config: {
        ...componentData.config,
        displayTitle: displayTitleDefault,
      },
    };
  } else {
    if (componentData.config) {
      return componentData;
    }

    const configPatch = {};
    const { alignment, size, src, oembed } = componentData;
    if (alignment) {
      delete componentData.alignment;
      configPatch.alignment = alignment;
      configPatch.size = 'small';
    } else {
      if (size) {
        delete componentData.size;
        if (size === 'smallCenter') {
          configPatch.size = 'small';
          configPatch.alignment = 'center';
        } else if (size === 'fullWidth') {
          configPatch.size = 'fullWidth';
          configPatch.alignment = 'center';
        }
      } else {
        config.size = src && src.width && src.width <= 740 ? 'original' : 'content';
        config.alignment = 'center';
      }
    }
    const patch = { config: configPatch };

    if (oembed) {
      delete componentData.url;
      delete componentData.oembed;
      patch.src = oembed.video_url;
      patch.metadata = { oembed };
    }

    return { ...componentData, patch };
  }
};
/* eslint-enable */

const entityTypeMap = {
  configNormalization: {
    [IMAGE_TYPE_LEGACY]: IMAGE_TYPE,
    [VIDEO_TYPE_LEGACY]: VIDEO_TYPE,
    [GALLERY_TYPE]: GALLERY_TYPE,
  },
  dataNormalization: {
    [LINK_TYPE]: LINK_TYPE,
    [IMAGE_TYPE]: IMAGE_TYPE,
  },
};

const shouldNormalizeEntity = (entity, normalizationMap) =>
  Object.keys(normalizationMap).includes(entity.type) && entity.data;

const shouldNormalizeEntityConfig = entity =>
  shouldNormalizeEntity(entity, entityTypeMap.configNormalization);

const shouldNormalizeEntityData = entity =>
  shouldNormalizeEntity(entity, entityTypeMap.dataNormalization);

const normalizeEntityMap = (entityMap, config) => {
  const normalizeType = (key, obj) => obj[key] || key;

  return mapValues(entityMap, entity => {
    let newEntity = entity;
    if (shouldNormalizeEntityConfig(entity)) {
      newEntity = {
        ...entity,
        type: normalizeType(entity.type, entityTypeMap.configNormalization),
        data: normalizeComponentConfig(entity.type, cloneDeep(entity.data), config),
      };
    } else if (shouldNormalizeEntityData(entity)) {
      newEntity = {
        ...entity,
        type: normalizeType(entity.type, entityTypeMap.dataNormalization),
        data: normalizeComponentData(entity.type, cloneDeep(entity.data), config),
      };
    }
    return newEntity;
  });
};
export default (initialState, config = {}) => {
  const { blocks, entityMap, VERSION } = processContentState(initialState, config);
  return {
    blocks,
    entityMap: normalizeEntityMap(entityMap, config),
    VERSION,
  };
};

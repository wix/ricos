import { cloneDeep, mapValues } from 'lodash';
import { processContentState } from './processContentState';
import {
  IMAGE_TYPE,
  VIDEO_TYPE,
  LINK_TYPE,
  GALLERY_TYPE,
  VIDEO_TYPE_LEGACY,
  IMAGE_TYPE_LEGACY,
} from '../../consts';
import { linkDataNormalizer, imageDataNormalizer, galleryDataNormalizer } from './dataNormalizers';

const dataNormalizers = {
  [LINK_TYPE]: linkDataNormalizer,
  [IMAGE_TYPE]: imageDataNormalizer,
  [GALLERY_TYPE]: galleryDataNormalizer,
};

const normalizeComponentData = (type, componentData, config, version) =>
  dataNormalizers[type](componentData, config, version);

/* eslint-disable */

// TODO: create configNormalizers map and separate the IMAGE and VIDEO normalizers
const normalizeComponentConfig = componentData => {
  if (componentData.config) {
    return componentData;
  }

  const config = {};
  const { alignment, size, src, oembed } = componentData;
  if (alignment) {
    delete componentData.alignment;
    config.alignment = alignment;
    config.size = 'small';
  } else {
    if (size) {
      delete componentData.size;
      if (size === 'smallCenter') {
        config.size = 'small';
        config.alignment = 'center';
      } else if (size === 'fullWidth') {
        config.size = 'fullWidth';
        config.alignment = 'center';
      }
    } else {
      config.size = src && src.width && src.width <= 740 ? 'original' : 'content';
      config.alignment = 'center';
    }
  }
  const patch = { config };

  if (oembed) {
    delete componentData.url;
    delete componentData.oembed;
    patch.src = oembed.video_url;
    patch.metadata = { oembed };
  }

  return { ...componentData, ...patch };
};
/* eslint-enable */

const entityTypeMap = {
  configNormalization: {
    [IMAGE_TYPE_LEGACY]: IMAGE_TYPE,
    [VIDEO_TYPE_LEGACY]: VIDEO_TYPE,
  },
  dataNormalization: {
    [LINK_TYPE]: LINK_TYPE,
    [IMAGE_TYPE]: IMAGE_TYPE,
    [GALLERY_TYPE]: GALLERY_TYPE,
  },
};

const shouldNormalizeEntity = (entity, normalizationMap) =>
  Object.keys(normalizationMap).includes(entity.type) && entity.data;

const shouldNormalizeEntityConfig = entity =>
  shouldNormalizeEntity(entity, entityTypeMap.configNormalization);

const shouldNormalizeEntityData = entity =>
  shouldNormalizeEntity(entity, entityTypeMap.dataNormalization);

const normalizeEntityMap = (entityMap, config, stateVersion) => {
  const normalizeType = (key, obj) => obj[key] || key;

  return mapValues(entityMap, entity => {
    let newEntity = entity;
    if (shouldNormalizeEntityConfig(entity)) {
      newEntity = {
        ...entity,
        type: normalizeType(entity.type, entityTypeMap.configNormalization),
        data: normalizeComponentConfig(cloneDeep(entity.data), config),
      };
    } else if (shouldNormalizeEntityData(entity)) {
      newEntity = {
        ...entity,
        type: normalizeType(entity.type, entityTypeMap.dataNormalization),
        data: normalizeComponentData(entity.type, cloneDeep(entity.data), config, stateVersion),
      };
    }
    return newEntity;
  });
};
export default (initialState, config = {}) => {
  const { blocks, entityMap, VERSION } = processContentState(initialState, config);
  return {
    blocks,
    entityMap: normalizeEntityMap(entityMap, config, initialState.VERSION || '0.0.0'),
    VERSION,
  };
};

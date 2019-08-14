import { cloneDeep, isUndefined, mapValues } from 'lodash';
import { processContentState } from './processContentState';

const normalizeEntityType = (entityType, entityTypeMap) => {
  if (entityType in entityTypeMap) {
    return entityTypeMap[entityType];
  } else {
    return entityType;
  }
};

/* eslint-disable */
const dataNormalizers = {
  // converts { targetBlank, nofollow } => { target, rel }
  LINK: (componentData, { anchorTarget, relValue }) => {
    const { targetBlank, nofollow, target, rel } = componentData;
    if (
      isUndefined(targetBlank) &&
      isUndefined(nofollow) &&
      !isUndefined(target) &&
      !isUndefined(rel)
    ) {
      return componentData;
    }

    delete componentData.targetBlank;
    delete componentData.nofollow;

    return {
      ...componentData,
      target: targetBlank ? '_blank' : anchorTarget || '_self',
      rel: nofollow ? 'nofollow' : relValue || 'noopener',
    };
  },
};

const normalizeComponentData = (type, componentData, config) =>
  dataNormalizers[type](componentData, config);

// TODO: create configNormalizers map and separate the IMAGE and VIDEO normalizers
const normalizeComponentConfig = componentData => {
  if (componentData.config) {
    return componentData;
  }

  const patch = { config: {} };
  const { alignment, size, src, oembed } = componentData;
  if (alignment) {
    delete componentData.alignment;
    patch.config.alignment = alignment;
    patch.config.size = 'small';
  } else {
    if (size) {
      delete componentData.size;
      if (size === 'smallCenter') {
        patch.config.size = 'small';
        patch.config.alignment = 'center';
      } else if (size === 'fullWidth') {
        patch.config.size = 'fullWidth';
        patch.config.alignment = 'center';
      }
    } else {
      patch.config.size = src && src.width && src.width <= 740 ? 'original' : 'content';
      patch.config.alignment = 'center';
    }
  }

  if (oembed) {
    delete componentData.url;
    delete componentData.oembed;
    patch.src = oembed.video_url;
    patch.metadata = { oembed };
  }

  return Object.assign({}, componentData, patch);
};
/* eslint-enable */

const shouldNormalizeEntityConfig = (entity, normalizationMap) =>
  normalizationMap.includes(entity.type) && entity.data;

const shouldNormalizeEntityData = (entity, normalizationMap) =>
  normalizationMap.includes(entity.type) && entity.data;

export default (initialState, config = {}) => {
  const entityTypeMap = {
    configNormalization: {
      IMAGE: 'wix-draft-plugin-image',
      'VIDEO-EMBED': 'wix-draft-plugin-video',
    },
    dataNormalization: {
      LINK: 'LINK',
    },
  };

  const processedState = processContentState(initialState, config);

  return {
    blocks: processedState.blocks,
    entityMap: mapValues(processedState.entityMap, entity =>
      shouldNormalizeEntityConfig(entity, Object.keys(entityTypeMap.configNormalization))
        ? {
            ...entity,
            type: normalizeEntityType(entity.type, entityTypeMap.configNormalization),
            data: normalizeComponentConfig(cloneDeep(entity.data), config),
          }
        : shouldNormalizeEntityData(entity, Object.keys(entityTypeMap.dataNormalization))
        ? {
            ...entity,
            type: normalizeEntityType(entity.type, entityTypeMap.dataNormalization),
            data: normalizeComponentData(entity.type, cloneDeep(entity.data), config),
          }
        : entity
    ),
    VERSION: processedState.VERSION,
  };
};

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
import { ComponentData, RicosContent, NormalizeConfig, RicosEntity } from '../../types';

const dataNormalizers = {
  [LINK_TYPE]: linkDataNormalizer,
  [IMAGE_TYPE]: imageDataNormalizer,
  [GALLERY_TYPE]: galleryDataNormalizer,
};

const normalizeComponentData = (
  type: RicosEntity['type'],
  componentData: ComponentData,
  config: NormalizeConfig,
  version: string
) => dataNormalizers[type](componentData, config, version);

/* eslint-disable */

// TODO: create configNormalizers map and separate the IMAGE and VIDEO normalizers
const normalizeComponentConfig = (componentData: ComponentData) => {
  if (componentData.config) {
    return componentData;
  }

  const config: ComponentData['config'] = {};
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
  const patch: ComponentData = { config };

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

const shouldNormalizeEntity = (entity: RicosEntity, normalizationMap) =>
  Object.keys(normalizationMap).includes(entity.type) && entity.data;

const shouldNormalizeEntityConfig = (entity: RicosEntity) =>
  shouldNormalizeEntity(entity, entityTypeMap.configNormalization);

const shouldNormalizeEntityData = (entity: RicosEntity) =>
  shouldNormalizeEntity(entity, entityTypeMap.dataNormalization);

const normalizeEntityMap = (
  entityMap: RicosContent['entityMap'],
  config: NormalizeConfig,
  stateVersion: string
) => {
  const normalizeType = (key, obj) => obj[key] || key;

  return mapValues(entityMap, entity => {
    let newEntity = entity;
    if (shouldNormalizeEntityConfig(entity)) {
      newEntity = {
        ...entity,
        type: normalizeType(entity.type, entityTypeMap.configNormalization),
        data: normalizeComponentConfig(cloneDeep(entity.data)),
      };
    } else if (shouldNormalizeEntityData(entity)) {
      newEntity = {
        ...entity,
        type: normalizeType(entity.type, entityTypeMap.dataNormalization),
        data: normalizeComponentData(entity.type, cloneDeep(entity.data), config, stateVersion),
      };
    }
    anchorNormalize(newEntity);
    return newEntity;
  });
};

const anchorNormalize = newEntity => {
  if (newEntity.type === 'ANCHOR') {
    newEntity.type = 'LINK';
  }
  if (
    newEntity.type === 'wix-draft-plugin-image' &&
    !!newEntity.data.config.anchor &&
    !newEntity.data.config.link
  ) {
    const { anchor, ...rest } = newEntity.data.config;
    newEntity.data = {
      ...newEntity.data,
      config: {
        ...rest,
        link: { anchor },
      },
    };
  }
};

export default (content: RicosContent, config: NormalizeConfig = {}) => {
  const clonedContent = cloneDeep(content);
  const { blocks, entityMap, VERSION } = processContentState(clonedContent, config);
  return {
    blocks,
    entityMap: normalizeEntityMap(entityMap, config, content.VERSION || '0.0.0'),
    VERSION,
  };
};

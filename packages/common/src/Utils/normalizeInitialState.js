import mapValues from 'lodash/mapValues';
import cloneDeep from 'lodash/cloneDeep';

const normalizeEntityType = (entityType, entityTypeMap) => {
  if (entityType in entityTypeMap) {
    return entityTypeMap[entityType];
  } else {
    return entityType;
  }
};

/* eslint-disable */
const normalizeComponentData = componentData => {
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

const shouldNormalizeEntity = (entity, legacyEntityTypes) => legacyEntityTypes.includes(entity.type) && entity.data;

export default (initialState, entityTypeMap) => ({
  ...initialState,
  entityMap: mapValues(
    initialState.entityMap,
    entity => shouldNormalizeEntity(entity, Object.keys(entityTypeMap)) ? {
      ...entity,
      type: normalizeEntityType(entity.type, entityTypeMap),
      data: normalizeComponentData(cloneDeep(entity.data))
    } : entity
  ),
});

import mapValues from 'lodash/mapValues';
import cloneDeep from 'lodash/cloneDeep';
import { IMAGE_TYPE_LEGACY } from '~/Plugins/wix-draft-plugin-image/types';
import { VIDEO_TYPE_LEGACY } from '~/Plugins/wix-draft-plugin-video/types';

/* eslint-disable */
const normalizeComponentData = componentData => {
  if (componentData.config) {
    return null;
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
      if (src && src.width && src.width <= 740) {
        patch.config.size = 'original';
        patch.config.alignment = 'left';
      } else {
        patch.config.size = 'content';
        patch.config.alignment = 'center';
      }
    }
  }

  if (oembed) {
    delete componentData.url;
    patch.src = oembed.video_url;
  }

  return Object.assign({}, componentData, patch);
};
/* eslint-enable */

const shouldNormalizeEntityData = entity =>
  [IMAGE_TYPE_LEGACY, VIDEO_TYPE_LEGACY].includes(entity.type) && entity.data;

export default initialState => ({
  ...initialState,
  entityMap: mapValues(
    initialState.entityMap,
    entity => shouldNormalizeEntityData(entity) ? {
      ...entity,
      data: normalizeComponentData(cloneDeep(entity.data))
    } : entity
  ),
});

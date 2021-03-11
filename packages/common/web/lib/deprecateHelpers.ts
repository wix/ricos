import { RicosHooks, LegacyEditorPluginConfig, LegacyViewerPluginConfig } from '../src/types';
import { IMAGE_TYPE, GALLERY_TYPE } from 'ricos-content';
import { Helpers } from '../src';

export const deprecateHelpers = (
  helpers: Helpers,
  config: LegacyEditorPluginConfig | LegacyViewerPluginConfig,
  hooks?: RicosHooks
) => {
  const { onExpand } = helpers;
  if (onExpand) {
    const galleryConfig = config[GALLERY_TYPE];
    const imageConfig = config[IMAGE_TYPE];
    if (galleryConfig) {
      galleryConfig.onExpand = onExpand;
    }
    if (imageConfig) {
      imageConfig.onExpand = onExpand;
    }
    // eslint-disable-next-line fp/no-delete
    delete helpers.onExpand;
  }
  if (hooks) {
    Object.entries(helpers).forEach(([key, value]) => {
      hooks[key] = value;
    });
  }
};

import { VERTICAL_EMBED_TYPE, DEFAULTS } from './constants';
import { typeMapper } from './typeMapper';
export { typeMapper as verticalEmbedTypeMapper, VERTICAL_EMBED_TYPE };

export const pluginVerticalEmbed = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: VERTICAL_EMBED_TYPE,
    typeMapper,
  };
};

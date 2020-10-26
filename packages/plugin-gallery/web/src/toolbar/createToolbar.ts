import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  AnchorTarget,
  TranslationFunction,
  PluginConfig,
  RelValue,
} from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  anchorTarget,
  relValue,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, t, anchorTarget, relValue }),
    InsertButtons: createInsertButtons({ settings, t }),
    name: 'gallery',
  };
};

export default createToolbar;

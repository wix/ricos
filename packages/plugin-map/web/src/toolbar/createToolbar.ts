import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  TranslationFunction,
  PluginConfig,
  GetEditorBounds,
  Helpers,
} from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  settings,
  helpers,
  t,
  getEditorBounds,
  isMobile,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
  getEditorBounds: GetEditorBounds;
  helpers: Helpers;
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, helpers, t, getEditorBounds, isMobile }),
    InsertButtons: createInsertButtons({ t, settings }),
    name: 'map',
  };
};

export default createToolbar;

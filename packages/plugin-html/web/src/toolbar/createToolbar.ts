import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  TranslationFunction,
  PluginConfig,
  Helpers,
  GetEditorBounds,
} from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  helpers,
  t,
  isMobile,
  settings,
  getEditorBounds,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
  helpers: Helpers;
  getEditorBounds: GetEditorBounds;
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, getEditorBounds }),
    InsertButtons: isMobile ? [] : createInsertButtons({ helpers, t, settings }),
    name: 'html',
  };
};

export default createToolbar;

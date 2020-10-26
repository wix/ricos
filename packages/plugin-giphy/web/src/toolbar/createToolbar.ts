import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction, PluginConfig } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile }),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: 'giphy',
  };
};

export default createToolbar;

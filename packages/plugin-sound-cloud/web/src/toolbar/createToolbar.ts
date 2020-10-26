import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction, PluginConfig } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  isMobile,
  settings,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons({ t, isMobile, settings }),
    InsertButtons: createInsertButtons({ t, isMobile, settings }),
    name: 'soundCloud',
  };
};

export default createToolbar;

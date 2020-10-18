import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction, PluginConfig } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  locale,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
  locale: string;
}) => {
  return {
    InlineButtons: createInlineButtons({ t, isMobile, settings, locale }),
    InsertButtons: createInsertButtons({ t, settings, isMobile, locale }),
    name: 'vertical-embed',
  };
};

export default createToolbar;

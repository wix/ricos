import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction, PluginConfig } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  customTooltip,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
  customTooltip: string;
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, isMobile }),
    InsertButtons: createInsertButtons({ t, settings, customTooltip }),
    name: 'button',
  };
};

export default createToolbar;

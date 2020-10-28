import { createInlineButtons } from './inline-buttons';
import { createInsertButtons } from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction, PluginConfig } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  settings,
  styles,
  t,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  styles: Record<string, string>;
}) => {
  return {
    InlineButtons: createInlineButtons({ styles, t, settings }),
    InsertButtons: createInsertButtons({ t, settings }),
    name: 'divider',
  };
};

export default createToolbar;

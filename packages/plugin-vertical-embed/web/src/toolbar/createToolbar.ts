import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import { VerticalEmbedPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  locale,
}: {
  t: TranslationFunction;
  settings: VerticalEmbedPluginEditorConfig;
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

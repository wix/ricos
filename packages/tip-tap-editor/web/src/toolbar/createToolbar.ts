import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import { ButtonPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  customTooltip,
}: {
  t: TranslationFunction;
  settings: ButtonPluginEditorConfig;
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

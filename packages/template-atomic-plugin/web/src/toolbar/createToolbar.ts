import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import { YourPluginNamePluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: YourPluginNamePluginEditorConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons(),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: 'yourPluginName',
  };
};

export default createToolbar;

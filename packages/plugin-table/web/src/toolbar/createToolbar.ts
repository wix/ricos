import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import { TablePluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: TablePluginEditorConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons(),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: 'table',
  };
};

export default createToolbar;

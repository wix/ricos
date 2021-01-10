import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import { UnsupportedBlocksPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: UnsupportedBlocksPluginEditorConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons(),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: 'unsupported-blocks',
  };
};

export default createToolbar;

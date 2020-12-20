import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import { VideoPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: VideoPluginEditorConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile }),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: 'video',
  };
};

export default createToolbar;

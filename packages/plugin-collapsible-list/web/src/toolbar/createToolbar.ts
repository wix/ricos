import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { COLLAPSIBLE_LIST_TYPE, CollapsibleListPluginEditorConfig } from '../types';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  isMobile,
  settings,
}: {
  t: TranslationFunction;
  settings: CollapsibleListPluginEditorConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons({
      t,
    }),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: COLLAPSIBLE_LIST_TYPE,
  };
};

export default createToolbar;

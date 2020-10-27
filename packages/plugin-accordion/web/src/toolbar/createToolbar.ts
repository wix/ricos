import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { ACCORDION_TYPE } from '../types';
import { CreatePluginToolbar, TranslationFunction, PluginConfig } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  isMobile,
  settings,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons({
      t,
    }),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: ACCORDION_TYPE,
  };
};

export default createToolbar;

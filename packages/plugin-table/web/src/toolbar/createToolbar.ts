import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction, PluginConfig } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
}) => {
  return {
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: 'table',
  };
};

export default createToolbar;

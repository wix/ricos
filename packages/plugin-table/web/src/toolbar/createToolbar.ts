import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import { TablePluginEditorConfig, TABLE_TYPE } from '../types';

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
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: TABLE_TYPE,
  };
};

export default createToolbar;

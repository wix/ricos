import createInlineButtons from './inline-buttons';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import { UnavailableOnOneAppPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: UnavailableOnOneAppPluginEditorConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons(),
    name: 'unavailableononeapp',
  };
};

export default createToolbar;

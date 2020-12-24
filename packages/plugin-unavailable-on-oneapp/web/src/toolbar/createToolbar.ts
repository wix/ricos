import createInlineButtons from './inline-buttons';
import { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import { UnavailableOnOneAppPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = () => {
  return {
    InlineButtons: createInlineButtons(),
    name: 'unavailableononeapp',
  };
};

export default createToolbar;

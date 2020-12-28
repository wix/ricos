import createInlineButtons from './inline-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = () => {
  return {
    InlineButtons: createInlineButtons(),
    name: 'unsupported-blocks',
  };
};

export default createToolbar;

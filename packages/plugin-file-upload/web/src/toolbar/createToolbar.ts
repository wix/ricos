import createInsertButtons from './insert-buttons';
import createInlineButtons from './inline-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({ helpers, settings, t }) => {
  return {
    InlineButtons: createInlineButtons({ settings, t }),
    InsertButtons: createInsertButtons({ helpers, settings, t }),
    name: 'FileUpload',
  };
};

export default createToolbar;

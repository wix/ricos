import createInsertButtons from './insert-buttons';
import createInlineButtons from './inline-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({ settings, t }) => {
  return {
    InlineButtons: createInlineButtons({ settings, t }),
    InsertButtons: createInsertButtons({ settings, t }),
    name: 'FileUpload',
  };
};

export default createToolbar;

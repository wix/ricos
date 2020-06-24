import createInsertButtons from './insert-buttons';
import createInlineButtons from './inline-buttons';

const createToolbar: CreatePluginToolbar = ({ helpers, settings, t }) => {
  return {
    InlineButtons: createInlineButtons({ settings, t }),
    InsertButtons: createInsertButtons({ helpers, settings, t }),
    name: 'FileUpload',
  };
};

export default createToolbar;

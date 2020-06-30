import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({ settings, helpers, t, anchorTarget, relValue }) => {
  return {
    InlineButtons: createInlineButtons({ settings, t, anchorTarget, relValue }),
    InsertButtons: createInsertButtons({ settings, helpers, t }),
    name: 'gallery',
  };
};

export default createToolbar;

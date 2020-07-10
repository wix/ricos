import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({ settings, t, anchorTarget, relValue }) => {
  return {
    InlineButtons: createInlineButtons({ settings, t, anchorTarget, relValue }),
    InsertButtons: createInsertButtons({ settings, t }),
    name: 'gallery',
  };
};

export default createToolbar;

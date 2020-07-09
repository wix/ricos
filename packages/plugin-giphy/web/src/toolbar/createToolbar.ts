import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({ t, settings, isMobile }) => {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile }),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: 'giphy',
  };
};

export default createToolbar;

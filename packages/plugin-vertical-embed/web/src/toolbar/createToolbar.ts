import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({ settings, t, isMobile, locale }) => {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile, locale }),
    InsertButtons: createInsertButtons({ t, settings, isMobile, locale }),
    name: 'vertical-embed',
  };
};

export default createToolbar;

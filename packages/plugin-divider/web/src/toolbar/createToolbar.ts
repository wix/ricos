import { createInlineButtons } from './inline-buttons';
import { createInsertButtons } from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({ settings, styles, t }) => {
  return {
    InlineButtons: createInlineButtons({ styles, t, settings }),
    InsertButtons: createInsertButtons({ t, settings }),
    name: 'divider',
  };
};

export default createToolbar;

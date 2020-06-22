import { createInlineButtons } from './inline-buttons';
import { createInsertButtons } from './insert-buttons';

const createToolbar: CreatePluginToolbar = ({ settings, helpers, styles, t }) {
  return {
    InlineButtons: createInlineButtons({ styles, t, settings }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'divider',
  };
}

export default createToolbar;
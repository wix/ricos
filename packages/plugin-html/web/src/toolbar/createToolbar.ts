import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  helpers,
  t,
  isMobile,
  settings,
  getEditorBounds,
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, getEditorBounds }),
    InsertButtons: isMobile ? [] : createInsertButtons({ helpers, t, settings }),
    name: 'html',
  };
};

export default createToolbar;

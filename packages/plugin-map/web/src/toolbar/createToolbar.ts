import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  settings,
  helpers,
  t,
  getEditorBounds,
  isMobile,
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, helpers, t, getEditorBounds, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'map',
  };
};

export default createToolbar;

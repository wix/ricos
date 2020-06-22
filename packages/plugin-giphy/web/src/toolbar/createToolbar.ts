import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

const createToolbar: CreatePluginToolbar = ({ helpers, t, settings, isMobile }) => {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings, isMobile }),
    name: 'giphy',
  };
};

export default createToolbar;

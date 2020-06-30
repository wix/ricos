import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

const createToolbar: CreatePluginToolbar = ({ settings, helpers, t, isMobile }) => {
  return {
    InlineButtons: createInlineButtons({ t, isMobile, settings }),
    InsertButtons: createInsertButtons({ helpers, t, settings, isMobile }),
    name: 'vertical-embed',
  };
};

export default createToolbar;

import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

const createToolbar: CreatePluginToolbar = ({ settings, helpers, t, isMobile, customTooltip }) => {
  return {
    InlineButtons: createInlineButtons({ settings, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings, customTooltip }),
    name: 'button',
  };
};

export default createToolbar;

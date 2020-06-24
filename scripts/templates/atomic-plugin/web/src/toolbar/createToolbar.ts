import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ helpers, t, settings, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings, isMobile }),
    name: 'yourPluginName',
  };
}

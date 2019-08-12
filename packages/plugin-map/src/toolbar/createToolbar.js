import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, t, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ settings, helpers, t, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'map',
  };
}

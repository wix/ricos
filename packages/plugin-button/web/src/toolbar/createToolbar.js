import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, styles, t, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ settings, styles, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t }),
    name: 'button',
  };
}

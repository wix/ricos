import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, t, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ t, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings, isMobile }),
    name: 'vertical-embed',
  };
}

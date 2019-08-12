import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ helpers, t, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ t, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, isMobile }),
    name: 'soundCloud',
  };
}

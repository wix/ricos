import createInlineButtons from './inline-giphy-buttons';
import createInsertButtons from './insert-giphy-buttons';

export default function createToolbar({ helpers, t, settings, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings, isMobile }),
    name: 'giphy',
  };
}

import createInlineButtons from './inlineButtons';
import createInsertButtons from './insertButtons';

export default function createToolbar({ helpers, t, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ t }),
    InsertButtons: isMobile ? [] : createInsertButtons({ helpers, t }),
    name: 'html',
  };
}

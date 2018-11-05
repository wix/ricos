import createInlineButtons from './inlineButtons';
import createInsertButtons from './insertButtons';

export default function createToolbar({ helpers, t, isMobile, settings }) {
  return {
    InlineButtons: createInlineButtons({ t, settings }),
    InsertButtons: isMobile ? [] : createInsertButtons({ helpers, t }),
    name: 'html',
  };
}

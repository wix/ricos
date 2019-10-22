import createInlineButtons from './inlineButtons';
import createInsertButtons from './insertButtons';

export default function createToolbar({ helpers, t, isMobile, settings, getEditorBounds }) {
  return {
    InlineButtons: createInlineButtons({ t, settings, getEditorBounds }),
    InsertButtons: isMobile ? [] : createInsertButtons({ helpers, t }),
    name: 'html',
  };
}

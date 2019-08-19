import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, t, getEditorBounds, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ settings, helpers, t, getEditorBounds, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'map',
  };
}

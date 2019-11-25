import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, styles, t }) {
  return {
    InlineButtons: createInlineButtons({ styles, settings }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'divider',
  };
}

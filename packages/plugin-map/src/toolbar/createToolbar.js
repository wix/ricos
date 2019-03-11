import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, t }) {
  return {
    InlineButtons: createInlineButtons({ settings, helpers, t }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'map',
  };
}

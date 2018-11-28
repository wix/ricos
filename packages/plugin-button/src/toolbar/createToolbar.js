import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, styles, t }) {
  return {
    InlineButtons: createInlineButtons({ settings, styles }),
    InsertButtons: createInsertButtons({ helpers, t }),
    name: 'button'
  };
}

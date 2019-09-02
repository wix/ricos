import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ helpers, styles, t }) {
  return {
    InlineButtons: createInlineButtons({ styles }),
    InsertButtons: createInsertButtons({ helpers, t }),
    name: 'divider',
  };
}

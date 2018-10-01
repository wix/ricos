import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ helpers, t }) {
  return {
    InlineButtons: createInlineButtons({ t }),
    InsertButtons: createInsertButtons({ helpers, t }),
    name: 'soundCloud',
  };
}

import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ helpers, t, anchorTarget, relValue }) {
  return {
    InlineButtons: createInlineButtons({ t, anchorTarget, relValue }),
    InsertButtons: createInsertButtons({ helpers, t }),
    name: 'gallery',
  };
}

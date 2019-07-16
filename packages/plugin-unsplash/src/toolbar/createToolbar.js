import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ helpers, t, settings }) {
  return {
    InlineButtons: createInlineButtons({ t }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'unsplash',
  };
}

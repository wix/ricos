import createInlineButtons from './inline-giphy-buttons';
import createInsertButtons from './insert-giphy-buttons';

export default function createToolbar({ helpers, t, settings }) {
  return {
    InlineButtons: createInlineButtons({ t, settings }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'giphy',
  };
}

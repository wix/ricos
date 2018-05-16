import createInlineButtons from './inlineButtons';
import createInsertButtons from './insertButtons';

export default function createToolbar({ helpers, t }) {
  return {
    InlineButtons: createInlineButtons({ t }),
    InsertButtons: createInsertButtons({ helpers, t }),
    name: 'html',
  };
}

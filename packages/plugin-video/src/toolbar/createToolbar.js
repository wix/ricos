import createInlineButtons from './inline-video-buttons';
import createInsertButtons from './insert-video-buttons';

export default function createToolbar({ helpers, t }) {
  return {
    InlineButtons: createInlineButtons({ t }),
    InsertButtons: createInsertButtons({ helpers, t }),
    name: 'video',
  };
}

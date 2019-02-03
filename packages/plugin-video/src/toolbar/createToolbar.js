import createInlineButtons from './inline-video-buttons';
import createInsertButtons from './insert-video-buttons';

export default function createToolbar({ helpers, t, settings }) {
  return {
    InlineButtons: createInlineButtons({ t, settings }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'video',
  };
}

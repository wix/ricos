import createInlineButtons from './inline-video-buttons';
import createInsertButtons from './insert-video-buttons';

export default function createToolbar({ helpers, t, settings, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings, isMobile }),
    name: 'video',
  };
}

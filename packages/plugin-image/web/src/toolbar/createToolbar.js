import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({
  helpers,
  t,
  anchorTarget,
  relValue,
  uiSettings,
  isMobile,
  settings
}) {
  return {
    InlineButtons: createInlineButtons({ t, anchorTarget, relValue, uiSettings, isMobile, settings }),
    InsertButtons: createInsertButtons({ helpers, t }),
    name: 'image',
  };
}

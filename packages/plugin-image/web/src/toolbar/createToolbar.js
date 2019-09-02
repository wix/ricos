import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({
  helpers,
  t,
  anchorTarget,
  relValue,
  uiSettings,
  isMobile,
}) {
  return {
    InlineButtons: createInlineButtons({ t, anchorTarget, relValue, uiSettings, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t }),
    name: 'image',
  };
}

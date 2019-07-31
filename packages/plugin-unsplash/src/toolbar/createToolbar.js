import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({
  helpers,
  t,
  anchorTarget,
  relValue,
  uiSettings,
  settings,
  isMobile,
}) {
  return {
    InlineButtons: createInlineButtons({
      helpers,
      t,
      anchorTarget,
      relValue,
      uiSettings,
      settings,
      isMobile,
    }),
    InsertButtons: createInsertButtons({ helpers, t, settings, isMobile }),
    name: 'unsplash',
  };
}

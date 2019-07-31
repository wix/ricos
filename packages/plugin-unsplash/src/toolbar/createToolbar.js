import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({
  helpers,
  t,
  anchorTarget,
  relValue,
  uiSettings,
  settings,
}) {
  return {
    InlineButtons: createInlineButtons({
      helpers,
      t,
      anchorTarget,
      relValue,
      uiSettings,
      settings,
    }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'unsplash',
  };
}

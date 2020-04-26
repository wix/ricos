import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, styles, t, isMobile, customTooltip }) {
  return {
    InlineButtons: createInlineButtons({ settings, styles, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings, customTooltip }),
    name: 'button',
  };
}

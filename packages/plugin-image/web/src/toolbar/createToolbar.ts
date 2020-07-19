import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  anchorTarget,
  relValue,
  uiSettings,
  isMobile,
  settings,
}) => {
  return {
    InlineButtons: createInlineButtons({
      t,
      anchorTarget,
      relValue,
      uiSettings,
      isMobile,
      settings,
    }),
    InsertButtons: createInsertButtons({ t, settings }),
    name: 'image',
  };
};

export default createToolbar;

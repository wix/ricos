import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { ACCORDION_TYPE } from '../types';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({ t, isMobile, settings }) => {
  return {
    InlineButtons: createInlineButtons({
      t,
    }),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: ACCORDION_TYPE,
  };
};

export default createToolbar;

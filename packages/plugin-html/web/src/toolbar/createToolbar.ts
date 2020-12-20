import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  TranslationFunction,
  Helpers,
  GetEditorBounds,
} from 'wix-rich-content-common';
import { HtmlPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  helpers,
  t,
  isMobile,
  settings,
  getEditorBounds,
}: {
  t: TranslationFunction;
  settings: HtmlPluginEditorConfig;
  isMobile: boolean;
  helpers: Helpers;
  getEditorBounds: GetEditorBounds;
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, getEditorBounds }),
    InsertButtons: isMobile ? [] : createInsertButtons({ helpers, t, settings }),
    name: 'html',
  };
};

export default createToolbar;

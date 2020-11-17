import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  TranslationFunction,
  GetEditorBounds,
  Helpers,
} from 'wix-rich-content-common';
import { MapPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  helpers,
  t,
  getEditorBounds,
  isMobile,
}: {
  t: TranslationFunction;
  settings: MapPluginEditorConfig;
  isMobile: boolean;
  getEditorBounds: GetEditorBounds;
  helpers: Helpers;
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, helpers, t, getEditorBounds, isMobile }),
    InsertButtons: createInsertButtons({ t, settings }),
    name: 'map',
  };
};

export default createToolbar;

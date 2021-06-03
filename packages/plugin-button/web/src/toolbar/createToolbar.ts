import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  AnchorTarget,
  CreatePluginToolbar,
  RelValue,
  TranslationFunction,
} from 'wix-rich-content-common';
import { ButtonPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  customTooltip,
  relValue,
  anchorTarget,
}: {
  t: TranslationFunction;
  settings: ButtonPluginEditorConfig;
  isMobile: boolean;
  customTooltip: string;
  relValue: RelValue;
  anchorTarget: AnchorTarget;
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, isMobile, relValue, anchorTarget }),
    InsertButtons: createInsertButtons({ t, settings, customTooltip, relValue, anchorTarget }),
    name: 'button',
  };
};

export default createToolbar;

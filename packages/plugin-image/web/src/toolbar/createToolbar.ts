import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  TranslationFunction,
  AnchorTarget,
  RelValue,
  UISettings,
} from 'wix-rich-content-common';
import { ImagePluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  anchorTarget,
  relValue,
  uiSettings,
  isMobile,
  settings,
}: {
  t: TranslationFunction;
  settings: ImagePluginEditorConfig;
  isMobile: boolean;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
  uiSettings: UISettings;
}) => {
  const disableDownload = uiSettings?.disableDownload;
  const disableExpand = settings?.disableExpand;

  return {
    InlineButtons: createInlineButtons({
      t,
      anchorTarget,
      relValue,
      uiSettings,
      isMobile,
      settings,
    }),
    InsertButtons: createInsertButtons({ t, settings, disableDownload, disableExpand }),
    name: 'image',
  };
};

export default createToolbar;

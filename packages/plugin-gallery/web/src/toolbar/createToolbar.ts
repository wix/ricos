import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  AnchorTarget,
  TranslationFunction,
  RelValue,
  UISettings,
} from 'wix-rich-content-common';
import { GalleryPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  anchorTarget,
  relValue,
  uiSettings,
}: {
  t: TranslationFunction;
  settings: GalleryPluginEditorConfig;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
  uiSettings: UISettings;
}) => {
  const disableRightClick = uiSettings?.disableRightClick;
  const disableExpand = settings?.disableExpand;

  return {
    InlineButtons: createInlineButtons({ settings, t, anchorTarget, relValue }),
    InsertButtons: createInsertButtons({ settings, t, disableRightClick, disableExpand }),
    name: 'gallery',
  };
};

export default createToolbar;

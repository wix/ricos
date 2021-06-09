import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  AnchorTarget,
  TranslationFunction,
  RelValue,
  UISettings,
  AvailableExperiments,
} from 'wix-rich-content-common';
import { GalleryPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  anchorTarget,
  relValue,
  uiSettings,
  experiments,
  isMobile,
}: {
  t: TranslationFunction;
  settings: GalleryPluginEditorConfig;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
  uiSettings: UISettings;
  experiments: AvailableExperiments;
  isMobile: boolean;
}) => {
  const disableDownload = uiSettings?.disableDownload;
  const disableExpand = settings?.disableExpand;

  return {
    InlineButtons: createInlineButtons({
      settings,
      t,
      anchorTarget,
      relValue,
      isMobile,
      experiments,
    }),
    InsertButtons: createInsertButtons({ settings, t, disableDownload, disableExpand }),
    name: 'gallery',
  };
};

export default createToolbar;

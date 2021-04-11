import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  TranslationFunction,
  AvailableExperiments,
} from 'wix-rich-content-common';
import { VideoPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
  disableDownload,
  experiments,
}: {
  t: TranslationFunction;
  settings: VideoPluginEditorConfig;
  isMobile: boolean;
  disableDownload?: boolean;
  experiments: AvailableExperiments;
}) => {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile, experiments }),
    InsertButtons: createInsertButtons({ t, settings, isMobile, disableDownload }),
    name: 'video',
  };
};

export default createToolbar;

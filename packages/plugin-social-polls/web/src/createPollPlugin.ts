import { createBasePlugin } from 'wix-rich-content-plugin-commons';

import { createToolbar } from './toolbar/createToolbar';
import { PollEditor } from './components';
import { POLL_TYPE, PollPluginEditorConfig } from './types';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULT_COMPONENT_DATA } from './defaults';

export const createPollPlugin: CreatePluginFunction<PollPluginEditorConfig> = config => {
  const { helpers, theme, t, [POLL_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: PollEditor,
    settings,
    theme,
    type: POLL_TYPE,
    toolbar: createToolbar({
      helpers,
      settings,
      isMobile,
      theme,
      t,
    }),
    helpers,
    t,
    isMobile,
    defaultPluginData: DEFAULT_COMPONENT_DATA,
    ...rest,
  });
};

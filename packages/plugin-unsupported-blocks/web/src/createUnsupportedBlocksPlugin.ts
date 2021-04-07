import { Component, DEFAULTS } from './unsupported-blocks-component';
import { UnsupportedBlocksPluginEditorConfig } from './types';
import { createBasePlugin, UNSUPPORTED_BLOCKS_TYPE } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createUnsupportedBlocksPlugin: CreatePluginFunction<UnsupportedBlocksPluginEditorConfig> = config => {
  const { helpers, t, [UNSUPPORTED_BLOCKS_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: UNSUPPORTED_BLOCKS_TYPE,
    helpers,
    settings,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

createUnsupportedBlocksPlugin.functionName = UNSUPPORTED_BLOCKS_TYPE;

export { createUnsupportedBlocksPlugin };

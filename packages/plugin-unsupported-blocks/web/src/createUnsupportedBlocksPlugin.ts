// import createToolbar from './toolbar/createToolbar';
// import { Component, DEFAULTS } from './unsupported-blocks-component';
// import { UnsupportedBlocksPluginEditorConfig } from './types';
// import { UNSUPPORTED_BLOCKS_TYPE, createBasePlugin } from 'wix-rich-content-plugin-commons';
// import { CreatePluginFunction } from 'wix-rich-content-common';

// const createUnsupportedBlocksPlugin: CreatePluginFunction<UnsupportedBlocksPluginEditorConfig> = config => {
//   const { helpers, t, [UNSUPPORTED_BLOCKS_TYPE]: settings = {}, isMobile, ...rest } = config;

//   return createBasePlugin({
//     component: Component,
//     type: UNSUPPORTED_BLOCKS_TYPE,
//     toolbar: createToolbar({
//       t,
//       settings,
//       isMobile,
//     }),
//     helpers,
//     settings,
//     t,
//     isMobile,
//     disableRightClick: config?.uiSettings?.disableRightClick,
//     defaultPluginData: DEFAULTS,
//     ...rest,
//   });
// };

// export { createUnsupportedBlocksPlugin };

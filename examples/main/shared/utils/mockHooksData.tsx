import { RicosHooks } from 'wix-rich-content-common';

export const mockHooks: Required<RicosHooks> = {
  //these are for testing purposes only in our exampleApp
  onPluginAdd: (...args) => console.debug('onPluginAdd', ...args),
  onPluginAddStep: (...args) => console.debug('onPluginAddStep', ...args),
  onPluginAddSuccess: (...args) => console.debug('onPluginAddSuccess', ...args),
  onPluginDelete: (...args) => console.debug('onPluginDelete', ...args),
  onPluginChange: (...args) => console.debug('onPluginChange', ...args),
  onPublish: (...args) => console.debug('onPublish', ...args),
  onOpenEditorSuccess: (...args) => console.debug('onOpenEditorSuccess', ...args),
  onViewerAction: (...args) => console.debug('onViewerAction', ...args),
  onViewerLoaded: (...args) => console.debug('onViewerLoaded', ...args),
  onMediaUploadEnd: (...args) => console.debug('onMediaUploadEnd', ...args),
  onMediaUploadStart: (...args) => console.debug('onMediaUploadStart', ...args),
};

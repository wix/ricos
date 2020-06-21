export const getSortedPlugins = pluginsArr => {
  const sortedPlugins = [
    'ImagePlugin_InsertButton',
    'GalleryPlugin_InsertButton',
    'VideoPlugin_InsertButton',
    'GIFPlugin_InsertButton',
    'EmojiPlugin_InsertButton',
    'UploadFilePlugin_InsertButton',
    'DividerPlugin_InsertButton',
    'HTMLCodePlugin_InsertButton',
    'poll',
    'CodeblockPlugin_InsertButton',
    'ButtonPlugin_InsertButton',
    'MapPlugin_InsertButton',
    'SoundcloudPlugin_InsertButton',
    'RedoPlugin_InsertButton',
    'UndoPlugin_InsertButton',
  ];
  return pluginsArr.sort((plugin1, plugin2) =>
    sortedPlugins.indexOf(plugin2.name) > -1 &&
    sortedPlugins.indexOf(plugin1.name) > sortedPlugins.indexOf(plugin2.name)
      ? 1
      : -1
  );
};

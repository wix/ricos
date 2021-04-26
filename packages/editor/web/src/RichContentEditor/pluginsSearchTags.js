export const getPluginsForTag = (searchTag, t) => {
  const pluginTags = [
    { plugin: 'ImagePlugin_InsertButton', tags: 'Image_plugin_search_tags' },
    { plugin: 'GalleryPlugin_InsertButton', tags: 'Gallery_plugin_search_tags' },
    {
      plugin: 'VideoPlugin_InsertButton',
      tags: 'Video_plugin_search_tags',
    },
    {
      plugin: 'HTMLCodePlugin_InsertButton',
      tags: 'HTML_plugin_search_tags',
    },
    { plugin: 'DividerPlugin_InsertButton', tags: 'Divider_plugin_search_tags' },
    { plugin: 'CodeblockPlugin_InsertButton', tags: 'codeBlock_plugin_search_tags' },
    { plugin: 'SoundcloudPlugin_InsertButton', tags: 'SoundCloud_plugin_search_tags' },
    { plugin: 'MapPlugin_InsertButton', tags: 'Map_plugin_search_tags' },
    {
      plugin: 'UploadFilePlugin_InsertButton',
      tags: 'UploadFile_plugin_search_tags',
    },
    { plugin: 'ButtonPlugin_InsertButton', tags: 'Button_plugin_search_tags' },
    { plugin: 'UndoPlugin_InsertButton', tags: 'Undo_plugin_search_tags' },
    { plugin: 'RedoPlugin_InsertButton', tags: 'Redo_plugin_search_tags' },
    { plugin: 'GIFPlugin_InsertButton', tags: 'Gif_plugin_search_tags' },
    { plugin: 'EmojiPlugin_InsertButton', tags: 'Emoji_plugin_search_tags' },
    { plugin: 'Facebook_InsertButton', tags: 'Facebook_plugin_search_tags' },
    { plugin: 'Instagram_InsertButton', tags: 'Instagram_plugin_search_tags' },
    { plugin: 'TikTok_InsertButton', tags: 'YouTube_plugin_search_tags' },
    { plugin: 'Pinterest_InsertButton', tags: 'TikTok_plugin_search_tags' },
    { plugin: 'YouTube_InsertButton', tags: 'Pinterest_plugin_search_tags' },
    { plugin: 'Events_InsertButton', tags: 'Events_plugin_search_tags' },
    { plugin: 'Bookings_InsertButton', tags: 'Bookings_plugin_search_tags' },
    { plugin: 'Stores_InsertButton', tags: 'Stores_plugin_search_tags' },
    { plugin: 'AdSensePlugin_InsertButton', tags: 'Adsense_plugin_search_tags' },
    { plugin: 'TablePlugin_InsertButton', tags: 'Table_plugin_search_tags' },
  ];

  const relatedPlugins = [];
  pluginTags.map(({ plugin, tags }) => {
    return t(tags).includes(searchTag) && relatedPlugins.push(plugin);
  });
  return relatedPlugins;
};

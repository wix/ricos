const pluginTags = [
  { plugin: 'ImagePlugin_InsertButton', tags: 'Image_plugin_search_tags', pluginId: 'image' },
  { plugin: 'GalleryPlugin_InsertButton', tags: 'Gallery_plugin_search_tags', pluginId: 'gallery' },
  {
    plugin: 'VideoPlugin_InsertButton',
    tags: 'Video_plugin_search_tags',
    pluginId: 'video',
  },
  {
    plugin: 'HTMLCodePlugin_InsertButton',
    tags: 'HTML_plugin_search_tags',
    pluginId: 'html',
  },
  { plugin: 'DividerPlugin_InsertButton', tags: 'Divider_plugin_search_tags', pluginId: 'divider' },
  {
    plugin: 'CodeblockPlugin_InsertButton',
    tags: 'codeBlock_plugin_search_tags',
    pluginId: 'code_block',
  },
  {
    plugin: 'SoundcloudPlugin_InsertButton',
    tags: 'SoundCloud_plugin_search_tags',
    pluginId: 'sound_cloude',
  },
  { plugin: 'MapPlugin_InsertButton', tags: 'Map_plugin_search_tags', pluginId: 'map' },
  {
    plugin: 'UploadFilePlugin_InsertButton',
    tags: 'UploadFile_plugin_search_tags',
    pluginId: 'file_upload',
  },
  { plugin: 'ButtonPlugin_InsertButton', tags: 'Button_plugin_search_tags', pluginId: 'button' },
  { plugin: 'UndoPlugin_InsertButton', tags: 'Undo_plugin_search_tags', pluginId: 'undo' },
  { plugin: 'RedoPlugin_InsertButton', tags: 'Redo_plugin_search_tags', pluginId: 'redo' },
  { plugin: 'GIFPlugin_InsertButton', tags: 'Gif_plugin_search_tags', pluginId: 'gif' },
  { plugin: 'EmojiPlugin_InsertButton', tags: 'Emoji_plugin_search_tags', pluginId: 'emoji' },
  { plugin: 'Facebook_InsertButton', tags: 'Facebook_plugin_search_tags', pluginId: 'facebook' },
  { plugin: 'Instagram_InsertButton', tags: 'Instagram_plugin_search_tags', pluginId: 'instagram' },
  { plugin: 'TikTok_InsertButton', tags: 'YouTube_plugin_search_tags', pluginId: 'tiktok' },
  { plugin: 'Pinterest_InsertButton', tags: 'TikTok_plugin_search_tags', pluginId: 'pinterest' },
  { plugin: 'YouTube_InsertButton', tags: 'Pinterest_plugin_search_tags', pluginId: 'yputube' },
  { plugin: 'Events_InsertButton', tags: 'Events_plugin_search_tags', pluginId: 'events' },
  { plugin: 'Bookings_InsertButton', tags: 'Bookings_plugin_search_tags', pluginId: 'bookings' },
  { plugin: 'Stores_InsertButton', tags: 'Stores_plugin_search_tags', pluginId: 'stores' },
  { plugin: 'AdSensePlugin_InsertButton', tags: 'Adsense_plugin_search_tags', pluginId: 'adsense' },
  { plugin: 'TablePlugin_InsertButton', tags: 'Table_plugin_search_tags', pluginId: 'table' },
];

const getRelatedPlugins = (searchTag, t) => {
  const relatedPlugins = [];
  pluginTags.map(data => {
    return t(data.tags).includes(searchTag) && relatedPlugins.push(data);
  });
  return relatedPlugins;
};

export const getPluginsForTag = (searchTag, t) =>
  getRelatedPlugins(searchTag, t).map(data => data.plugin);

export const getPluginsIdForTag = (searchTag, t) =>
  getRelatedPlugins(searchTag, t).map(data => data.pluginId);

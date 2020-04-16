export const getPluginsForTag = (searchTag, t) => {
  const pluginTags = [
    { plugin: 'Image', tags: t('Image_plugin_search_tags') },
    { plugin: 'Gallery', tags: t('Gallery_plugin_search_tags') },
    {
      plugin: 'Video',
      tags: t('Video_plugin_search_tags'),
    },
    {
      plugin: 'HTML',
      tags: t('HTML_plugin_search_tags'),
    },
    { plugin: 'Divider', tags: t('Divider_plugin_search_tags') },
    { plugin: 'code-block', tags: t('codeBlock_plugin_search_tags') },
    { plugin: 'SoundCloud', tags: t('SoundCloud_plugin_search_tags') },
    { plugin: 'Map', tags: t('Map_plugin_search_tags') },
    {
      plugin: 'UploadFile',
      tags: t('UploadFile_plugin_search_tags'),
    },
    { plugin: 'Button', tags: t('Button_plugin_search_tags') },
    { plugin: 'Undo', tags: t('Undo_plugin_search_tags') },
    { plugin: 'Redo', tags: t('Redo_plugin_search_tags') },
  ];

  const relatedPlugins = [];
  pluginTags.map(({ plugin, tags }) => {
    return t(tags).includes(searchTag) && relatedPlugins.push(plugin);
  });
  return relatedPlugins;
};

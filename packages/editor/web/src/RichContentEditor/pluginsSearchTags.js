const pluginTags = [
  { plugin: 'Image', tags: 'image photo picture pixel camera visual scan' },
  { plugin: 'Gallery', tags: 'gallery image collage photo picture pixel camera visual' },
  {
    plugin: 'Video',
    tags:
      'video movie clip music audio mtv youtube camera song visual digital film upload animated viral', // eslint-disable-line
  },
  { plugin: 'HTML', tags: 'html code program develop lib web format embed online article content' },
  { plugin: 'Divider', tags: 'divider separator paragraph split phase draw' },
  { plugin: 'code-block', tags: 'code block program embed develop automate codify format' },
  { plugin: 'SoundCloud', tags: 'sound cloud song music echo sonic stereo audio volume listen' },
  { plugin: 'Map', tags: 'map road place location access graph photo vector explore geograph' },
  {
    plugin: 'UploadFile',
    tags:
      'upload file storage auto post format store download share viral content media digital picture video image', // eslint-disable-line
  },
  { plugin: 'Button', tags: 'button click press switch ' },
  { plugin: 'Undo', tags: 'undo revert delete paste' },
  { plugin: 'Redo', tags: 'redo revert update' },
];

export const getPluginsForTag = (searchTag, t) => {
  const relatedPlugins = [];
  pluginTags.map(({ plugin, tags }) => {
    return t(tags).includes(searchTag) && relatedPlugins.push(plugin);
  });
  return relatedPlugins;
};

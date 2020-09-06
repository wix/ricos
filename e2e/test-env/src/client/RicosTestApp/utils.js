export const createPresets = plugins => {
  const partialPreset = [
    plugins.image,
    plugins.gallery,
    plugins.video,
    plugins.html,
    plugins.divider,
    plugins.spacing,
    plugins.link,
    plugins.hashtag,
    plugins.mentions,
    plugins.codeBlock,
    plugins.soundCloud,
    plugins.giphy,
    plugins.headers,
    plugins.map,
    plugins.fileUpload,
    plugins.linkButton,
    plugins.textColor,
    plugins.emoji,
    plugins.highlight,
    plugins.undoRedo,
    plugins.accordion,
  ].filter(val => !!val); //non-mutual plugins such as undoRedo
  return {
    all: Object.values(plugins),
    partialPreset,
    embedsPreset: [plugins.link, plugins.linkPreview, plugins.verticalEmbed],
    spoilerPreset: [plugins.link, plugins.spoiler],
    textPlugins: [
      plugins.linkPreview,
      plugins.verticalEmbed,
      plugins.indent,
      plugins.actionButton,
      ...partialPreset,
    ],
    ...plugins,
  };
};

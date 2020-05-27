const deprecateHelpers = (helpers = {}, config) => {
  const { onExpand } = helpers;
  if (onExpand) {
    if (config['wix-draft-plugin-gallery']) {
      config['wix-draft-plugin-gallery'].onExpand = onExpand;
    }
    if (config['wix-draft-plugin-image']) {
      config['wix-draft-plugin-image'].onExpand = onExpand;
    }
    // eslint-disable-next-line fp/no-delete
    delete helpers.onExpand;
  }
};

export default deprecateHelpers;

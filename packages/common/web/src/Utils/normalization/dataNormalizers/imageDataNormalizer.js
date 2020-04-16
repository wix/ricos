const imageDataNormalizer = componentData => {
  const { width, config = {}, ...rest } = componentData;
  if (config.size === 'inline' && width && !config.width) {
    return {
      ...rest,
      config: {
        ...config,
        width,
      },
    };
  } else {
    return componentData;
  }
};

export default imageDataNormalizer;

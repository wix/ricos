const imageDataNormalizer = componentData => {
  const { width, config } = componentData;
  if (config.size === 'inline' && width && !config.width) {
    return {
      ...componentData,
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

export default function previewStrategy(preview?: PreviewSettings) {
  if (!preview) {
    return {};
  }
  const { transformation = {}, config = {} } = preview;
  return {
    transformation,
    config: {
      PREVIEW: config,
    },
  };
}

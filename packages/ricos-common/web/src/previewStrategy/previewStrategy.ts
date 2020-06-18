export default function previewStrategy(
  isViewer: boolean,
  isPreviewExpanded: boolean,
  onPreviewExpand: PreviewSettings['onPreviewExpand'],
  content?: RicosContent,
  preview?: PreviewSettings
) {
  if (!isViewer || !preview || !content) {
    return {};
  }
  const { transformation, contentInteractionMappers, onPreviewExpand: consumerCallback } = preview;
  const initialState =
    isPreviewExpanded || !transformation ? content : transformation.apply(content);
  return {
    initialState,
    config: {
      PREVIEW: {
        contentInteractionMappers,
        onPreviewExpand: () => {
          onPreviewExpand?.();
          consumerCallback?.();
        },
      },
    },
  };
}

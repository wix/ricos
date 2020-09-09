import { RicosContent, PreviewConfig } from '../types';
export default function previewStrategy(
  isViewer: boolean,
  isPreviewExpanded: boolean,
  onPreviewExpand: PreviewConfig['onPreviewExpand'],
  previewConfig?: PreviewConfig,
  content?: RicosContent
) {
  if (!isViewer || !previewConfig || !content) {
    return {};
  }
  const {
    transformation,
    contentInteractionMappers,
    onPreviewExpand: consumerCallback,
  } = previewConfig;
  if (!transformation || !contentInteractionMappers) {
    return {};
  }
  const initialState =
    isPreviewExpanded || !transformation ? content : transformation.apply(content);
  return {
    initialState,
    config: {
      PREVIEW: {
        ...previewConfig,
        onPreviewExpand: () => {
          onPreviewExpand?.();
          consumerCallback?.();
        },
      },
    },
  };
}

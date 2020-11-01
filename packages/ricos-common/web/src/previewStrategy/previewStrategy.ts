import { PreviewConfig } from 'wix-rich-content-preview';
import { RicosContent } from 'wix-rich-content-common';
import { ContentStateTransformation } from 'ricos-content';

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
  }: {
    transformation?: ContentStateTransformation;
    onPreviewExpand?: PreviewConfig['onPreviewExpand'];
    contentInteractionMappers?: PreviewConfig['contentInteractionMappers'];
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

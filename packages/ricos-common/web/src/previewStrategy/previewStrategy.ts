import { ContentStateTransformation } from 'ricos-content/libs/preview';
import { PreviewConfig } from 'wix-rich-content-preview';
import { DraftContent, AvailableExperiments } from 'wix-rich-content-common';

export default function previewStrategy({
  isViewer,
  isPreviewExpanded,
  onPreviewExpand,
  previewConfig,
  content,
  experiments, // eslint-disable-line
}: {
  isViewer: boolean;
  isPreviewExpanded: boolean;
  onPreviewExpand: PreviewConfig['onPreviewExpand'];
  previewConfig?: PreviewConfig;
  content?: DraftContent;
  experiments?: AvailableExperiments;
}) {
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
    isPreviewExpanded || !transformation
      ? content
      : (transformation as ContentStateTransformation).apply(content);
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

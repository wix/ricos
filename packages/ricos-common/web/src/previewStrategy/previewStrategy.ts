import { ContentStateTransformation } from 'ricos-content/libs/preview';
import { PreviewConfig } from 'wix-rich-content-preview';
import { RicosContent, AvailableExperiments } from 'wix-rich-content-common';

export default function previewStrategy({
  isViewer,
  isPreviewExpanded,
  onPreviewExpand,
  previewConfig,
  content,
  experiments,
}: {
  isViewer: boolean;
  isPreviewExpanded: boolean;
  onPreviewExpand: PreviewConfig['onPreviewExpand'];
  previewConfig?: PreviewConfig;
  content?: RicosContent;
  experiments?: AvailableExperiments;
}) {
  console.debug('previewStrategy experiments', experiments); // eslint-disable-line no-console
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

import { interactionMap } from './Interactions/interactionMap';
import { defaultTransformation } from './Components/default-transformation';
import { ContentStateTransformation } from 'ricos-content';
export { default as RichContentPreview } from './Components/RichContentPreview';
export { interactionMap };

export interface PreviewConfig {
  transformation?: ContentStateTransformation;
  contentInteractionMappers?: typeof interactionMap[];
  onPreviewExpand?: () => void;
}
const defaultConfig: PreviewConfig = {
  transformation: defaultTransformation,
  contentInteractionMappers: [interactionMap],
};

export const createPreview = (config: PreviewConfig = {}) => ({
  ...defaultConfig,
  ...config,
});

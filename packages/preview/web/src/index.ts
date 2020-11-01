import { interactionMap } from './Interactions/interactionMap';
import { defaultTransformation } from './Components/default-transformation';
import { IContentStateTransformation } from 'ricos-content/dist/lib/preview';
export { default as RichContentPreview } from './Components/RichContentPreview';
export { interactionMap };

export interface PreviewConfig {
  transformation?: IContentStateTransformation;
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

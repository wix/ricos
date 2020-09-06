import { interactionMap } from './Interactions/interactionMap';
import { defaultTransformation } from './Components/default-transformation';
export { default as ContentStateTransformation } from './RuleEngine/ContentStateTransformation';
export { default as RichContentPreview } from './Components/RichContentPreview';
export { interactionMap };

interface PreviewSettingsConfig {
  transformation?: typeof defaultTransformation;
  contentInteractionMappers?: typeof interactionMap[];
  onPreviewExpand?: () => void;
}
const defaultConfig: PreviewSettingsConfig = {
  transformation: defaultTransformation,
  contentInteractionMappers: [interactionMap],
};

export const previewSettings = (config: PreviewSettingsConfig = {}) => ({
  ...defaultConfig,
  ...config,
});

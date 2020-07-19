import { interactionMap } from './Interactions/interactionMap';
import { defaultTransformation } from './Components/default-transformation';
export { default as ContentStateTransformation } from './RuleEngine/ContentStateTransformation';
export { default as RichContentPreview } from './Components/RichContentPreview';
export { interactionMap };

const defaultConfig = {
  transformation: defaultTransformation,
  contentInteractionMappers: [interactionMap],
};

export const previewSettings = (config = {}) => ({
  ...defaultConfig,
  ...config,
});

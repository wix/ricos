import { interactionMap } from './Interactions/interactionMap';
import { defaultTransformation } from './Components/default-transformation';
import { type } from './const';
export { default as ContentStateTransformation } from './RuleEngine/ContentStateTransformation';
export { default as RichContentPreview } from './Components/RichContentPreview';
export { interactionMap };

const defaultConfig = {
  transformation: defaultTransformation,
  contentInteractionMappers: [interactionMap],
};

export const pluginPreview = (config = defaultConfig) => ({
  config: { ...defaultConfig, ...config },
  type,
});

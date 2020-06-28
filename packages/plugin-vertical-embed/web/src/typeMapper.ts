import { VERTICAL_EMBED_TYPE } from './constants';
import VerticalEmbedComponent from './components/vertical-embed-component';

export const typeMapper: PluginTypeMapper = () => ({
  [VERTICAL_EMBED_TYPE]: { component: VerticalEmbedComponent },
});

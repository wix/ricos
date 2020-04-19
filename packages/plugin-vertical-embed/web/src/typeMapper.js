import { VERTICAL_EMBED_TYPE } from './createVerticalEmbedPlugin';
import VerticalEmbedComponent from './components/vertical-embed-component';

export const typeMapper = () => ({
  [VERTICAL_EMBED_TYPE]: { component: VerticalEmbedComponent },
});

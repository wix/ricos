import { DIVIDER_TYPE_RICOS } from './types';
import DividerComponent from './components/divider-component';

export default {
  type: DIVIDER_TYPE_RICOS,
  renderer: visitor => {
    return visitor.renderStaticComponent(DIVIDER_TYPE_RICOS, DividerComponent);
  },
};

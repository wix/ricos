import DividerComponent from './components/divider-component';
import { DIVIDER_TYPE } from './constants';

export const typeMapper = () => ({
  [DIVIDER_TYPE]: { component: DividerComponent },
});

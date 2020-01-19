import DividerComponent from './components/divider-component';
import { DIVIDER_TYPE } from './constants';

const dividerRenderDescriptor = {
  component: DividerComponent,
};

export const typeMapper = () => ({
  [DIVIDER_TYPE]: dividerRenderDescriptor,
});

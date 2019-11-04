import DividerComponent from './components/divider-component';
import { DIVIDER_TYPE } from './constants';
import { customClassName } from './classNameStrategies';

const dividerRenderDescriptor = {
  component: DividerComponent,
  classNameStrategies: {
    custom: customClassName,
  },
};

export const typeMapper = () => ({
  [DIVIDER_TYPE]: dividerRenderDescriptor,
});

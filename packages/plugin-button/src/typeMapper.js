import { BUTTON_TYPE } from './constants';
import { containerClassName } from './classNameStrategies';
import ButtonComponent from './components/button-component';

export const typeMapper = () => ({
  [BUTTON_TYPE]: { component: ButtonComponent, classNameStrategies: { container: containerClassName } },
});

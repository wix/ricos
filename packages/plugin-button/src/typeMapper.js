import { BUTTON_TYPE } from './constants';
import { containerClassName } from './classNameStrategies';
import ButtonViewer from './components/button-component';

export const typeMapper = () => ({
  [BUTTON_TYPE]: {
    component: ButtonViewer,
    classNameStrategies: { container: containerClassName },
  },
});

import { BUTTON_TYPE } from './constants';
import { alignmentClassName } from './classNameStrategies';
import ButtonViewer from './components/button-component';

export const typeMapper = () => ({
  [BUTTON_TYPE]: {
    component: ButtonViewer,
    classNameStrategies: { alignment: alignmentClassName },
  },
});

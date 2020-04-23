import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from './constants';
import { alignmentClassName, sizeClassName } from './classNameStrategies';
import ButtonViewer from './components/button-component';

export const typeMapper = () => ({
  [LINK_BUTTON_TYPE]: {
    component: ButtonViewer,
    classNameStrategies: { alignment: alignmentClassName, size: sizeClassName },
  },
  [ACTION_BUTTON_TYPE]: {
    component: ButtonViewer,
    classNameStrategies: { alignment: alignmentClassName, size: sizeClassName },
  },
});

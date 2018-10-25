import ButtonViewer from './button-viewer';
import { BUTTON_TYPE, BUTTON_TYPE_LEGACY } from './constants';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [BUTTON_TYPE_LEGACY]: { component: ButtonViewer, classNameStrategies: { container: containerClassName } },
  [BUTTON_TYPE]: { component: ButtonViewer }
});

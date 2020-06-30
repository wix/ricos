import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from './constants';
import { alignmentClassName, sizeClassName } from './classNameStrategies';
import ButtonViewer from './components/button-component';
import { PluginTypeMapper } from 'wix-rich-content-common';

const buttonTypeObj = {
  component: ButtonViewer,
  classNameStrategies: { alignment: alignmentClassName, size: sizeClassName },
};

export const typeMapper: PluginTypeMapper = () => ({
  [LINK_BUTTON_TYPE]: { ...buttonTypeObj },
  [ACTION_BUTTON_TYPE]: { ...buttonTypeObj },
});

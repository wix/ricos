import { createButtonPlugin } from './createButtonPlugin';
import { BUTTON_TYPE, DEFAULT_CONFIG } from './constants';
import { ModalsMap } from './modals';
import style1 from '../statics/styles/alignment.rtlignore.scss';
import style2 from '../statics/styles/button-input-modal.scss';
import style3 from '../statics/styles/button-sample.scss';
import style4 from '../statics/styles/color-toggle-component.scss';
import style5 from '../statics/styles/default-styles.scss';
import style6 from '../statics/styles/navbar.scss';
import style7 from '../statics/styles/preview-component.scss';
import style8 from '../statics/styles/settings-component-styles.scss';

export const pluginButton = (config = {}) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: BUTTON_TYPE,
    createPlugin: createButtonPlugin,
    ModalsMap,
    defaultClasses: {
      ...style1,
      ...style2,
      ...style3,
      ...style4,
      ...style5,
      ...style6,
      ...style7,
      ...style8,
    },
  };
};

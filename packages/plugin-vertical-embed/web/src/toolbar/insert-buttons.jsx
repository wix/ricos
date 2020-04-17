import {
  TOOLBARS,
  decorateComponentWithProps,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import PostSelectionInputModal from './postSelectionInputModal';
import { DEFAULTS } from '../constants';
import getModalCustomStyles from './ModalCustomStyles';

export default ({ helpers, t, settings, isMobile }) => {
  const icon = InsertPluginIcon;

  const buttonCreator = (type, tooltipText) => {
    return {
      type: 'modal',
      name: type,
      tooltipText,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: { ...DEFAULTS, type },
      helpers,
      t,
      section: t('Side_toolbar_embed_from_wix_section'),
      modalElement: decorateComponentWithProps(PostSelectionInputModal, settings),
      modalStyles: getModalStyles({
        customStyles: getModalCustomStyles(isMobile),
        fullScreen: false,
        isMobile,
      }),
    };
  };

  const { exposeEmbedButtons = [] } = settings;

  return exposeEmbedButtons.map(verticalType =>
    buttonCreator(verticalType, `Add a ${verticalType}`)
  );
};

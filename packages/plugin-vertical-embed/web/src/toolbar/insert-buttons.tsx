import {
  TOOLBARS,
  decorateComponentWithProps,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import { EventIcon, ProductIcon, BookingIcon } from '../icons';
import PostSelectionInputModal from './postSelectionInputModal';
import { DEFAULTS, contentTypeMap } from '../constants';
import getModalCustomStyles from './ModalCustomStyles';

const createInsertButtons: CreateInsertButtons = ({ helpers, t, settings, isMobile }) => {
  const iconsMap = {
    product: ProductIcon,
    event: EventIcon,
    booking: BookingIcon,
  };

  const buttonCreator = type => {
    const contentType = contentTypeMap[type];
    return {
      type: 'modal',
      name: `${contentType}_InsertButton`,
      tooltipText: t(`${contentType}Plugin_InsertButton_Tooltip`),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: iconsMap[type],
      componentData: { ...DEFAULTS, type },
      helpers,
      t,
      section: 'BlockToolbar_Section_Embed_Wix',
      modalElement: decorateComponentWithProps(PostSelectionInputModal, settings),
      modalStyles: getModalStyles({
        customStyles: getModalCustomStyles(isMobile),
        fullScreen: false,
        isMobile,
      }),
    };
  };

  const { exposeEmbedButtons = [] } = settings;

  return exposeEmbedButtons.map(verticalType => buttonCreator(verticalType));
};

export default createInsertButtons;

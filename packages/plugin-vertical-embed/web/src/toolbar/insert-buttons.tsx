import {
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
  getModalStyles,
} from 'wix-rich-content-plugin-commons';
import { EventIcon, ProductIcon, BookingIcon } from '../icons';
import PostSelectionInputModal from './postSelectionInputModal';
import { DEFAULTS, contentTypeMap } from '../constants';
import getModalCustomStyles from './ModalCustomStyles';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'t' | 'settings' | 'isMobile'> = ({
  t,
  settings,
  isMobile,
}) => {
  const iconsMap = {
    product: ProductIcon,
    event: EventIcon,
    booking: BookingIcon,
  };

  const buttonCreator = type => {
    const contentType = contentTypeMap[type];
    return {
      type: BUTTON_TYPES.MODAL,
      name: `${contentType}_InsertButton`,
      tooltip: t(`${contentType}Plugin_InsertButton_Tooltip`),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      getIcon: () => iconsMap[type],
      Icon: iconsMap[type],
      componentData: { ...DEFAULTS, type },
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

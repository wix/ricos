import {
  TOOLBARS,
  decorateComponentWithProps,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import PostSelectionInputModal from './postSelectionInputModal';
import { DEFAULTS, verticalEmbedProviders } from '../constants';
import getModalCustomStyles from './ModalCustomStyles';

export default ({ helpers, t, settings, isMobile }) => {
  const icon = InsertPluginIcon;

  const buttonCreator = type => {
    return {
      type: 'modal',
      name: t(`${type}_InsertButton`),
      tooltipText: t(`${type}Plugin_InsertButton_Tooltip`),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: { ...DEFAULTS, type },
      helpers,
      t,
      modalElement: decorateComponentWithProps(PostSelectionInputModal, settings),
      modalStyles: getModalStyles({
        customStyles: getModalCustomStyles(isMobile),
        fullScreen: false,
        isMobile,
      }),
    };
  };
  const { event, booking, product } = verticalEmbedProviders;

  const verticalsTypeMap = {
    [event]: 'Events',
    [booking]: 'Bookings',
    [product]: 'Stores',
  };

  const { exposeEmbedButtons = [] } = settings;

  return exposeEmbedButtons.map(verticalType => buttonCreator(verticalsTypeMap[verticalType]));
};

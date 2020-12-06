import {
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import { EventIcon, ProductIcon, BookingIcon } from '../icons';
import VerticalEmbedInputModal from './VerticalEmbedInputModal';
import { DEFAULTS, contentTypeMap } from '../constants';
import getModalCustomStyles from './ModalCustomStyles';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { VerticalEmbedPluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  isMobile,
  locale,
}: {
  t: TranslationFunction;
  settings: VerticalEmbedPluginEditorConfig;
  isMobile: boolean;
  locale: string;
}) => {
  const iconsMap = {
    product: ProductIcon,
    event: EventIcon,
    booking: BookingIcon,
  };

  const buttonCreator = (type: string) => {
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
      modalElement: decorateComponentWithProps(VerticalEmbedInputModal, { ...settings, locale }),
      modalStyles: getModalStyles({
        customStyles: getModalCustomStyles(isMobile),
        fullScreen: false,
        isMobile,
      }),
      isVisiblePromise: isVisiblePromise?.(type, locale) as Promise<boolean>,
    };
  };

  const { exposeEmbedButtons = [], isVisiblePromise } = settings;

  return exposeEmbedButtons.map((verticalType: string) => buttonCreator(verticalType));
};

export default createInsertButtons;

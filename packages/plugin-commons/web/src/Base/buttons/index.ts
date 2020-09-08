import createBlockButton from './createBlockButton';
import createBlockAlignmentButton from './createBlockAlignmentButton';
import createBlockAlignmentAndSizeButton from './createBlockAlignmentAndSizeButton';
import createBlockSizeButton from './createBlockSizeButton';
import createSliderPanelButton from './createSliderPanelButton';
import BUTTONS from './keys';
import BlockLinkButton from '../buttons/BlockLinkButton';
import {
  SizeSmallIcon,
  SizeMediumIcon,
  SizeLargeIcon,
  SizeOriginalIcon,
  SizeSmallCenterIcon,
  SizeSmallLeftIcon,
  SizeSmallRightIcon,
  SizeBestFitIcon,
  SizeFullWidthIcon,
  AlignCenterIcon,
  WidthIcon,
  HeightIcon,
  TrashIcon,
} from '../../Icons';
import { AlignLeftIcon, AlignTextCenterIcon, AlignRightIcon } from 'wix-rich-content-editor-common';

export { BUTTONS };

export { BlockLinkButton };

export const sizeSmallButton = icon =>
  createBlockSizeButton({
    size: 'small',
    Icon: icon || SizeSmallIcon,
    tooltipTextKey: 'DividerPlugin_Width_Small_Tooltip',
  });

export const sizeMediumButton = icon =>
  createBlockSizeButton({
    size: 'medium',
    Icon: icon || SizeMediumIcon,
    tooltipTextKey: 'DividerPlugin_Width_Medium_Tooltip',
  });

export const sizeLargeButton = icon =>
  createBlockSizeButton({
    size: 'large',
    Icon: icon || SizeLargeIcon,
    tooltipTextKey: 'DividerPlugin_Width_Large_Tooltip',
  });

export const alignmentLeftButton = icon =>
  createBlockAlignmentButton({
    alignment: 'left',
    Icon: icon || AlignLeftIcon,
    tooltipTextKey: 'AlignTextLeftButton_Tooltip',
  });

export const alignmentCenterButton = icon =>
  createBlockAlignmentButton({
    alignment: 'center',
    Icon: icon || AlignTextCenterIcon,
    tooltipTextKey: 'AlignTextCenterButton_Tooltip',
  });

export const alignmentRightButton = icon =>
  createBlockAlignmentButton({
    alignment: 'right',
    Icon: icon || AlignRightIcon,
    tooltipTextKey: 'AlignTextRightButton_Tooltip',
  });

export const sizeOriginalButton = icon =>
  createBlockAlignmentAndSizeButton({
    size: 'original',
    alignment: 'left',
    Icon: icon || SizeOriginalIcon,
    tooltipTextKey: 'SizeOriginalButton_Tooltip',
  });

export const sizeContentCenterButton = icon =>
  createBlockAlignmentAndSizeButton({
    size: 'content',
    alignment: 'center',
    Icon: icon || AlignCenterIcon,
    tooltipTextKey: 'AlignObject_Center_Tooltip',
  });

export const sizeSmallCenterButton = icon =>
  createBlockAlignmentAndSizeButton({
    size: 'small',
    alignment: 'center',
    Icon: icon || SizeSmallCenterIcon,
    tooltipTextKey: 'SizeSmallCenterButton_Tooltip',
  });

export const sizeSmallLeftButton = icon =>
  createBlockAlignmentAndSizeButton({
    alignment: 'left',
    size: 'small',
    Icon: icon || SizeSmallLeftIcon,
    tooltipTextKey: 'AlignObject_Left_Tooltip',
  });

export const sizeSmallRightButton = icon =>
  createBlockAlignmentAndSizeButton({
    size: 'small',
    alignment: 'right',
    Icon: icon || SizeSmallRightIcon,
    tooltipTextKey: 'AlignObject_Right_Tooltip',
  });

export const alignLeftButton = icon =>
  createBlockAlignmentButton({
    alignment: 'left',
    Icon: icon || SizeSmallLeftIcon,
    tooltipTextKey: 'SizeSmallLeftButton_Tooltip',
  });

export const alignCenterButton = icon =>
  createBlockAlignmentButton({
    alignment: 'center',
    Icon: icon || AlignCenterIcon,
    tooltipTextKey: 'AlignCenterButton_Tooltip',
  });

export const alignRightButton = icon =>
  createBlockAlignmentButton({
    alignment: 'right',
    Icon: icon || SizeSmallRightIcon,
    tooltipTextKey: 'SizeSmallRightButton_Tooltip',
  });

export const sizeContentButton = icon =>
  createBlockAlignmentAndSizeButton({
    size: 'content',
    alignment: 'center',
    Icon: icon || SizeBestFitIcon,
    tooltipTextKey: 'SizeContentButton_Tooltip',
  });

export const sizeFullWidthButton = icon =>
  createBlockAlignmentAndSizeButton({
    size: 'fullWidth',
    alignment: 'center',
    Icon: icon || SizeFullWidthIcon,
    tooltipTextKey: 'SizeFullWidthButton_Tooltip',
  });

export const deleteButton = icon =>
  createBlockButton({
    Icon: icon || TrashIcon,
    tooltipTextKey: 'DeleteButton_Tooltip',
  });

export const widthButton = icon =>
  createSliderPanelButton({
    Icon: icon || WidthIcon,
    tooltipTextKey: 'ChangeDimensions_Width_Tooltip',
    getValue: ({ componentData }) => componentData.config.width,
    onChange: ({ getEditorBounds, store }) => width => {
      const bounds = getEditorBounds();
      const editorWidth = bounds ? bounds.width : 740;
      if (width >= editorWidth && store.get('componentData')?.config.alignment) {
        store.update('componentData', { config: { alignment: 'center' } });
      }

      store.update('componentData', { config: { width } });
    },
  });

export const heightButton = icon =>
  createSliderPanelButton({
    Icon: icon || HeightIcon,
    tooltipTextKey: 'ChangeDimensions_Height_Tooltip',
    getValue: ({ componentData }) => componentData.config.height,
    onChange: ({ store }) => height => store.update('componentData', { config: { height } }),
  });

export const BUTTONS_BY_KEY = {
  [BUTTONS.SIZE_SMALL]: icon => sizeSmallButton(icon),
  [BUTTONS.SIZE_MEDIUM]: icon => sizeMediumButton(icon),
  [BUTTONS.SIZE_LARGE]: icon => sizeLargeButton(icon),
  [BUTTONS.SIZE_ORIGINAL]: icon => sizeOriginalButton(icon),
  [BUTTONS.SIZE_CONTENT_CENTER]: icon => sizeContentCenterButton(icon),
  [BUTTONS.SIZE_CONTENT]: icon => sizeContentButton(icon),
  [BUTTONS.SIZE_FULL_WIDTH]: icon => sizeFullWidthButton(icon),
  [BUTTONS.ALIGN_LEFT]: icon => alignLeftButton(icon),
  [BUTTONS.SIZE_SMALL_CENTER]: icon => sizeSmallCenterButton(icon),
  [BUTTONS.SIZE_SMALL_RIGHT]: icon => sizeSmallRightButton(icon),
  [BUTTONS.SIZE_SMALL_LEFT]: icon => sizeSmallLeftButton(icon),
  [BUTTONS.ALIGN_CENTER]: icon => alignCenterButton(icon),
  [BUTTONS.ALIGN_RIGHT]: icon => alignRightButton(icon),
  [BUTTONS.TEXT_ALIGN_LEFT]: icon => alignmentLeftButton(icon),
  [BUTTONS.TEXT_ALIGN_CENTER]: icon => alignmentCenterButton(icon),
  [BUTTONS.TEXT_ALIGN_RIGHT]: icon => alignmentRightButton(icon),
  [BUTTONS.WIDTH]: icon => widthButton(icon),
  [BUTTONS.HEIGHT]: icon => heightButton(icon),
};

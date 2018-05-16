import createBlockButton from './createBlockButton';
import createBlockAlignmentAndSizeButton from './createBlockAlignmentAndSizeButton';
import createBlockAlignmentButton from './createBlockAlignmentButton';
import createBlockSizeButton from './createBlockSizeButton';
import BUTTONS from '../buttons/keys';
import BlockLinkButton from '../buttons/BlockLinkButton';
import {
  SizeSmallIcon,
  SizeMediumIcon,
  SizeLargeIcon,
  SizeOriginalIcon,
  SizeSmallCenterIcon,
  SizeSmallLeftIcon,
  SizeSmallRightIcon,
  SizeContentIcon,
  SizeFullWidthIcon,
  AlignmentLeftIcon,
  AlignmentCenterIcon,
  AlignmentRightIcon,
  DeleteIcon
} from '../icons';

export { BUTTONS };

export { BlockLinkButton };

export const SizeSmallButton = createBlockSizeButton({
  size: 'small',
  Icon: SizeSmallIcon,
  tooltipTextKey: 'SizeSmallButton_Tooltip',
});

export const SizeMediumButton = createBlockSizeButton({
  size: 'medium',
  Icon: SizeMediumIcon,
  tooltipTextKey: 'SizeMediumButton_Tooltip',
});

export const SizeLargeButton = createBlockSizeButton({
  size: 'large',
  Icon: SizeLargeIcon,
  tooltipTextKey: 'SizeLargeButton_Tooltip',
});

export const AlignmentLeftButton = createBlockAlignmentButton({
  alignment: 'left',
  Icon: AlignmentLeftIcon,
  tooltipTextKey: 'AlignTextLeftButton_Tooltip',
});

export const AlignmentCenterButton = createBlockAlignmentButton({
  alignment: 'center',
  Icon: AlignmentCenterIcon,
  tooltipTextKey: 'AlignTextCenterButton_Tooltip',
});

export const AlignmentRightButton = createBlockAlignmentButton({
  alignment: 'right',
  Icon: AlignmentRightIcon,
  tooltipTextKey: 'AlignTextRightButton_Tooltip',
});

export const SizeOriginalButton = createBlockAlignmentAndSizeButton({
  size: 'original',
  alignment: 'left',
  Icon: SizeOriginalIcon,
  tooltipTextKey: 'SizeOriginalButton_Tooltip',
});

export const SizeSmallCenterButton = createBlockAlignmentAndSizeButton({
  size: 'small',
  alignment: 'center',
  Icon: SizeSmallCenterIcon,
  tooltipTextKey: 'SizeSmallCenterButton_Tooltip',
});

export const SizeSmallLeftButton = createBlockAlignmentAndSizeButton({
  size: 'small',
  alignment: 'left',
  Icon: SizeSmallLeftIcon,
  tooltipTextKey: 'SizeSmallLeftButton_Tooltip',
});

export const SizeSmallRightButton = createBlockAlignmentAndSizeButton({
  size: 'small',
  alignment: 'right',
  Icon: SizeSmallRightIcon,
  tooltipTextKey: 'SizeSmallRightButton_Tooltip',
});

export const SizeContentButton = createBlockAlignmentAndSizeButton({
  size: 'content',
  alignment: 'center',
  Icon: SizeContentIcon,
  tooltipTextKey: 'SizeContentButton_Tooltip',
});

export const SizeFullWidthButton = createBlockAlignmentAndSizeButton({
  size: 'fullWidth',
  alignment: 'center',
  Icon: SizeFullWidthIcon,
  tooltipTextKey: 'SizeFullWidthButton_Tooltip',
});

export const DeleteButton = createBlockButton({
  Icon: DeleteIcon,
  tooltipTextKey: 'DeleteButton_Tooltip',
});

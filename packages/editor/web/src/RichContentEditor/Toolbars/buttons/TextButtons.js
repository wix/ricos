import {
  AlignLeftIcon,
  AlignTextCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  HEADER_BLOCK,
} from 'wix-rich-content-common';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  IndentIcon,
  BlockQuoteIcon,
  TitleIcon,
  TitleOneIcon,
  TitleTwoIcon,
  OrderedListIcon,
  UnorderedListIcon,
} from '../../Icons';
import createTextInlineStyleButton from './utils/createTextInlineStyleButton';
import createTextBlockStyleButton from './utils/createTextBlockStyleButton';
import createTextAlignmentButton from './utils/createTextAlignmentButton';

export const BoldButton = createTextInlineStyleButton({
  style: 'BOLD',
  Icon: BoldIcon,
  tooltipTextKey: 'BoldButton_Tooltip',
});

export const ItalicButton = createTextInlineStyleButton({
  style: 'ITALIC',
  Icon: ItalicIcon,
  tooltipTextKey: 'ItalicButton_Tooltip',
});

export const UnderlineButton = createTextInlineStyleButton({
  style: 'UNDERLINE',
  Icon: UnderlineIcon,
  tooltipTextKey: 'UnderlineButton_Tooltip',
});

export const IndentButton = createTextBlockStyleButton({
  blockTypes: ['indent'],
  Icons: [IndentIcon],
  tooltipTextKey: 'IndentButton_Tooltip',
});

export const TitleButton = createTextBlockStyleButton({
  blockTypes: [HEADER_BLOCK.TWO, HEADER_BLOCK.THREE],
  Icons: [TitleOneIcon, TitleTwoIcon],
  InactiveIcon: TitleIcon,
  tooltipTextKey: 'TitleButton_Tooltip',
});

export const BlockquoteButton = createTextBlockStyleButton({
  blockTypes: ['blockquote'],
  Icons: [BlockQuoteIcon],
  tooltipTextKey: 'QuoteButton_Tooltip',
});

export const AlignTextLeftButton = createTextAlignmentButton({
  alignment: 'left',
  Icon: AlignLeftIcon,
  tooltipTextKey: 'AlignTextLeftButton_Tooltip',
});

export const AlignTextCenterButton = createTextAlignmentButton({
  alignment: 'center',
  Icon: AlignTextCenterIcon,
  tooltipTextKey: 'AlignTextCenterButton_Tooltip',
});

export const AlignTextRightButton = createTextAlignmentButton({
  alignment: 'right',
  Icon: AlignRightIcon,
  tooltipTextKey: 'AlignTextRightButton_Tooltip',
});

export const AlignTextJustifyButton = createTextAlignmentButton({
  alignment: 'justify',
  Icon: AlignJustifyIcon,
  tooltipTextKey: 'AlignTextJustifyButton_Tooltip',
});

export const OrderedListButton = createTextBlockStyleButton({
  blockTypes: ['ordered-list-item'],
  Icons: [OrderedListIcon],
  tooltipTextKey: 'OrderedListButton_Tooltip',
});

export const UnorderedListButton = createTextBlockStyleButton({
  blockTypes: ['unordered-list-item'],
  Icons: [UnorderedListIcon],
  tooltipTextKey: 'UnorderedListButton_Tooltip',
});

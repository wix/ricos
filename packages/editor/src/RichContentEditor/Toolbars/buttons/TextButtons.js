import {
  AlignmentLeftIcon,
  AlignmentCenterIcon,
  AlignmentRightIcon,
  AlignmentJustifyIcon,
} from 'wix-rich-content-common';
import BoldIcon from '../icons/bold.svg';
import ItalicIcon from '../icons/italic.svg';
import UnderlineIcon from '../icons/underline.svg';
import IndentIcon from '../icons/indent.svg';
import TitleIcon from '../icons/title.svg';
import TitleOneIcon from '../icons/title-one.svg';
import TitleTwoIcon from '../icons/title-two.svg';
import BlockquoteIcon from '../icons/block-quote.svg';
import OrderedListIcon from '../icons/ordered-list.svg';
import UnorderedListIcon from '../icons/unordered-list.svg';
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
  blockTypes: ['header-two', 'header-three'],
  Icons: [TitleOneIcon, TitleTwoIcon],
  InactiveIcon: TitleIcon,
  tooltipTextKey: 'TitleButton_Tooltip',
});

export const InlineTitleButton = createTextInlineStyleButton({
  style: 'inline-header-two',
  Icon: TitleIcon,
  tooltipTextKey: 'Inline Heading!',
});

export const BlockquoteButton = createTextBlockStyleButton({
  blockTypes: ['blockquote'],
  Icons: [BlockquoteIcon],
  tooltipTextKey: 'QuoteButton_Tooltip',
});

export const AlignTextLeftButton = createTextAlignmentButton({
  alignment: 'left',
  Icon: AlignmentLeftIcon,
  tooltipTextKey: 'AlignTextLeftButton_Tooltip',
});

export const AlignTextCenterButton = createTextAlignmentButton({
  alignment: 'center',
  Icon: AlignmentCenterIcon,
  tooltipTextKey: 'AlignTextCenterButton_Tooltip',
});

export const AlignTextRightButton = createTextAlignmentButton({
  alignment: 'right',
  Icon: AlignmentRightIcon,
  tooltipTextKey: 'AlignTextRightButton_Tooltip',
});

export const AlignTextJustifyButton = createTextAlignmentButton({
  alignment: 'justify',
  Icon: AlignmentJustifyIcon,
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

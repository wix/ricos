import { HEADER_BLOCK } from 'wix-rich-content-common';
import {
  AlignLeftIcon,
  AlignTextCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
} from 'wix-rich-content-editor-common';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
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

export const boldButton = icon =>
  createTextInlineStyleButton({
    style: 'BOLD',
    Icon: icon || BoldIcon,
    tooltipTextKey: 'BoldButton_Tooltip',
  });

export const italicButton = icon =>
  createTextInlineStyleButton({
    style: 'ITALIC',
    Icon: icon || ItalicIcon,
    tooltipTextKey: 'ItalicButton_Tooltip',
  });

export const underlineButton = icon =>
  createTextInlineStyleButton({
    style: 'UNDERLINE',
    Icon: icon || UnderlineIcon,
    tooltipTextKey: 'UnderlineButton_Tooltip',
  });

export const titleButton = (inactiveIconTitle, iconForTitleOne, iconForTitleTwo) =>
  createTextBlockStyleButton({
    blockTypes: [HEADER_BLOCK.TWO, HEADER_BLOCK.THREE],
    Icons: [iconForTitleOne || TitleOneIcon, iconForTitleTwo || TitleTwoIcon],
    InactiveIcon: inactiveIconTitle || TitleIcon,
    tooltipTextKey: 'TitleButton_Tooltip',
  });

export const blockquoteButton = icon =>
  createTextBlockStyleButton({
    blockTypes: ['blockquote'],
    Icons: [icon || BlockQuoteIcon],
    tooltipTextKey: 'QuoteButton_Tooltip',
  });

export const alignTextLeftButton = icon =>
  createTextAlignmentButton({
    alignment: 'left',
    Icon: icon || AlignLeftIcon,
    tooltipTextKey: 'AlignTextLeftButton_Tooltip',
  });

export const alignTextCenterButton = icon =>
  createTextAlignmentButton({
    alignment: 'center',
    Icon: icon || AlignTextCenterIcon,
    tooltipTextKey: 'AlignTextCenterButton_Tooltip',
  });

export const alignTextRightButton = icon =>
  createTextAlignmentButton({
    alignment: 'right',
    Icon: icon || AlignRightIcon,
    tooltipTextKey: 'AlignTextRightButton_Tooltip',
  });

export const alignTextJustifyButton = icon =>
  createTextAlignmentButton({
    alignment: 'justify',
    Icon: icon || AlignJustifyIcon,
    tooltipTextKey: 'AlignTextJustifyButton_Tooltip',
  });

export const orderedListButton = icon =>
  createTextBlockStyleButton({
    blockTypes: ['ordered-list-item'],
    Icons: [icon || OrderedListIcon],
    tooltipTextKey: 'OrderedListButton_Tooltip',
  });

export const unorderedListButton = icon =>
  createTextBlockStyleButton({
    blockTypes: ['unordered-list-item'],
    Icons: [icon || UnorderedListIcon],
    tooltipTextKey: 'UnorderedListButton_Tooltip',
  });

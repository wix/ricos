import { isTypeText as isDraftTextType } from 'wix-rich-content-editor-common';
import { pickBy } from 'lodash';

const headerElementToDraftType = {
  h1: 'header-one',
  h2: 'header-two',
  h3: 'header-three',
  h4: 'header-four',
  h5: 'header-five',
  h6: 'header-six',
};

const getDraftTypeOfElement = element => {
  const type = headerElementToDraftType[element] ?? element;
  return isDraftTextType(type) ? type : 'unstyled';
};

const getDynamicStyles = style => {
  if (!style?.lineHeight && !style?.paddingTop && !style?.paddingTop) {
    return undefined;
  }

  const dynamicStyles = {
    'line-height': style?.lineHeight,
    'padding-top': style?.paddingTop,
    'padding-bottom': style?.paddingTop,
  };
  return pickBy(dynamicStyles);
};

const getTextAlignment = style => {
  const nodeTextAlign = style?.textAlign;
  return !!nodeTextAlign && nodeTextAlign !== 'start' ? nodeTextAlign : 'left';
};

const isElementToBlock = type =>
  type === 'li' ||
  type === 'p' ||
  type === 'h1' ||
  type === 'h2' ||
  type === 'h3' ||
  type === 'h4' ||
  type === 'h5' ||
  type === 'h6';

export default function htmlToBlock(nodeName, node) {
  let type, style;

  if (isElementToBlock(nodeName)) {
    if (nodeName === 'li') {
      if (node.parentElement.nodeName === 'OL') {
        type = 'ordered-list-item';
      } else {
        type = 'unordered-list-item';
      }
      style = node.firstChild.style || node.style;
    } else {
      type = getDraftTypeOfElement(nodeName);
      style = node.style;
    }

    const data = {
      textAlignment: getTextAlignment(style),
      dynamicStyles: getDynamicStyles(style),
    };

    return {
      type,
      data: pickBy(data),
    };
  }
}

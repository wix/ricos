import { pickBy } from 'lodash';

const headerElementToDraftType = {
  h1: 'header-one',
  h2: 'header-two',
  h3: 'header-three',
  h4: 'header-four',
  h5: 'header-five',
  h6: 'header-six',
};

const getBlockTypeOfElement = elementTag => headerElementToDraftType[elementTag] || 'unstyled';

const shouldConvertElementToBlock = type =>
  ['li', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(type);

const getDynamicStyles = (style = {}) => {
  if (!style.lineHeight && !style.paddingTop && !style.paddingBottom) {
    return undefined;
  }

  const dynamicStyles = {
    'line-height': parseLineHeight(style.lineHeight),
    'padding-top': style.paddingTop,
    'padding-bottom': style.paddingBottom,
  };
  return pickBy(dynamicStyles);
};

const parseLineHeight = lineHeight => {
  if (!lineHeight || !parseFloat(lineHeight)) {
    return undefined;
  }

  let parsedLineHeight = parseFloat(lineHeight);
  // eslint-disable-next-line fp/no-loops
  while (parsedLineHeight >= 10) {
    parsedLineHeight /= 10;
  }

  return parsedLineHeight.toString();
};

const getTextAlignment = style => {
  const nodeTextAlign = style?.textAlign;
  return !!nodeTextAlign && nodeTextAlign !== 'start' ? nodeTextAlign : undefined;
};

export default function htmlToBlock(nodeName, node) {
  let type, style;

  if (shouldConvertElementToBlock(nodeName)) {
    if (nodeName === 'li') {
      type = node.parentElement.nodeName === 'OL' ? 'ordered-list-item' : 'unordered-list-item';
      style = node.firstChild.style || node.style;
    } else {
      type = getBlockTypeOfElement(nodeName);
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

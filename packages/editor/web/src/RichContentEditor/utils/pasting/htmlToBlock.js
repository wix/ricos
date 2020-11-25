import { pickBy } from 'lodash';

const headerElementToDraftType = {
  h2: 'header-two',
  h3: 'header-three',
  h4: 'header-four',
  h5: 'header-five',
  h6: 'header-six',
};

const headers = ['h2', 'h3', 'h4', 'h5', 'h6'];

export const getBlockTypeOfElement = (elementTag, customHeadings) => {
  if (elementTag === 'h1') {
    // eslint-disable-next-line no-param-reassign
    elementTag = 'h2';
  }
  const headerDraftType = headerElementToDraftType[elementTag];
  if (customHeadings.includes(elementTag)) {
    return headerDraftType;
  }

  if (headerDraftType) {
    const headerIndex = headers.indexOf(elementTag);
    let mappedHeader;

    headers.forEach((header, index) => {
      if (index <= headerIndex && customHeadings.includes(header)) {
        mappedHeader = header;
      }
    });
    return headerElementToDraftType[mappedHeader] || 'unstyled';
  }

  return 'unstyled';
};

const shouldConvertElementToBlock = type =>
  ['li', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre'].includes(type);

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

export default (customHeadings = []) => (nodeName, node) => {
  let type, style;

  // eslint-disable-next-line no-param-reassign
  customHeadings = customHeadings.map(header => header.toLowerCase());
  if (shouldConvertElementToBlock(nodeName)) {
    if (nodeName === 'li') {
      type = node.parentElement.nodeName === 'OL' ? 'ordered-list-item' : 'unordered-list-item';
      style = node.firstChild.style || node.style;
    } else {
      type = getBlockTypeOfElement(nodeName, customHeadings);
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
};

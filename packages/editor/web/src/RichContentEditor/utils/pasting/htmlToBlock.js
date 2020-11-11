import { pickBy } from 'lodash';

const headerElementToDraftType = {
  h2: 'header-two',
  h3: 'header-three',
  h4: 'header-four',
  h5: 'header-five',
  h6: 'header-six',
};

const headersArray = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const getBlockTypeOfElement = (elementTag, customHeaders) => {
  if (elementTag === 'h1') {
    // eslint-disable-next-line no-param-reassign
    elementTag = 'h2';
  }
  const headerDraftType = headerElementToDraftType[elementTag];
  if (customHeaders.includes(elementTag)) {
    return headerDraftType;
  }

  if (headerDraftType) {
    const headerIndex = headersArray.findIndex(header => header === elementTag);
    let mappedHeader;

    headersArray.forEach((header, index) => {
      if (index <= headerIndex && customHeaders.includes(header)) {
        mappedHeader = header;
      }
    });
    return headerElementToDraftType[mappedHeader];
  }

  return 'unstyled';
};

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

const defaultHeaders = ['p', 'h2', 'h3'];

export default (customHeaders = defaultHeaders) => (nodeName, node) => {
  let type, style;

  // eslint-disable-next-line no-param-reassign
  customHeaders = customHeaders.map(header => header.toLowerCase());
  if (shouldConvertElementToBlock(nodeName)) {
    if (nodeName === 'li') {
      type = node.parentElement.nodeName === 'OL' ? 'ordered-list-item' : 'unordered-list-item';
      style = node.firstChild.style || node.style;
    } else {
      type = getBlockTypeOfElement(nodeName, customHeaders);
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

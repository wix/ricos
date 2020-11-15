import React from 'react';
import PropTypes from 'prop-types';

function findWithRegex(text, regex, callback) {
  let matchArr, start;
  // eslint-disable-next-line fp/no-loops
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const headersRegEx = /{\$h\d}.*?{\$h}/g;

function headersMarkdownStrategy(contentBlock, callback) {
  findWithRegex(contentBlock.getText(), headersRegEx, callback);
}

const Headers = ({ children, hideMarkdown, decoratedText }) => {
  const sliceElementText = (element, start, end) => {
    if (typeof element === 'string') {
      return element.slice(start, end);
    } else if (element.props && element.props.text) {
      const text = element.props.text.slice(start, end);
      return React.cloneElement(element, { text });
    } else {
      return element;
    }
  };

  const Type = decoratedText.match(/h\d/)[0];

  if (hideMarkdown) {
    const lastIndex = children.length - 1;
    children[0] = sliceElementText(children[0], 5);
    children[lastIndex] = sliceElementText(children[lastIndex], 0, -4);
  }
  return <Type>{children}</Type>;
};

Headers.propTypes = {
  children: PropTypes.node,
  hideMarkdown: PropTypes.bool,
  decoratedText: PropTypes.string,
};

export { headersMarkdownStrategy as strategy, Headers as component };

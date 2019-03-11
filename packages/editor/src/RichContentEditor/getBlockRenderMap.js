import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DefaultDraftBlockRenderMap } from '@wix/draft-js';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/rich-content-editor.scss';

/**
  getBlockRenderMap util

  @param {Object} theme - consumer theme
  @returns {Immutable.Map}

*/
export default theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  const { Map: map } = require('immutable');
  const listClassNames = classNames(
    'public-DraftStyleDefault-depth0', // TODO: should depend on actual depth
    'public-DraftStyleDefault-listLTR', // TODO: should depend on actual direction
    'public-DraftStyleDefault-reset'
  );

  const OrderedListItem = ({ children }) => (
    <ol className={'public-DraftStyleDefault-ol'}>
      {children.map((child, i) => (
        <li
          className={classNames(
            mergedStyles.orderedList,
            'public-DraftStyleDefault-orderedListItem',
            listClassNames
          )}
          key={i}
        >
          {child}
        </li>
      ))}
    </ol>
  );

  const UnorderedListItem = ({ children }) => (
    <ul className={'public-DraftStyleDefault-ul'}>
      {children.map((child, i) => (
        <li
          className={classNames(
            mergedStyles.unorderedList,
            'public-DraftStyleDefault-unorderedListItem',
            listClassNames
          )}
          key={i}
        >
          {child}
        </li>
      ))}
    </ul>
  );

  OrderedListItem.propTypes = UnorderedListItem.propTypes = {
    children: PropTypes.node,
  };

  const blockRenderMap = map({
    'unordered-list-item': {
      element: 'p',
      wrapper: <UnorderedListItem />,
    },
    'ordered-list-item': {
      element: 'p',
      wrapper: <OrderedListItem />,
    },
  });

  return DefaultDraftBlockRenderMap.merge(blockRenderMap);
};

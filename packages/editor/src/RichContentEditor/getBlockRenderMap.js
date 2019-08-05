import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';
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
  const listClassNames = direction => [
    'public-DraftStyleDefault-depth0',
    'public-DraftStyleDefault-list' + direction,
    'public-DraftStyleDefault-reset',
  ];
  const listTypes = Object.freeze({
    UnorderedList: 'ul',
    OrderedList: 'ol',
  });

  const listItem = (children, listType) => {
    const { className, type } = listItemMap[listType];
    const List = className;
    return (
      <List className={`public-DraftStyleDefault-${className}`}>
        {children.map((child, i) => {
          const direction = get(child, 'props.children.props.direction', 'LTR');
          return (
            <li
              className={classNames(
                mergedStyles[type],
                `public-DraftStyleDefault-${type}Item`,
                listClassNames(direction),
                child.props.className.match(/\w*line-height(\w|-)*/g)
              )}
              key={i}
            >
              {child}
            </li>
          );
        })}
      </List>
    );
  };

  const OrderedListItem = ({ children }) => listItem(children, listTypes.OrderedList);

  const UnorderedListItem = ({ children }) => listItem(children, listTypes.UnorderedList);

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

  const listItemMap = {
    [listTypes.OrderedList]: {
      className: 'ol',
      type: 'orderedList',
    },
    [listTypes.UnorderedList]: {
      className: 'ul',
      type: 'unorderedList',
    },
  };

  return DefaultDraftBlockRenderMap.merge(blockRenderMap);
};

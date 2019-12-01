import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';
import { DefaultDraftBlockRenderMap } from 'draft-js';
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

  const listNameMap = {
    ol: 'orderedList',
    ul: 'unorderedList',
  };

  const listItem = (children, ListElement) => {
    const listName = listNameMap[ListElement];
    return (
      <ListElement className={`public-DraftStyleDefault-${ListElement}`}>
        {children.map((child, i) => {
          const direction = get(child, 'props.children.props.direction', 'LTR');
          return (
            <li
              className={classNames(
                mergedStyles[listName],
                `public-DraftStyleDefault-${listName}Item`,
                listClassNames(direction),
                child.props.className.match(/rich_content_line-height-(\d|_)*/g)
              )}
              key={i}
            >
              {child}
            </li>
          );
        })}
      </ListElement>
    );
  };

  const OrderedListItem = ({ children }) => listItem(children, 'ol');

  const UnorderedListItem = ({ children }) => listItem(children, 'ul');

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

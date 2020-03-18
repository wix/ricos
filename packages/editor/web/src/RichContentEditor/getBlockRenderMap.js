import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { DefaultDraftBlockRenderMap, getBlockDepth } from 'wix-rich-content-editor-common';
import styles from '../../statics/styles/rich-content-editor.scss';

/**
  getBlockRenderMap util

  @param {Object} theme - consumer theme
  @returns {Immutable.Map}

*/
export default (theme, editorState) => {
  const mergedStyles = mergeStyles({ styles, theme });
  const { Map: map } = require('immutable');
  const listClassNames = (direction, depth) => [
    `public-DraftStyleDefault-list${direction}`,
    `public-DraftStyleDefault-list${direction}-depth${depth}`,
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
          const direction = child?.props?.children?.props?.direction || 'LTR';
          const blockKey = child.key;
          const depth = getBlockDepth(editorState, blockKey);
          const className = classNames(
            mergedStyles[listName],
            `public-DraftStyleDefault-${listName}Item`,
            listClassNames(direction, depth),
            child.props.className.match(/rich_content_line-height-(\d|_)*/g)
          );
          return (
            <li className={className} key={i}>
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
      element: 'div',
      wrapper: <UnorderedListItem />,
    },
    'ordered-list-item': {
      element: 'div',
      wrapper: <OrderedListItem />,
    },
  });

  return DefaultDraftBlockRenderMap.merge(blockRenderMap);
};

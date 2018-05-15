import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { normalizeURL } from 'wix-rich-content-common';
import styles from './link.scss';

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

const Link = ({ entityKey, contentState, className, children, anchorTarget, relValue }) => {
  const { url, targetBlank, nofollow } = contentState.getEntity(entityKey).getData();
  const anchorProps = {
    href: normalizeURL(url),
    target: targetBlank ? '_blank' : (anchorTarget || '_self'),
    rel: nofollow ? 'nofollow' : (relValue || null),
    className: classNames(styles.link, className),
  };
  return (
    <a
      {...anchorProps}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  entityKey: PropTypes.string.isRequired,
  contentState: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
};

export { findLinkEntities as Strategy, Link as Component };

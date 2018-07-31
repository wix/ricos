import React from 'react';
import PropTypes from 'prop-types';
import LinkViewer from './LinkViewer';

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

const Link = ({ entityKey, contentState, className, children, anchorTarget, relValue }) => {
  const componentData = contentState.getEntity(entityKey).getData();
  return (
    <LinkViewer componentData={componentData} className={className} anchorTarget={anchorTarget} relValue={relValue}>
      {children}
    </LinkViewer>);
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

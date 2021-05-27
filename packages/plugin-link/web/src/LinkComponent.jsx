import React from 'react';
import PropTypes from 'prop-types';
import LinkViewer from './LinkViewer';

const Link = ({ entityKey, contentState, children, anchorTarget, relValue, ...otherProps }) => {
  const componentData = contentState.getEntity(entityKey).getData();
  return (
    <LinkViewer
      componentData={componentData}
      anchorTarget={anchorTarget}
      relValue={relValue}
      isInEditor
      {...otherProps}
    >
      {children}
    </LinkViewer>
  );
};

Link.propTypes = {
  entityKey: PropTypes.string.isRequired,
  contentState: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
};

export { Link as Component };

import React from 'react';
import PropTypes from 'prop-types';
import LinkViewer from './LinkViewer';

const Link = ({ entityKey, contentState, className, children, anchorTarget, relValue, settings, href, rel, target, ...otherProps }) => {
  const componentData = href ?
    { url: href, rel, target } :
    contentState.getEntity(entityKey).getData();
  return (
    <LinkViewer
      componentData={componentData}
      className={className}
      anchorTarget={anchorTarget}
      relValue={relValue}
      settings={settings}
      {...otherProps}
    >
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
  settings: PropTypes.object,
  href: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
};

export { Link as Component };

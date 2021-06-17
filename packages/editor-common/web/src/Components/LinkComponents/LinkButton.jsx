import React from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton } from 'wix-rich-content-ui-components';
import { LinkIcon } from '../../Icons';

const LinkButton = ({ icon, ...otherProps }) => (
  <InlineToolbarButton icon={icon || LinkIcon} dataHook={'LinkButton'} {...otherProps} />
);

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  isMobile: PropTypes.bool,
  tooltipText: PropTypes.string,
  pluginType: PropTypes.string,
  tabIndex: PropTypes.number,
  icon: PropTypes.func,
};

export default LinkButton;

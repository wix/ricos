import React from 'react';
import PropTypes from 'prop-types';
import InlineToolbarButton from '../InlineToolbarButton';
import { LinkIcon } from '../../Icons';

const LinkButton = ({ icon, ...otherProps }) => (
  <InlineToolbarButton icon={icon || LinkIcon} dataHook={'LinkButton'} {...otherProps} />
);

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  tooltipText: PropTypes.string,
  tabIndex: PropTypes.number,
  icon: PropTypes.func,
};

export default LinkButton;

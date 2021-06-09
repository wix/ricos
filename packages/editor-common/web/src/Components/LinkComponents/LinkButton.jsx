import React from 'react';
import PropTypes from 'prop-types';
import InlineToolbarButton from '../InlineToolbarButton';
import { LinkIcon } from '../../Icons';
import { LINK_TYPE } from 'wix-rich-content-common';

const dataHook = 'LinkButton';

const LinkButton = ({ icon, ...otherProps }) => (
  <InlineToolbarButton
    isLastAddStep={false}
    icon={icon || LinkIcon}
    dataHook={dataHook}
    pluginType={LINK_TYPE}
    {...otherProps}
  />
);

LinkButton.dataHook = dataHook;

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  isMobile: PropTypes.bool,
  tooltipText: PropTypes.string,
  tabIndex: PropTypes.number,
  icon: PropTypes.func,
};

export default LinkButton;

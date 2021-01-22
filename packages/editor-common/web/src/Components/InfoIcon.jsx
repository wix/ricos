import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generalstyles from '../../statics/styles/general.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import DefaultIcon from '../Icons/InfoIcon';
import NotificationIcon from '../Icons/NotificationIcon';
class InfoIcon extends Component {
  render() {
    const { tooltipText, iconStyles, isNotification = false } = this.props;
    const style = iconStyles || generalstyles.infoIcon;
    const Icon = isNotification ? NotificationIcon : DefaultIcon;
    return (
      <Tooltip content={tooltipText}>
        <Icon className={style} />
      </Tooltip>
    );
  }

  static propTypes = {
    tooltipText: PropTypes.string,
    iconStyles: PropTypes.string,
    isNotification: PropTypes.bool,
    theme: PropTypes.object.isRequired,
  };
}

export default InfoIcon;

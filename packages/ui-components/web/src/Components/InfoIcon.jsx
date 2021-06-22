import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generalStyles from '../../statics/styles/info-icon.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import Icon from '../Icons/InfoIcon';

class InfoIcon extends Component {
  render() {
    const { tooltipText, iconStyles } = this.props;
    const style = iconStyles || generalStyles.infoIcon;
    return (
      <Tooltip content={tooltipText}>
        <Icon className={style} />
      </Tooltip>
    );
  }

  static propTypes = {
    tooltipText: PropTypes.string,
    iconStyles: PropTypes.string,
    theme: PropTypes.object.isRequired,
  };
}

export default InfoIcon;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generalstyles from '../../statics/styles/general.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import { InfoIcon as Icon } from '../Icons/';

class InfoIcon extends Component {
  render() {
    const { tooltipText, iconStyles } = this.props;
    const style = iconStyles || generalstyles.infoIcon;
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

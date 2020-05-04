import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generalstyles from '../../statics/styles/general.scss';
import Tooltip from './Tooltip';
import Icon from '../Icons/InfoIcon.svg';

class InfoIcon extends Component {
  render() {
    const { tooltipTextKey, t, iconStyles, showTooltip = false } = this.props;
    const style = iconStyles || generalstyles.infoIcon;
    const tooltipText = tooltipTextKey && t ? t(tooltipTextKey) : false;

    return tooltipText && showTooltip ? (
      <Tooltip content={tooltipText}>
        <Icon className={style} />
      </Tooltip>
    ) : null;
  }

  static propTypes = {
    t: PropTypes.func,
    tooltipTextKey: PropTypes.string,
    iconStyles: PropTypes.string,
    showTooltip: PropTypes.bool,
  };
}

export default InfoIcon;

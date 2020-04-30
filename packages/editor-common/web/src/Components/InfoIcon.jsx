import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generalstyles from '../../statics/styles/general.scss';
import Tooltip from './Tooltip';
import Icon from '../Icons/InfoIcon.svg';

class InfoIcon extends Component {
  render() {
    const { tooltipTextKey, t, iconStyles } = this.props;
    const style = iconStyles || generalstyles.infoIcon;

    return tooltipTextKey ? (
      <Tooltip content={t(tooltipTextKey)}>
        <Icon className={style} />
      </Tooltip>
    ) : null;
  }

  static propTypes = {
    t: PropTypes.func,
    tooltipTextKey: PropTypes.string,
    iconStyles: PropTypes.string,
  };
}

export default InfoIcon;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generalstyles from '../../statics/styles/general.scss';
import { Tooltip } from 'wix-rich-content-common';
import Icon from '../Icons/InfoIcon';

class InfoIcon extends Component {
  render() {
    const { tooltipText, iconStyles } = this.props;
    const style = iconStyles || generalstyles.infoIcon;
    const id = 'InfoIcon_' + Math.floor(Math.random() * 9999);
    return (
      <Tooltip content={tooltipText}>
        <Icon id={id} className={style} />
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

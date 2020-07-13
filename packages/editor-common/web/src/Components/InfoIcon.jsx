import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generalstyles from '../../statics/styles/general.scss';
import { TooltipGenerator } from 'wix-rich-content-common';
import Icon from '../Icons/InfoIcon';

class InfoIcon extends Component {
  render() {
    const { tooltipText, iconStyles } = this.props;
    const style = iconStyles || generalstyles.infoIcon;
    const parent = <Icon className={style} />;
    return <TooltipGenerator content={tooltipText} parent={parent} />;
  }

  static propTypes = {
    tooltipText: PropTypes.string,
    iconStyles: PropTypes.string,
    theme: PropTypes.object.isRequired,
  };
}

export default InfoIcon;

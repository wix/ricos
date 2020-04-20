import React, { Component } from 'react';
import { withI18n } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import PropTypes from 'prop-types';
import generalstyles from '../../statics/styles/general.scss';
import Tooltip from './Tooltip';
import Icon from '../Icons/InfoIcon.svg';

class InfoIcon extends Component {
  render() {
    const { tooltipTextKey, t } = this.props;
    return tooltipTextKey ? (
      <Tooltip content={t(tooltipTextKey)}>
        <Icon className={generalstyles.infoIcon} />
      </Tooltip>
    ) : null;
  }

  static propTypes = {
    t: PropTypes.func,
    tooltipTextKey: PropTypes.string,
  };
}

export default withI18n(InfoIcon, englishResources);

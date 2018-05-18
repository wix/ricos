import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import SliderPanel from '../../Components/SliderPanel';
import BaseToolbarButton from '../baseToolbarButton';
import BUTTONS from './keys';

export default ({ Icon, tooltipTextKey, getValue, onChange, keyName }) =>
  class SliderPanelButton extends Component {
    static propTypes = {
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    };

    panelContent = decorateComponentWithProps(SliderPanel, {
      getValue,
      onChange,
      min: this.props.min,
      max: this.props.max,
    });

    render() {
      return (
        <BaseToolbarButton
          keyName={keyName}
          icon={Icon}
          panelContent={this.panelContent}
          tooltipTextKey={tooltipTextKey}
          {...this.props}
          type={BUTTONS.PANEL}
        />
      );
    }
  };

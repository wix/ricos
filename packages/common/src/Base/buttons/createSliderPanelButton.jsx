import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from '../../Utils/decorateComponentWithProps';
import SliderPanel from '../../Components/SliderPanel';
import BaseToolbarButton from '../baseToolbarButton';
import BUTTONS from './keys';

export default ({ Icon, tooltipTextKey, getValue, onChange, keyName }) =>
  class SliderPanelButton extends Component {
    static propTypes = {
      min: PropTypes.number,
      max: PropTypes.number,
      inputMin: PropTypes.number,
      inputMax: PropTypes.number,
      mapStoreDataToPanelProps: PropTypes.func,
    };

    render() {
      const panelContent = decorateComponentWithProps(SliderPanel, {
        getValue,
        onChange,
        min: this.props.min,
        max: this.props.max,
        inputMin: this.props.inputMin,
        inputMax: this.props.inputMax,
        mapStoreDataToPanelProps: this.props.mapStoreDataToPanelProps,
      });

      return (
        <BaseToolbarButton
          keyName={keyName}
          icon={Icon}
          panelContent={panelContent}
          tooltipTextKey={tooltipTextKey}
          {...this.props}
          type={BUTTONS.PANEL}
        />
      );
    }
  };

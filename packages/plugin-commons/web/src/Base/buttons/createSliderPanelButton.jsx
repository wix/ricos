import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SliderPanel from '../../Components/SliderPanel';
import BaseToolbarButton from '../baseToolbarButton';
import BUTTONS from './keys';

export default ({ Icon, tooltipTextKey, getValue, onChange }) =>
  class SliderPanelButton extends Component {
    static propTypes = {
      min: PropTypes.number,
      max: PropTypes.number,
      inputMin: PropTypes.number,
      inputMax: PropTypes.number,
      mapStoreDataToPanelProps: PropTypes.func,
      getEditorBounds: PropTypes.func,
    };

    render() {
      const Content = props => (
        <SliderPanel getValue={getValue} onChange={onChange} {...this.props} {...props} />
      );

      return (
        <BaseToolbarButton
          icon={Icon}
          panelContent={Content}
          tooltipTextKey={tooltipTextKey}
          {...this.props}
          type={BUTTONS.PANEL}
        />
      );
    }
  };

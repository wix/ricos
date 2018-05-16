import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SettingsModal extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    t: PropTypes.func,
    tabIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
    console.log('SettingsModal');
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const { componentData } = props;
    return {
      width: (componentData && componentData.config && componentData.config.width) || 200,
      height: (componentData && componentData.config && componentData.config.height) || 200,
      t: props.t,
    };
  };

  changeWidth = event => {
    const width = event.target.valueAsNumber;
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, width } };
    this.props.store.set('componentData', componentData);
  };
  changeHeight = event => {
    const height = event.target.valueAsNumber;
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, height } };
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    const { t, tabIndex } = this.props;
    const widthLabel = t('HtmlPlugin_Width');
    const heightLabel = t('HtmlPlugin_Height');
    const pixelsLabel = t('HtmlPlugin_Pixels');
    return (
      <div>
        <div>
          <label htmlFor="width">
            <input
              aria-valuemin="10" aria-valuemax="1000" aria-valuenow={this.state.width}
              type="range" min="10" max="1000" value={this.state.width} id="width" step="10"
              data-hook="htmlSettingsWidth" onChange={this.changeWidth} tabIndex={tabIndex} aria-label={widthLabel}
            />
            {widthLabel}
          </label>
          <output htmlFor="width" id="widthVal">
            {this.state.width}{pixelsLabel}
          </output>
        </div>
        <div>
          <label htmlFor="height">
            <input
              aria-valuemin="10" aria-valuemax="1000" aria-valuenow={this.state.height}
              type="range" min="10" max="1000" value={this.state.height} id="height" step="10"
              data-hook="htmlSettingsHeight" onChange={this.changeHeight} tabIndex={tabIndex} aria-label={heightLabel}
            />
            {heightLabel}
          </label>
          <output htmlFor="height" id="widthVal">
            {this.state.height}{pixelsLabel}
          </output>
        </div>
      </div>
    );
  };
}

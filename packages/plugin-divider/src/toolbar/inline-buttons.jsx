import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '../icons/icon-edit.svg';
import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-common';
import { DEFAULTS } from '../divider-component';
import Styles from '../default-divider-styles.scss';

class SettingsModal extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    t: PropTypes.func,
    tabIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    return {
      width: (props.componentData && props.componentData && props.componentData.width) || DEFAULTS.width,
      t: props.t,
    };
  };

  changeWidth = event => {
    const width = event.target.valueAsNumber;
    const componentData = { ...this.props.componentData, width };
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    const { t, tabIndex } = this.props;
    const widthLabel = t('DividerPlugin_Width');
    return (
      <div>
        <div>
          <label htmlFor="width">
            <input
              type="range" min="10" max="100" value={this.state.width} id="width" step="1" aria-label={widthLabel}
              data-hook="dividerPluginWidth" onChange={this.changeWidth} tabIndex={tabIndex}
              aria-valuemin="10" aria-valuemax="100" aria-valuenow={this.state.width}
            />
            {widthLabel}
          </label>
          <output htmlFor="width" id="widthVal">
            {this.state.width}%
          </output>
        </div>
      </div>
    );
  };
}

class EditModal extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    t: PropTypes.func,
    tabIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    return {
      type: (props.componentData && props.componentData.type) || 'divider1',
      t: props.t,
    };
  };

  changeType = event => {
    this.setState({ type: event.target.value }, () => {
      const componentData = { ...this.props.componentData };
      componentData.type = this.state.type;
      this.props.store.set('componentData', componentData);
    });
  };

  render = () => {
    const { t, tabIndex } = this.props;
    const dividerType1 = t('DividerPlugin_DividerType_1');
    const dividerType2 = t('DividerPlugin_DividerType_2');
    const dividerType3 = t('DividerPlugin_DividerType_3');
    const dividerType4 = t('DividerPlugin_DividerType_4');

    return (
      <div style={{ width: 90 + 'px' }}>
        <div className={Styles.tabs}>
          <div className={Styles.tab}>
            <div>
              <label htmlFor="divider1">
                <input
                  type="radio" name="type" id="divider1" value="divider1"
                  checked={this.state.type === 'divider1'} aria-checked={this.state.type === 'divider1'}
                  data-hook="dividerTypeOne" onChange={this.changeType} tabIndex={tabIndex} aria-label={dividerType1}
                />
                {dividerType1}
              </label>
            </div>
            <div>
              <label htmlFor="divider2">
                <input
                  aria-checked={this.state.type === 'divider2'} aria-label={dividerType2}
                  type="radio" name="type" id="divider2" value="divider2" checked={this.state.type === 'divider2'}
                  data-hook="dividerTypeTwo" onChange={this.changeType} tabIndex={tabIndex}
                />
                {dividerType2}
              </label>
            </div>
            <div>
              <label htmlFor="divider3">
                <input
                  aria-checked={this.state.type === 'divider3'} aria-label={dividerType3}
                  type="radio" name="type" id="divider3" value="divider3" checked={this.state.type === 'divider3'}
                  data-hook="dividerTypeThree" onChange={this.changeType} tabIndex={tabIndex}
                />
                {dividerType3}
              </label>
            </div>
            <div>
              <label htmlFor="divider4">
                <input
                  aria-checked={this.state.type === 'divider4'} aria-label={dividerType4}
                  type="radio" name="type" id="divider4" value="divider4" checked={this.state.type === 'divider4'}
                  data-hook="dividerTypeFour" onChange={this.changeType} tabIndex={tabIndex}
                />
                {dividerType4}
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default({ t }) => {
  return [
    {
      keyName: 'edit',
      type: BUTTONS.PANEL,
      panelElement: EditModal,
      icon: EditIcon,
      onClick: pubsub => console.log('*** click edit *** '), //eslint-disable-line no-console, no-unused-vars
      mobile: true,
      tooltipTextKey: 'EditButton_Tooltip',
      t,
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: true },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: true },
    { keyName: 'sizeSmallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: true },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: true },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: true },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'settings',
      type: BUTTONS.PANEL,
      panelElement: SettingsModal,
      icon: PluginSettingsIcon,
      onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      t,
    },
    { keyName: 'link', type: BUTTONS.LINK, mobile: true },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};


import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-common';
import HTMLSettingsModal from './html-settings';
import EditIcon from '../icons/icon-edit.svg';
import Styles from '../default-html-styles.scss';

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
class EditModal extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    t: PropTypes.func,
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
      isSrc: !!(props.componentData && props.componentData.config && props.componentData.config.isSrc),
      src: (props.componentData && props.componentData.src) || '',
      content: (props.componentData && props.componentData.content) || '',
      t: props.t,
    };
  };

  changeIsSrc = event => {
    const isSrc = event.target.value !== 'false';
    this.setState({ isSrc });
  };

  changeIsContent = event => {
    const isSrc = !(event.target.value !== 'false');
    this.setState({ isSrc });
  };

  changeContent = event => {
    const content = event.target.value;
    this.setState({ content });
  };

  changeSrc = event => {
    const src = event.target.value;
    this.setState({ src });
  };

  updateContent = () => {
    const componentData = { ...this.props.componentData };
    componentData.config = componentData.config || {};
    componentData.src = this.state.src;
    componentData.content = this.state.content;
    componentData.config.isSrc = this.state.isSrc;
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    const { t, tabIndex } = this.props;
    const sourceLabel = t('HtmlPlugin_Source');
    const codeLabel = t('HtmlPlugin_Code');
    const updateLabel = t('HtmlPlugin_Update');
    return (
      <div>
        <div className={Styles.tabs}>
          <div className={Styles.tab}>
            <label htmlFor="tab-1">
              <input
                aria-label={sourceLabel} aria-checked={this.state.isSrc} tabIndex={tabIndex}
                type="radio" id="tab-1" name="tab-group-1" checked={this.state.isSrc}
                data-hook="htmlPluginFirstRadio" onChange={this.changeIsSrc}
              />
              {sourceLabel}
            </label>

            <div className={Styles.content}>
              <input type="text" value={this.state.src} id="src" data-hook="htmlPluginFirstInput" onChange={this.changeSrc} tabIndex={tabIndex}/>
            </div>
          </div>

          <div className={Styles.tab}>
            <label htmlFor="tab-2">
              <input
                aria-label={codeLabel} aria-checked={!this.state.isSrc} tabIndex={tabIndex}
                type="radio" id="tab-2" name="tab-group-1" checked={!this.state.isSrc}
                data-hook="htmlPluginSecondRadio" onChange={this.changeIsContent}
              />
              {codeLabel}
            </label>

            <div className={Styles.content}>
              <textarea
                tabIndex={tabIndex} value={this.state.content}
                id="htmlPluginTextarea" data-hook="htmlPluginTextarea" onChange={this.changeContent}
              />
            </div>
          </div>
        </div>
        <div>
          <input
            tabIndex={tabIndex} type="button" data-hook="htmlPluginButton"
            onClick={this.updateContent} aria-label={updateLabel} value={updateLabel}
          />
        </div>
      </div>
    );
  };
}

EditModal.propTypes = {
  store: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
};

export default({ t }) => {
  return [
  //the icons in the toolbar are the following:
  // Edit - open a small dialog that has an option to add src for the iframe or code
    {
      keyName: 'edit',
      type: BUTTONS.PANEL,
      panelElement: translate(null)(EditModal),
      icon: EditIcon,
      onClick: pubsub => console.log('*** click edit *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'EditButton_Tooltip',
    },
    { type: BUTTONS.SEPARATOR },
    {
      keyName: 'settings',
      type: BUTTONS.PANEL,
      panelElement: translate(null)(SettingsModal),
      icon: PluginSettingsIcon,
      onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
    },
    {
      keyName: 'external_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      modalElement: HTMLSettingsModal,
      icon: PluginSettingsIcon,
      onClick: pubsub => console.log('*** click external settings *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE },
  ];
};

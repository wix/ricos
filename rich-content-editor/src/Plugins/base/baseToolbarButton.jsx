/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import ToolbarButton from '~/Components/ToolbarButton';
import { BUTTONS } from './buttons';
import Panel from './basePanel';
import Dropdown from '~/Components/Dropdown';
import FileInput from '~/Components/FileInput';

class BaseToolbarButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentState', this.onComponentStateChange);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentState', this.onComponentStateChange);
  }

  handleFileChange = event => {
    if (event.target.files && event.target.files.length > 0) {
      const { helpers, onFilesSelected } = this.props;
      const { handleFileSelection } = helpers;
      if (handleFileSelection) {
        handleFileSelection({ ...this.props });
      } else if (onFilesSelected) {
        onFilesSelected(this.props.pubsub, event.target.files);
      } else {
        const files = Array.from(event.target.files);
        const state = { userSelectedFiles: { files } };
        this.props.pubsub.update('componentState', state);
      }
    }
  };

  getBoundingRectForModalButton = isActive => {
    if (this.props.type === BUTTONS.PANEL && isActive) {
      const blockNode = findDOMNode(this);
      return blockNode.getBoundingClientRect();
    } else {
      return null;
    }
  };

  handleClick = event => {
    event.preventDefault();
    const { componentState, keyName, helpers, pubsub, theme, t, onClick, anchorTarget, relValue, ...otherProps } = this.props;

    if (this.props.type === BUTTONS.FILES && helpers && helpers.handleFileSelection) {
      const multiple = !!this.props.multiple;
      helpers.handleFileSelection(undefined, multiple, pubsub.get('handleFilesAdded'));
      return;
    }

    const activeButton = componentState.activeButton || { keyName, isActive: false };
    const isToggleButton = !(this.props.type === BUTTONS.EXTERNAL_MODAL || this.props.type === BUTTONS.FILES);
    const isActive = !isToggleButton ? activeButton.keyName === keyName : !(activeButton.keyName === keyName && activeButton.isActive);
    componentState.activeButton = { ...activeButton, keyName, isActive, boundingRect: this.getBoundingRectForModalButton(isActive) };
    pubsub.set('componentState', componentState);

    if (this.props.type === BUTTONS.EXTERNAL_MODAL && isActive) {
      if (helpers && helpers.openModal) {
        const keyName = BUTTONS.EXTERNAL_MODAL;
        const modalProps = {
          componentState,
          keyName,
          helpers,
          pubsub,
          anchorTarget,
          relValue,
          t,
          theme: theme || {},
          ...otherProps,
        };
        helpers.openModal(modalProps);
      } else {
        console.error('Open external helper function is not defined for toolbar button with keyName ' + keyName); //eslint-disable-line no-console
      }
    }
    onClick && onClick(pubsub);
  };

  onComponentStateChange = componentState => {
    if (componentState.activeButton) {
      const activeButton = componentState.activeButton;
      const isActive = activeButton.keyName === this.props.keyName && activeButton.isActive;
      this.setState({ isActive });
    } else if (this.state.isActive) {
      this.setState({ isActive: false });
    }
  };

  getIcon = () => {
    const { iconActive, icon, theme } = this.props;
    const ActiveIcon = iconActive || icon;
    const Icon = icon;
    return (
      <div className={theme.icon}>
        {this.state.isActive ? <ActiveIcon /> : <Icon />}
      </div>
    );
  };

  renderToggleButton = (buttonWrapperClassNames, buttonClassNames) => {
    const { theme, isMobile, t, tooltipTextKey } = this.props;
    const tooltipText = t(tooltipTextKey);
    const showTooltip = !isMobile && !isEmpty(tooltipText);
    const textForHooks = tooltipText.replace(/\s+/, '');
    const dataHookText = `baseToolbarButton_${textForHooks}`;

    const toggleButton = (
      <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
        <button
          className={buttonClassNames} type="button"
          data-hook={dataHookText} onMouseDown={this.handleClick} children={this.props.children || [this.getIcon()]}
        >
          {this.getIcon()}
        </button>
      </div>
    );

    return <ToolbarButton theme={theme} showTooltip={showTooltip} tooltipText={tooltipText} button={toggleButton} />;
  };

  renderPanelButton = (buttonWrapperClassNames, buttonClassNames) => {
    const { theme, isMobile, t, tooltipTextKey } = this.props;
    const tooltipText = t(tooltipTextKey);
    const showTooltip = !isMobile && !isEmpty(tooltipText);
    const textForHooks = tooltipText.replace(/\s+/, '');
    const dataHookText = `baseToolbarButtonPanelButton_${textForHooks}`;

    const panelButton = (
      <div>
        <div className={buttonWrapperClassNames} data-hook={dataHookText} onMouseDown={this.preventBubblingUp}>
          <button className={buttonClassNames} type="button" onMouseDown={this.handleClick} children={this.props.children || [this.getIcon()]}>
            {this.getIcon()}
          </button>
        </div>
        <Panel
          element={this.props.panelElement}
          theme={this.props.theme}
          keyName={this.props.keyName}
          store={this.props.pubsub.store}
          componentData={this.props.componentData}
          componentState={this.props.componentState}
          helpers={this.props.helpers}
          t={t}
        />
      </div>
    );

    return <ToolbarButton theme={theme} showTooltip={showTooltip} tooltipText={tooltipText} button={panelButton} />;
  };

  renderFilesButton = (buttonClassNames, styles) => {
    const { theme, isMobile, t, tooltipTextKey, dataHook } = this.props;
    const tooltipText = t(tooltipTextKey);
    const showTooltip = !isMobile && !isEmpty(tooltipText);

    const replaceButtonWrapperClassNames = classNames(styles.buttonWrapper);
    const filesButton = (
      <div className={replaceButtonWrapperClassNames}>
        <FileInput
          className={classNames(buttonClassNames)}
          dataHook={dataHook} onChange={this.handleFileChange} accept="image/*" multiple={this.props.multiple}
        >
          {this.getIcon()}
        </FileInput>
      </div>
    );

    return <ToolbarButton theme={theme} showTooltip={showTooltip} tooltipText={tooltipText} button={filesButton} />;
  };

  renderDropdownButton = (buttonWrapperClassNames, buttonClassNames) => {
    const { pubsub, componentData, onChange, getValue, t, dataHook, ...props } = this.props;

    const decoratedOnChange = value => onChange(value, componentData, pubsub.store);
    const decoratedGetValue = () => getValue(pubsub.store, t);

    return (
      <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
        <Dropdown
          className={buttonClassNames}
          dataHook={dataHook} onChange={decoratedOnChange} getValue={decoratedGetValue} {...props}
        />
      </div>
    );
  };

  render = () => {
    const { helpers, theme: themedStyles } = this.props;
    const { isActive } = this.state;
    const buttonWrapperClassNames = classNames(themedStyles.buttonWrapper);
    const buttonClassNames = classNames({
      [themedStyles.button]: true,
      [themedStyles.active]: isActive
    });

    let toolbarButton;
    switch (this.props.type) {
      case BUTTONS.FILES:
        if (helpers && helpers.handleFileSelection) {
          toolbarButton = this.renderToggleButton(buttonWrapperClassNames, buttonClassNames);
        } else {
          toolbarButton = this.renderFilesButton(buttonClassNames, themedStyles);
        }
        break;
      case BUTTONS.DROPDOWN:
        toolbarButton = this.renderDropdownButton(buttonClassNames, themedStyles);
        break;
      case BUTTONS.PANEL:
        toolbarButton = this.renderPanelButton(buttonWrapperClassNames, buttonClassNames);
        break;
      default:
        toolbarButton = this.renderToggleButton(buttonWrapperClassNames, buttonClassNames);
        break;
    }
    return toolbarButton;
  };
}

BaseToolbarButton.propTypes = {
  type: PropTypes.string,
  keyName: PropTypes.string.isRequired,
  panelElement: PropTypes.func,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  onClick: PropTypes.func,
  onFilesSelected: PropTypes.func,
  onChange: PropTypes.func,
  getValue: PropTypes.func,
  children: PropTypes.object,
  multiple: PropTypes.bool,
  iconActive: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
  modalStyles: PropTypes.object,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tooltipTextKey: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  dataHook: PropTypes.string,
};

export default BaseToolbarButton;

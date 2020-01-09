/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { Context } from 'wix-rich-content-common';
import Dropdown from '../Components/Dropdown';
import FileInput from '../Components/FileInput';
import ToolbarButton from '../Components/ToolbarButton';
import BUTTONS from './buttons/keys';

class BaseToolbarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
    const { settings, helpers } = props;
    this.shouldHandleFileSelection = !(
      (settings && settings.handleFileSelection) ||
      (helpers && helpers.handleFileSelection)
    );
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentState', this.onComponentStateChange);
    this.props.pubsub.subscribe('onClickTrigger', this.onComponentClickButtonTrigger);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentState', this.onComponentStateChange);
    this.props.pubsub.unsubscribe('onClickTrigger', this.onComponentClickButtonTrigger);
  }

  onComponentClickButtonTrigger = clickState => {
    const { keyName } = this.props;
    const { event, key } = clickState;
    key === keyName ? this.handleClick(event) : event.preventDefault();
  };

  handleFileChange = files => {
    if (files.length > 0) {
      const { helpers, onFilesSelected } = this.props;
      const { handleFileSelection } = helpers;
      if (handleFileSelection) {
        handleFileSelection({ ...this.props });
      } else if (onFilesSelected) {
        onFilesSelected(this.props.pubsub, files);
      } else {
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

  /* eslint-disable complexity */
  handleClick = event => {
    event.preventDefault();
    if (this.props.disabled) {
      return;
    }

    const {
      componentState,
      keyName,
      pubsub,
      onClick,
      settings,
      uiSettings,
      modalStyles,
      modalStylesFn,
      ...otherProps
    } = this.props;

    const { helpers, theme, t, anchorTarget, relValue } = this.context;

    if (this.props.type === BUTTONS.FILES && !this.shouldHandleFileSelection) {
      const updateEntity = pubsub.getBlockHandler('handleFilesAdded');
      if (settings && settings.handleFileSelection) {
        settings.handleFileSelection(updateEntity);
      } else if (helpers && helpers.handleFileSelection) {
        const multiple = !!this.props.multiple;
        helpers.handleFileSelection(
          undefined,
          multiple,
          updateEntity,
          undefined,
          this.props.componentData
        );
      }
      return;
    }

    const activeButton = componentState.activeButton || { keyName, isActive: false };
    const isToggleButton = !(
      this.props.type === BUTTONS.EXTERNAL_MODAL || this.props.type === BUTTONS.FILES
    );
    const isActive = !isToggleButton
      ? activeButton.keyName === keyName
      : !(activeButton.keyName === keyName && activeButton.isActive);
    componentState.activeButton = {
      ...activeButton,
      keyName,
      isActive,
      boundingRect: this.getBoundingRectForModalButton(isActive),
    };
    pubsub.set('componentState', componentState);

    if (this.props.type === BUTTONS.PANEL) {
      this.props.displayPanel({ PanelContent: this.props.panelContent, keyName });
    }

    if (this.props.type === BUTTONS.INLINE_PANEL) {
      this.state.isActive
        ? this.props.hideInlinePanel()
        : this.props.displayInlinePanel({ PanelContent: this.props.panelContent, keyName });
    }

    if (this.props.type === BUTTONS.EXTERNAL_MODAL && isActive) {
      if (helpers && helpers.openModal) {
        let appliedModalStyles = {};
        if (modalStyles) {
          appliedModalStyles = modalStyles;
        } else if (modalStylesFn) {
          appliedModalStyles = modalStylesFn({ buttonRef: event.target, pubsub });
        }

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
          settings,
          uiSettings,
          modalStyles: appliedModalStyles,
          buttonRef: event.target,
          ...otherProps,
        };
        helpers.openModal(modalProps);
      } else {
        //eslint-disable-next-line no-console
        console.error(
          'Open external helper function is not defined for toolbar button with keyName ' + keyName
        );
      }
    }
    onClick && onClick(pubsub);
  };
  /* eslint-enable complexity */

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
    return <div className={theme.icon}>{this.state.isActive ? <ActiveIcon /> : <Icon />}</div>;
  };

  getDataHook = () => `baseToolbarButton_${this.props.keyName}`;

  renderToggleButton = (buttonWrapperClassNames, buttonClassNames) => {
    const { theme, isMobile, t, tooltipTextKey, tabIndex } = this.props;
    const tooltipText = t(tooltipTextKey);
    const showTooltip = !isMobile && !isEmpty(tooltipText);

    const toggleButton = (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div className={buttonWrapperClassNames}>
        <button
          className={buttonClassNames}
          aria-label={tooltipText}
          tabIndex={tabIndex}
          aria-pressed={this.state.isActive}
          data-hook={this.getDataHook()}
          onClick={this.handleClick}
          children={this.props.children || [this.getIcon()]}
        >
          {this.getIcon()}
        </button>
      </div>
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    );

    return (
      <ToolbarButton
        theme={theme}
        showTooltip={showTooltip}
        tooltipText={tooltipText}
        button={toggleButton}
      />
    );
  };

  renderFilesButton = (buttonClassNames, styles) => {
    const {
      settings: { accept },
      theme,
      isMobile,
      t,
      tooltipTextKey,
      tabIndex,
    } = this.props;
    const tooltipText = t(tooltipTextKey);
    const showTooltip = !isMobile && !isEmpty(tooltipText);
    const replaceButtonWrapperClassNames = classNames(styles.buttonWrapper);
    const filesButton = (
      <div className={replaceButtonWrapperClassNames}>
        <FileInput
          className={classNames(buttonClassNames)}
          theme={theme}
          tabIndex={tabIndex}
          dataHook={this.getDataHook()}
          onChange={this.handleFileChange}
          accept={accept}
          multiple={this.props.multiple}
        >
          {this.getIcon()}
        </FileInput>
      </div>
    );

    return (
      <ToolbarButton
        theme={theme}
        showTooltip={showTooltip}
        tooltipText={tooltipText}
        button={filesButton}
      />
    );
  };

  renderDropdownButton = (buttonWrapperClassNames, buttonClassNames) => {
    const { pubsub, componentData, onChange, getValue, t, tabIndex, ...props } = this.props;

    const decoratedOnChange = value => onChange(value, componentData, pubsub.store);
    const decoratedGetValue = () => getValue(pubsub.store, t);

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={buttonWrapperClassNames}>
        <Dropdown
          className={buttonClassNames}
          tabIndex={tabIndex}
          dataHook={this.getDataHook()}
          onChange={decoratedOnChange}
          getValue={decoratedGetValue}
          {...props}
        />
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  };

  render = () => {
    const { disabled, theme: themedStyles } = this.props;
    const { isActive } = this.state;
    const buttonWrapperClassNames = classNames(themedStyles.buttonWrapper);
    const buttonClassNames = classNames({
      [themedStyles.button]: true,
      [themedStyles.active]: isActive,
      [themedStyles.disabled]: disabled,
    });

    let toolbarButton;
    switch (this.props.type) {
      case BUTTONS.FILES:
        if (!this.shouldHandleFileSelection) {
          toolbarButton = this.renderToggleButton(buttonWrapperClassNames, buttonClassNames);
        } else {
          toolbarButton = this.renderFilesButton(buttonClassNames, themedStyles);
        }
        break;
      case BUTTONS.DROPDOWN:
        toolbarButton = this.renderDropdownButton(buttonClassNames, themedStyles);
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
  panelContent: PropTypes.func,
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
  modalStylesFn: PropTypes.func,
  isMobile: PropTypes.bool,
  disabled: PropTypes.bool,
  t: PropTypes.func,
  tooltipTextKey: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  tabIndex: PropTypes.number,
  displayPanel: PropTypes.func.isRequired,
  displayInlinePanel: PropTypes.func.isRequired,
  hideInlinePanel: PropTypes.func.isRequired,
  uiSettings: PropTypes.object,
  settings: PropTypes.object,
};

BaseToolbarButton.defaultProps = {
  settings: {},
};

BaseToolbarButton.contextType = Context.type;

export default BaseToolbarButton;

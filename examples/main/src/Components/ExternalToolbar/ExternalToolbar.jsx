import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import {
  FileInput,
  Tooltip,
  BUTTON_TYPES,
  TextDropdownButton,
  InlineToolbarButton,
} from 'wix-rich-content-editor-common';
import styles from './ExternalToolbar.scss';

class ExternalToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.object.isRequired,
    theme: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const buttonTheme = props.theme.buttonStyles || {};
    const buttonStyles = {
      inlineToolbarButton_wrapper: buttonTheme.textToolbarButton_wrapper,
      inlineToolbarButton: buttonTheme.textToolbarButton,
      inlineToolbarButton_icon: buttonTheme.textToolbarButton_icon,
    };
    this.theme = { ...props.theme, buttonStyles };
  }

  renderButton = buttonProps => {
    const { onClick, getIcon, dataHook, isDisabled, isActive, tooltip } = buttonProps;
    const Icon = getIcon();
    const style = isActive() ? { background: 'lightslategray' } : {};
    return (
      <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
        <button disabled={isDisabled()} data-hook={dataHook} onClick={onClick} style={style}>
          <Icon />
        </button>
      </Tooltip>
    );
  };

  renderFileUploadButton = ({
    getIcon,
    onChange,
    accept,
    multiple,
    dataHook,
    isDisabled,
    name,
    tooltip,
  }) => {
    const Icon = getIcon();
    return (
      <FileInput
        disabled={isDisabled()}
        dataHook={dataHook}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
        key={name}
      >
        <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
          <Icon />
        </Tooltip>
      </FileInput>
    );
  };

  renderSeparator = () => null;

  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      onClick(this.buttonRef);
    }
  };

  onDropDownClose = onClose => () => {
    onClose();
  };

  renderDropDown = ({
    getLabel,
    getIcon,
    onClick,
    tooltip,
    dataHook,
    isActive,
    arrow = false,
    onClose = () => {},
  }) => {
    const { isMobile, tabIndex } = this.props;
    const buttonProps = arrow ? { buttonContent: getLabel() } : { icon: getIcon() };
    return (
      <ClickOutside onClickOutside={this.onDropDownClose(onClose)}>
        <InlineToolbarButton
          isActive={isActive()}
          onClick={this.handleDropDownClick(onClick)}
          showArrowIcon={arrow}
          theme={this.theme}
          tooltipText={tooltip}
          dataHook={dataHook}
          tabIndex={tabIndex}
          isMobile={isMobile}
          ref={ref => (this.buttonRef = ref)}
          {...buttonProps}
        />
      </ClickOutside>
    );
  };

  renderButtonGroup = ({ buttonList, tooltip, dataHook }) => {
    const { theme, isMobile, tabIndex } = this.props;
    const buttons = Object.values(buttonList);

    const dropDownProps = {
      buttons,
      tooltip,
      dataHook,
      tabIndex,
      isMobile,
      theme,
    };
    return <TextDropdownButton {...dropDownProps} />;
  };

  render() {
    const { buttons } = this.props;
    return (
      <div className={styles.toolbar}>
        {Object.values(buttons).map(buttonProps =>
          ({
            [BUTTON_TYPES.FILE]: this.renderFileUploadButton,
            [BUTTON_TYPES.BUTTON]: this.renderButton,
            [BUTTON_TYPES.SEPARATOR]: this.renderSeparator,
            [BUTTON_TYPES.DROPDOWN]: this.renderDropDown,
            [BUTTON_TYPES.GROUP]: this.renderButtonGroup,
          }[buttonProps.type](buttonProps))
        )}
      </div>
    );
  }
}

export default ExternalToolbar;

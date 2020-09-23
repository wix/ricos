import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickOutside from 'react-click-outside';
import {
  BUTTON_TYPES,
  TOOLBARS,
  InlineToolbarButton,
  Separator,
} from 'wix-rich-content-editor-common';
import { FileInput } from 'wix-rich-content-plugin-commons';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/toolbar-button.scss';
import createTextDropdownButton from './createTextDropdownButton';

class Button extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    getIcon: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    dataHook: PropTypes.string,
    isDisabled: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isActive: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    showLabel: PropTypes.bool,
    tabIndex: PropTypes.number,
    toolbarName: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
    setKeepOpen: PropTypes.func,
  };

  static defaultProps = {
    tabIndex: 0,
    showLabel: false,
    toolbarName: TOOLBARS.EXTERNAL,
    isActive: () => false,
    isDisabled: () => false,
  };

  constructor(props) {
    super(props);
    const { buttonStyles } = props.theme || {};
    this.styles = mergeStyles({ styles, theme: buttonStyles });
    this.buttonRef = React.createRef();
    this.toolbarName = props.toolbarName;
  }

  renderButton = ({ getIcon, getLabel, onClick, dataHook, isDisabled, tooltip, isActive }) => {
    const { styles } = this;
    const { showLabel, tabIndex } = this.props;
    const Icon = getIcon();
    const label = getLabel();
    return (
      <Tooltip tooltipText={tooltip}>
        <button
          disabled={isDisabled()}
          aria-label={tooltip}
          tabIndex={tabIndex}
          className={classNames(
            styles.button,
            showLabel ? styles.sideToolbarButton : styles.footerToolbarButton,
            isActive() && styles.toolbarButton_active
          )}
          data-hook={dataHook}
          onClick={onClick}
          ref={this.buttonRef}
        >
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showLabel && (
            <span key="1" className={styles.label}>
              {label}
            </span>
          )}
        </button>
      </Tooltip>
    );
  };

  renderSeparator = () => <Separator />;

  renderFileUploadButton = ({
    getIcon,
    getLabel,
    onChange,
    accept,
    multiple,
    dataHook,
    isDisabled,
    tooltip,
    isActive,
  }) => {
    const { theme, showLabel, tabIndex } = this.props;
    const { styles } = this;
    const Icon = getIcon();
    const label = getLabel();
    return (
      <FileInput
        disabled={isDisabled()}
        dataHook={dataHook}
        className={classNames(
          styles.button,
          showLabel ? styles.sideToolbarButton : styles.footerToolbarButton,
          isActive() && styles.toolbarButton_active
        )}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
        theme={theme}
        tabIndex={tabIndex}
      >
        <Tooltip tooltipText={tooltip}>
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showLabel && (
            <span key="1" className={styles.label}>
              {label}
            </span>
          )}
        </Tooltip>
      </FileInput>
    );
  };

  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      this.props.setKeepOpen?.(true);
      onClick(this.buttonRef);
    }
  };

  onDropDownClose = onClose => () => {
    this.props.setKeepOpen?.(false);
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
    const { theme, isMobile, tabIndex } = this.props;
    const buttonProps = arrow ? { buttonContent: getLabel() } : { icon: getIcon() };
    return (
      <ClickOutside onClickOutside={this.onDropDownClose(onClose)}>
        <InlineToolbarButton
          isActive={isActive()}
          onClick={this.handleDropDownClick(onClick)}
          showArrowIcon={arrow}
          theme={theme}
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

  renderButtonGroup = ({ buttonProps, tooltip, dataHook }) => {
    const { theme, isMobile, tabIndex } = this.props;
    const buttons = Object.values(buttonProps);
    const DropDownButton = createTextDropdownButton({
      buttons,
      tooltip,
      dataHook,
      activeItem: () => {
        const activeButton = buttons.filter(b => b.isActive())[0] || buttons[0];
        return activeButton?.getIcon();
      },
    });
    return <DropDownButton theme={theme} isMobile={isMobile} tabIndex={tabIndex} />;
  };

  render() {
    const { type } = this.props;
    return {
      [BUTTON_TYPES.FILE]: this.renderFileUploadButton,
      [BUTTON_TYPES.BUTTON]: this.renderButton,
      [BUTTON_TYPES.SEPARATOR]: this.renderSeparator,
      [BUTTON_TYPES.DROPDOWN]: this.renderDropDown,
      [BUTTON_TYPES.GROUP]: this.renderButtonGroup,
      [BUTTON_TYPES.CUSTOM_BLOCK]: this.renderButton,
    }[type]?.(this.props);
  }
}

export default Button;

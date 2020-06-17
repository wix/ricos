import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FileInput, Tooltip, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/toolbar-button.scss';

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
  };

  constructor(props) {
    super(props);
    const { buttonStyles } = props.theme || {};
    this.styles = mergeStyles({ styles, theme: buttonStyles });
    this.buttonRef = React.createRef();
    this.toolbarName = props.toolbarName;
  }

  renderButton = ({ getIcon, getLabel, onClick, dataHook, isDisabled, tooltip }) => {
    const { styles } = this;
    const { showLabel, tabIndex } = this.props;
    const Icon = getIcon();
    const label = getLabel();
    return (
      <Tooltip content={tooltip} moveBy={{ y: -20 }}>
        <button
          disabled={isDisabled()}
          aria-label={tooltip}
          tabIndex={tabIndex}
          className={classNames(
            styles.button,
            showLabel ? styles.sideToolbarButton : styles.footerToolbarButton
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

  renderFileUploadButton = ({
    getIcon,
    getLabel,
    onChange,
    accept,
    multiple,
    dataHook,
    isDisabled,
    tooltip,
  }) => {
    const { showLabel, tabIndex } = this.props;
    const { styles } = this;
    const Icon = getIcon();
    const label = getLabel();
    return (
      <FileInput
        disabled={isDisabled()}
        dataHook={dataHook}
        className={classNames(
          styles.button,
          showLabel ? styles.sideToolbarButton : styles.footerToolbarButton
        )}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
        theme={this.props.theme}
        tabIndex={tabIndex}
      >
        <Tooltip content={tooltip} moveBy={{ y: -20 }}>
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

  render() {
    const { type } = this.props;
    return type === BUTTON_TYPES.FILE
      ? this.renderFileUploadButton(this.props)
      : this.renderButton(this.props);
  }
}

export default Button;

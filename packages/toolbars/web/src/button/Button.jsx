import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FileInput, Tooltip, BUTTON_TYPES } from 'wix-rich-content-editor-common';
// import styles from '../../statics/styles/button.scss';

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
  };

  renderButton = buttonProps => {
    const { onClick, getIcon, dataHook, isDisabled, isActive, tooltip } = buttonProps;
    const Icon = getIcon();
    const style = isActive() ? { background: 'lightslategray' } : {};
    return (
      <Tooltip content={tooltip} place="right">
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
        <Tooltip content={tooltip} place="right">
          <Icon />
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

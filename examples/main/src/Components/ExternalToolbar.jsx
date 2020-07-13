import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FileInput, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { TooltipGenerator } from 'wix-rich-content-common';
import styles from './ExternalToolbar.scss';

class ExternalToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.object.isRequired,
  };

  renderButton = buttonProps => {
    const { onClick, getIcon, dataHook, isDisabled, isActive, tooltip } = buttonProps;
    const Icon = getIcon();
    const style = isActive() ? { background: 'lightslategray' } : {};
    const parent = (
      <button disabled={isDisabled()} data-hook={dataHook} onClick={onClick} style={style}>
        <Icon />
      </button>
    );
    return (
      <TooltipGenerator
        content={tooltip}
        parent={parent}
        place="bottom"
        tooltipOffset={{ y: -15 }}
      />
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
        <TooltipGenerator
          content={tooltip}
          parent={<Icon />}
          place="bottom"
          tooltipOffset={{ y: -15 }}
        />
      </FileInput>
    );
  };

  render() {
    const { buttons } = this.props;
    return (
      <div className={styles.toolbar}>
        {Object.values(buttons).map(buttonProps =>
          buttonProps.type === BUTTON_TYPES.FILE
            ? this.renderFileUploadButton(buttonProps)
            : this.renderButton(buttonProps)
        )}
      </div>
    );
  }
}

export default ExternalToolbar;

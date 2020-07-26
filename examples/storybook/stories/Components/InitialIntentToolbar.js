import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { FileInput, Tooltip, TooltipHost, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import PhotoCamera from 'wix-ui-icons-common/PhotoCamera';
import VideoCamera from 'wix-ui-icons-common/VideoCamera';
import styles from './InitialIntentToolbar.css';

class InitialIntentToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.object,
    onClick: PropTypes.func.isRequired,
  };

  iconsByName = {
    ImagePlugin_InsertButton: PhotoCamera,
    VideoPlugin_InsertButton: VideoCamera,
  };

  clickHandler = onPluginButtonClick => e => {
    onPluginButtonClick(e);
    this.props.onClick(e);
  };

  render() {
    const { buttons } = this.props;

    return (
      <div className={styles.toolbar}>
        {Object.values(
          pick(buttons, [
            'ImagePlugin_InsertButton',
            'VideoPlugin_InsertButton',
            'GIFPlugin_InsertButton',
          ])
        ).map(
          ({
            type,
            name,
            getIcon,
            tooltip,
            onClick,
            isDisabled = () => false,
            accept,
            multiple,
            onChange,
          }) => {
            const Icon = this.iconsByName[name] || getIcon();
            if (type === BUTTON_TYPES.BUTTON) {
              return (
                <Tooltip content={tooltip} key={name}>
                  <button onClick={this.clickHandler(onClick)} disabled={isDisabled()}>
                    <Icon />
                  </button>
                </Tooltip>
              );
            } else if (type === BUTTON_TYPES.FILE) {
              return (
                <FileInput
                  onChange={this.clickHandler(onChange)}
                  accept={accept}
                  multiple={multiple}
                  key={name}
                >
                  <Tooltip content={tooltip}>
                    <Icon />
                  </Tooltip>
                </FileInput>
              );
            }
            return null;
          }
        )}
        <TooltipHost />
      </div>
    );
  }
}

export default InitialIntentToolbar;

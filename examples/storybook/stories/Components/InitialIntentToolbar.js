import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { FileInput, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { TooltipGenerator } from 'wix-rich-content-common';
import PhotoCamera from 'wix-ui-icons-common/PhotoCamera';
import VideoCamera from 'wix-ui-icons-common/VideoCamera';
import styles from './InitialIntentToolbar.css';

class InitialIntentToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.object.isRequired,
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
              const parent = (
                <button key={name} onClick={this.clickHandler(onClick)} disabled={isDisabled()}>
                  <Icon />
                </button>
              );
              return <TooltipGenerator content={tooltip} parent={parent} />;
            } else if (type === BUTTON_TYPES.FILE) {
              return (
                <FileInput
                  onChange={this.clickHandler(onChange)}
                  accept={accept}
                  multiple={multiple}
                  key={name}
                >
                  <TooltipGenerator content={tooltip} parent={<Icon />} />
                </FileInput>
              );
            }
            return null;
          }
        )}
      </div>
    );
  }
}

export default InitialIntentToolbar;

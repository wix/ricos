import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { FileInput, Tooltip, TooltipHost } from 'wix-rich-content-editor-common';
import { withPluginButtons } from 'wix-rich-content-editor';
import PhotoCamera from 'wix-ui-icons-common/PhotoCamera';
import VideoCamera from 'wix-ui-icons-common/VideoCamera';
import styles from './InitialIntentToolbar.css';

class InitialIntentToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    console.log('InitialIntentToolbar buttons: ', props.buttons);
  }

  componentWillReceiveProps(nextProps) {
    console.log('InitialIntentToolbar buttons: ', nextProps.buttons);
  }

  iconsByName = {
    ImagePlugin_InsertButton: PhotoCamera,
    VideoPlugin_InsertButton: VideoCamera,
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
          ]),
        ).map(
          ({
            buttonType,
            name,
            icon,
            tooltip,
            onClick,
            isDisabled = () => false,
            ...fileInputProps
          }) => {
            const Icon = this.iconsByName[name] || icon;
            if (buttonType === 'button') {
              return (
                <Tooltip content={tooltip} place="right">
                  <button onClick={onClick} disabled={isDisabled()}>
                    <Icon />
                  </button>
                </Tooltip>
              );
            } else if (buttonType === 'file') {
              return (
                <FileInput {...fileInputProps} place="right">
                  <Tooltip content={tooltip}>
                    <Icon />
                  </Tooltip>
                </FileInput>
              );
            }
          },
        )}
        <TooltipHost />
      </div>
    );
  }
}

export default withPluginButtons(InitialIntentToolbar);

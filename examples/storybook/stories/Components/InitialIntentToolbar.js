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
    onClick: PropTypes.func.isRequired,
  };

  /* eslint-disable no-console, camelcase, @typescript-eslint/camelcase */
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
            buttonType,
            name,
            icon,
            tooltip,
            onClick,
            isDisabled = () => false,
            onChange,
            ...fileInputProps
          }) => {
            const Icon = this.iconsByName[name] || icon;
            if (buttonType === 'button') {
              return (
                <Tooltip content={tooltip} key={name}>
                  <button onClick={this.clickHandler(onClick)} disabled={isDisabled()}>
                    <Icon />
                  </button>
                </Tooltip>
              );
            } else if (buttonType === 'file') {
              return (
                <FileInput onChange={this.clickHandler(onChange)} {...fileInputProps} key={name}>
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

export default withPluginButtons(InitialIntentToolbar);

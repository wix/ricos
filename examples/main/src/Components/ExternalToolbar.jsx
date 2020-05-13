import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FileInput, Tooltip, TooltipHost } from 'wix-rich-content-editor-common';
import { withPluginButtons } from 'wix-rich-content-editor';
import styles from './ExternalToolbar.scss';

class ExternalToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    console.log('ExternalToolbar buttons: ', props.buttons);
  }

  componentWillReceiveProps(nextProps) {
    console.log('ExternalToolbar buttons: ', nextProps.buttons);
  }

  render() {
    const { buttons } = this.props;
    return (
      <div className={styles.toolbar}>
        {buttons.map(
          ({
            buttonType,
            icon: Icon,
            tooltip,
            onClick,
            isDisabled = () => false,
            ...fileInputProps
          }) => {
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
          }
        )}
        <TooltipHost />
      </div>
    );
  }
}

export default withPluginButtons(ExternalToolbar);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FileInput, Tooltip } from 'wix-rich-content-editor-common';
import { withPluginButtons } from 'wix-rich-content-editor';
import styles from './ExternalToolbar.scss';

class ExternalToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { buttons } = this.props;
    return (
      <div className={styles.toolbar}>
        {Object.values(buttons).map(
          ({
            name,
            buttonType,
            getIcon,
            tooltip,
            onClick,
            isDisabled = () => false,
            ...fileInputProps
          }) => {
            const Icon = getIcon();
            if (buttonType === 'button') {
              return (
                <Tooltip content={tooltip} place="right" key={name}>
                  <button onClick={onClick} disabled={isDisabled()}>
                    <Icon />
                  </button>
                </Tooltip>
              );
            } else if (buttonType === 'file') {
              return (
                <FileInput {...fileInputProps} place="right" key={name}>
                  <Tooltip content={tooltip}>
                    <Icon />
                  </Tooltip>
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

export default withPluginButtons(ExternalToolbar);

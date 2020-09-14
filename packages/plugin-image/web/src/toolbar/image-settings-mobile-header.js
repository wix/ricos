import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { SelectionList } from 'wix-rich-content-plugin-commons';
import styles from '../../statics/styles/image-settings-mobile-header.scss';
import { MoreIcon } from '../icons';

class ImageSettingsMobileHeader extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      showMenu: false,
    };
  }
  render() {
    const { save, cancel, saveName, cancelName, switchTab, otherTab, theme, t } = this.props;
    const cancelLabel = cancelName || t('ImageSettings_MobileHeader_Cancel');
    const saveLabel = saveName || t('ImageSettings_MobileHeader_Save');

    return (
      <div role="menu">
        <div className={this.styles.imageSettingsMobileHeader_headerPlaceholder} />
        <div className={this.styles.imageSettingsMobileHeader_header}>
          <button
            data-hook="ImageSettingsMobileHeaderCancel"
            role="menuitem"
            aria-label={cancelLabel}
            onClick={() => cancel()}
            className={classNames(
              this.styles.imageSettingsMobileHeader_button,
              this.styles.imageSettingsMobileHeader_cancel
            )}
          >
            {cancelLabel}
          </button>
          {otherTab ? (
            <button
              role="menuitem"
              aria-label="More"
              data-hook="ImageSettingsMobileHeaderMore"
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}
              className={classNames(
                this.styles.imageSettingsMobileHeader_button,
                this.styles.imageSettingsMobileHeader_menuIcon
              )}
            >
              <MoreIcon />
            </button>
          ) : null}
          <button
            data-hook="ImageSettingsMobileHeaderDone"
            onClick={() => save()}
            role="menuitem"
            aria-label={saveLabel}
            className={classNames(
              this.styles.imageSettingsMobileHeader_button,
              this.styles.imageSettingsMobileHeader_done
            )}
          >
            {saveLabel}
          </button>
        </div>
        {this.state.showMenu ? (
          <div className={this.styles.imageSettingsMobileHeader_menu}>
            <SelectionList
              theme={theme}
              dataSource={[otherTab]}
              value={''}
              onChange={() => {
                this.setState({ showMenu: false });
                switchTab();
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ImageSettingsMobileHeader.propTypes = {
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
  t: PropTypes.func,
};

export default ImageSettingsMobileHeader;

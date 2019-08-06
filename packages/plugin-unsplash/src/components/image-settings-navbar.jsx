import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, SelectionList } from 'wix-rich-content-common';
import styles from '../../statics/styles/image-settings-navbar.scss';
import { MoreIcon } from '../icons';

class ImageSettingsNavbar extends Component {
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
        <div className={this.styles.unsplash_imageSettingsMobileHeader_headerPlaceholder} />
        <div className={this.styles.unsplash_imageSettingsMobileHeader_header}>
          <button
            data-hook="ImageSettingsMobileHeaderCancel"
            role="menuitem"
            aria-label={cancelLabel}
            onClick={() => cancel()}
            className={classNames(
              this.styles.unsplash_imageSettingsMobileHeader_button,
              this.styles.unsplash_imageSettingsMobileHeader_cancel
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
                this.styles.unsplash_imageSettingsMobileHeader_button,
                this.styles.unsplash_imageSettingsMobileHeader_menuIcon
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
              this.styles.unsplash_imageSettingsMobileHeader_button,
              this.styles.unsplash_imageSettingsMobileHeader_done
            )}
          >
            {saveLabel}
          </button>
        </div>
        {this.state.showMenu ? (
          <div className={this.styles.unsplash_imageSettingsMobileHeader_menu}>
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

ImageSettingsNavbar.propTypes = {
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
  t: PropTypes.func,
};

export default ImageSettingsNavbar;

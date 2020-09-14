import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { SelectionList } from 'wix-rich-content-plugin-commons';
import styles from '../../../statics/styles/gallery-settings-mobile-header.scss';
import { MoreIcon } from '../../icons';

class GallerySettingsMobileHeader extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      showMenu: false,
    };
  }
  render() {
    const { save, cancel, saveName, cancelName, switchTab, otherTab, theme, t } = this.props;
    const cancelLabel = cancelName || t('GallerySettings_MobileHeader_Cancel');
    const saveLabel = saveName || t('GallerySettings_MobileHeader_Save');

    return (
      <div role="menu">
        <div className={this.styles.gallerySettingsMobileHeader_headerPlaceholder} />
        <div className={this.styles.gallerySettingsMobileHeader_header}>
          <button
            data-hook="gallerySettingsMobileHeaderCanel"
            onClick={() => cancel()}
            aria-label={cancelLabel}
            role="menuitem"
            className={classNames(
              this.styles.gallerySettingsMobileHeader_button,
              this.styles.gallerySettingsMobileHeader_cancel
            )}
          >
            {cancelLabel}
          </button>
          {otherTab ? (
            <button
              data-hook="gallerySettingsMobileHeaderMore"
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}
              aria-label="More"
              role="menuitem"
              className={classNames(
                this.styles.gallerySettingsMobileHeader_button,
                this.styles.gallerySettingsMobileHeader_menuIcon
              )}
            >
              <MoreIcon />
            </button>
          ) : null}
          <button
            data-hook="gallerySettingsMobileHeaderDone"
            onClick={() => save()}
            aria-label={saveLabel}
            role="menuitem"
            className={classNames(
              this.styles.gallerySettingsMobileHeader_button,
              this.styles.gallerySettingsMobileHeader_done
            )}
          >
            {saveLabel}
          </button>
        </div>
        {this.state.showMenu ? (
          <div className={this.styles.gallerySettingsMobileHeader_menu}>
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

GallerySettingsMobileHeader.propTypes = {
  hide: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
  t: PropTypes.func,
};

export default GallerySettingsMobileHeader;

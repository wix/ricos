import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SelectionList } from 'wix-rich-content-ui-components';
import { MoreIcon } from '../Icons';
import styles from '../../statics/styles/settings-mobile-header.scss';
import { mergeStyles } from 'wix-rich-content-common';

const SettingsMobileHeader = ({
  theme,
  save,
  cancel,
  saveLabel,
  cancelLabel,
  switchTab,
  otherTab,
  dataHookPrefix,
  isMediaSettingsModal = false,
}) => {
  const [menuVisible, toggleMenu] = useState(false);
  const _styles = mergeStyles({ styles, theme });

  return (
    <div role="menu" className={classNames(_styles.root)}>
      {!isMediaSettingsModal && <div className={_styles.headerPlaceholder} />}
      <div
        className={classNames(_styles.header, {
          [styles.media]: isMediaSettingsModal,
        })}
      >
        <button
          data-hook={dataHookPrefix + 'Cancel'}
          role="menuitem"
          aria-label={cancelLabel}
          onClick={() => cancel()}
          className={classNames(_styles.button, _styles.cancel)}
        >
          {cancelLabel}
        </button>
        {otherTab ? (
          <button
            role="menuitem"
            aria-label="More"
            data-hook={dataHookPrefix + 'More'}
            onClick={() => toggleMenu(!menuVisible)}
            className={classNames(_styles.button, _styles.menuIcon)}
          >
            <MoreIcon />
          </button>
        ) : null}
        <button
          data-hook={dataHookPrefix + 'Done'}
          onClick={() => save()}
          role="menuitem"
          aria-label={saveLabel}
          className={classNames(_styles.button, _styles.done)}
        >
          {saveLabel}
        </button>
      </div>
      {menuVisible && (
        <div className={_styles.menu}>
          <SelectionList
            theme={theme}
            dataSource={[otherTab]}
            value={''}
            onChange={() => {
              toggleMenu(false);
              switchTab();
            }}
          />
        </div>
      )}
    </div>
  );
};

SettingsMobileHeader.propTypes = {
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  dataHookPrefix: PropTypes.string,
  isMediaSettingsModal: PropTypes.bool,
};

export default SettingsMobileHeader;

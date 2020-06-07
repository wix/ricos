import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/new-link-panel.scss';
import { mergeStyles } from 'wix-rich-content-common';

class LinkPanelButton extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const { isActive, t, tabIndex, isDoneButtonEnable, onCancel, onDelete, onDone } = this.props;
    const doneButtonText = t('LinkPanelContainer_DoneButton');
    const cancelButtonText = t('LinkPanelContainer_CancelButton');
    const removeButtonText = t('LinkPanelContainer_RemoveButton');
    const doneButtonClassName = classNames(
      styles.linkPanel_FooterButton,
      isDoneButtonEnable ? styles.linkPanel_enabled : styles.linkPanel_disabled
    );
    const cancelButtonClassName = classNames(
      styles.linkPanel_FooterButton,
      styles.linkPanel_Cancel
    );
    const removeButtonClassName = classNames(
      styles.linkPanel_FooterButton,
      styles.linkPanel_enabled
    );
    return (
      <div className={styles.linkPanel_Footer}>
        <div className={styles.linkPanel_FooterActions}>
          <button
            tabIndex={tabIndex}
            aria-label={cancelButtonText}
            className={cancelButtonClassName}
            data-hook="linkPanelContainerCancel"
            onClick={onCancel}
          >
            {cancelButtonText}
          </button>
          {isActive && (
            <div className={styles.linkPanel_RemoveContainer}>
              <div
                className={classNames(
                  styles.linkPanel_VerticalDivider,
                  styles.linkPanel_VerticalDividerNarrowMargin
                )}
              />
              <button
                tabIndex={tabIndex}
                aria-label={removeButtonText}
                className={removeButtonClassName}
                data-hook="linkPanelContainerRemove"
                onClick={onDelete}
              >
                {removeButtonText}
              </button>
            </div>
          )}
        </div>
        <button
          tabIndex={tabIndex}
          aria-label={doneButtonText}
          className={doneButtonClassName}
          data-hook="linkPanelContainerDone"
          onClick={onDone}
          disabled={isDoneButtonEnable ? undefined : true}
        >
          {doneButtonText}
        </button>
      </div>
    );
  }
}

LinkPanelButton.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  isDoneButtonEnable: PropTypes.bool,
};

export default LinkPanelButton;

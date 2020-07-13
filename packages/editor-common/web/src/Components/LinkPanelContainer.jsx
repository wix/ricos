import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkPanel from './LinkPanel';
import FocusManager from './FocusManager';
import { mergeStyles } from 'wix-rich-content-common';
import RadioGroupHorizontal from './RadioGroupHorizontal';
import styles from '../../statics/styles/link-panel.scss';
const LinkType = props => (
  <RadioGroupHorizontal
    dataSource={[
      { value: 'url', labelText: 'Website address (URL)' },
      { value: 'page', labelText: 'Site Page' },
    ]}
    {...props}
  />
);

LinkType.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

class LinkPanelContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { url, targetBlank, nofollow } = this.props;
    this.state = {
      linkPanelValues: { url, targetBlank, nofollow },
    };
  }

  onDone = () => {
    const { linkPanelValues } = this.state;
    if ((linkPanelValues.isValid && linkPanelValues.url) || this.props.unchangedUrl) {
      this.props.onDone(linkPanelValues);
    } else if (linkPanelValues.url === '') {
      this.onDelete();
    }
  };

  onDelete = () => {
    this.props.onDelete();
  };

  onCancel = () => this.props.onCancel();

  render() {
    const { styles } = this;
    const {
      theme,
      isActive,
      anchorTarget,
      relValue,
      isMobile,
      t,
      ariaProps,
      tabIndex,
      uiSettings,
      unchangedUrl,
    } = this.props;
    const doneButtonText = t('LinkPanelContainer_DoneButton');
    const cancelButtonText = t('LinkPanelContainer_CancelButton');
    const removeButtonText = t('LinkPanelContainer_RemoveButton');
    const doneButtonClassName = classNames(styles.linkPanel_FooterButton, styles.linkPanel_enabled);
    const cancelButtonClassName = classNames(
      styles.linkPanel_FooterButton,
      styles.linkPanel_Cancel
    );
    const removeButtonClassName = classNames(styles.linkPanel_FooterButton);
    const linkPanelContainerClassName = classNames(styles.linkPanel_container, {
      [styles.linkPanel_container_isMobile]: isMobile,
    });

    const { linkPanel } = uiSettings || {};
    const { blankTargetToggleVisibilityFn, nofollowRelToggleVisibilityFn } = linkPanel || {};
    const showTargetBlankCheckbox =
      blankTargetToggleVisibilityFn && blankTargetToggleVisibilityFn(anchorTarget);
    const showRelValueCheckbox =
      nofollowRelToggleVisibilityFn && nofollowRelToggleVisibilityFn(relValue);

    const linkPanelAriaProps = { 'aria-label': 'Link management' };
    return (
      <FocusManager
        className={linkPanelContainerClassName}
        data-hook="linkPanelContainer"
        role="form"
        {...ariaProps}
      >
        <div className={styles.linkPanel_content}>
          <LinkPanel
            onEnter={this.onDone}
            onEscape={this.onCancel}
            linkValues={this.state.linkPanelValues}
            onChange={linkPanelValues => this.setState({ linkPanelValues })}
            theme={theme}
            showTargetBlankCheckbox={showTargetBlankCheckbox}
            showRelValueCheckbox={showRelValueCheckbox}
            t={t}
            ariaProps={linkPanelAriaProps}
            unchangedUrl={unchangedUrl}
            isMobile={isMobile}
            {...uiSettings?.linkPanel}
          />
          <div className={styles.linkPanel_actionsDivider} role="separator" />
        </div>
        <div className={styles.linkPanel_Footer}>
          <div className={styles.linkPanel_FooterActions}>
            <button
              tabIndex={tabIndex}
              aria-label={cancelButtonText}
              className={cancelButtonClassName}
              data-hook="linkPanelContainerCancel"
              onClick={this.onCancel}
            >
              {cancelButtonText}
            </button>
            {isActive && !unchangedUrl && (
              <div className={styles.linkPanel_RemoveContainer}>
                <div className={styles.linkPanel_VerticalDivider} />
                <button
                  tabIndex={tabIndex}
                  aria-label={removeButtonText}
                  className={removeButtonClassName}
                  data-hook="linkPanelContainerRemove"
                  onClick={this.onDelete}
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
            onClick={this.onDone}
          >
            {doneButtonText}
          </button>
        </div>
      </FocusManager>
    );
  }
}

LinkPanelContainer.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  hidePanel: PropTypes.func.isRequired,
  url: PropTypes.string,
  targetBlank: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  nofollow: PropTypes.bool,
  isActive: PropTypes.bool,
  isMobile: PropTypes.bool,
  onOverrideContent: PropTypes.func,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
  unchangedUrl: PropTypes.bool,
};

export default LinkPanelContainer;

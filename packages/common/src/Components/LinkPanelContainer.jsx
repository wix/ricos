import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkPanel from './LinkPanel';
import FocusManager from './FocusManager';
import { mergeStyles } from '../Utils/mergeStyles';
import RadioGroupHorizontal from './RadioGroupHorizontal';
import styles from '../../statics/styles/link-panel.scss';
const LinkType = props => (
  <RadioGroupHorizontal
    dataSource={[{ value: 'url', labelText: 'Website address (URL)' }, { value: 'page', labelText: 'Site Page' }]}
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
  }

  setLinkPanel = linkPanel => this.linkPanel = linkPanel;

  onDoneClick = () => {
    const { onCancel, onDelete } = this.props;
    if (this.linkPanel.state.isValidUrl && this.linkPanel.state.url) {
      const { url, targetBlank, nofollow } = this.linkPanel.state;
      this.props.onDone && this.props.onDone({ url, targetBlank, nofollow });
    } else if (this.linkPanel.state.intermediateUrl === '') {
      onDelete();
      onCancel();
    } else {
      this.linkPanel.validateUrl();
    }
  };

  onCancelClick = () => this.props.onCancel && this.props.onCancel();

  onDeleteClick = () => {
    const { onCancel, onDelete } = this.props;
    onDelete();
    onCancel();
  }

  render() {
    const { styles } = this;
    const { url, targetBlank, nofollow, theme, isActive, anchorTarget, relValue, isMobile, t, ariaProps, tabIndex, uiSettings } = this.props;
    const doneButtonText = t('LinkPanelContainer_DoneButton');
    const cancelButtonText = t('LinkPanelContainer_CancelButton');
    const removeButtonText = t('LinkPanelContainer_RemoveButton');
    const doneButtonClassName = classNames(styles.linkPanel_FooterButton, styles.linkPanel_enabled);
    const cancelButtonClassName = classNames(styles.linkPanel_FooterButton, styles.linkPanel_Cancel);
    const removeButtonClassName = classNames(styles.linkPanel_FooterButton);
    const linkPanelContainerClassName = classNames(styles.linkPanel_container,
      {
        [styles.linkPanel_container_isMobile]: isMobile,
      });

    const linkPanelAriaProps = { 'aria-label': 'Link management' };
    return (
      <FocusManager className={linkPanelContainerClassName} data-hook="linkPanelContainer" role="form" {...ariaProps}>
        <div className={styles.linkPanel_content}>
          <LinkPanel
            onEnter={this.onDoneClick.bind(this)} onEscape={this.onCancelClick.bind(this)}
            ref={this.setLinkPanel} theme={theme} url={url} targetBlank={targetBlank} anchorTarget={anchorTarget}
            relValue={relValue} nofollow={nofollow} t={t} ariaProps={linkPanelAriaProps} uiSettings={uiSettings}
          />
          <div className={styles.linkPanel_actionsDivider} role="separator"/>
        </div>
        <div className={styles.linkPanel_Footer}>
          <div className={styles.linkPanel_LeftActions}>
            <button
              tabIndex={tabIndex} aria-label={cancelButtonText}
              className={cancelButtonClassName} data-hook="linkPanelContainerCancel" onClick={this.onCancelClick}
            >{cancelButtonText}
            </button>
            {isActive &&
            <div className={styles.linkPanel_RemoveContainer}>
              <div className={styles.linkPanel_VerticalDivider} />
              <button
                tabIndex={tabIndex} aria-label={removeButtonText}
                className={removeButtonClassName}
                data-hook="linkPanelContainerRemove" onClick={this.onDeleteClick}
              >{removeButtonText}
              </button>
            </div>
            }
          </div>
          <button
            tabIndex={tabIndex} aria-label={doneButtonText}
            className={doneButtonClassName} data-hook="linkPanelContainerDone" onClick={this.onDoneClick}
          >{doneButtonText}
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
};

export default LinkPanelContainer;

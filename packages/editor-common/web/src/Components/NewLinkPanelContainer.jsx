/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkPanel from './LinkPanel';
import LinkToAnchorPanel from './LinkToAnchorPanel';
import FocusManager from './FocusManager';
import { mergeStyles, isValidUrl } from 'wix-rich-content-common';
import RadioGroupHorizontal from './RadioGroupHorizontal';
import RadioGroup from './RadioGroup';
import styles from '../../statics/styles/new-link-panel.scss';
import { LinkIcon } from '../Icons';
import { getAnchorableBlocks } from './AnchorComponents/anchorUtils';

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

class NewLinkPanelContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { url, targetBlank, nofollow, getEditorState } = this.props;
    this.anchorableBlocksData = getAnchorableBlocks(getEditorState());
    this.state = {
      linkPanelValues: { url: url && isValidUrl(url) ? url : undefined, targetBlank, nofollow },
      anchorPanelValues: {
        url:
          url && !isValidUrl(url) && !this.isAnchorDeleted(url.slice(0, 5))
            ? url.slice(0, 5)
            : undefined, // slice to remove the unique id from the anchor
      },
      radioGroupValue: !url || isValidUrl(url) ? 'external-link' : 'anchor',
    };
  }

  isAnchorDeleted = url =>
    !this.anchorableBlocksData.anchorableBlocks.some(block => url === block.key);

  isDoneButtonEnable = () => {
    const { radioGroupValue } = this.state;
    switch (radioGroupValue) {
      case 'external-link': {
        const { linkPanelValues } = this.state;
        return linkPanelValues.isValid && !!linkPanelValues.url;
      }
      case 'anchor': {
        const { anchorPanelValues } = this.state;
        return !!anchorPanelValues.url;
      }
      default:
        // eslint-disable-next-line no-console
        console.error('Unknown radio');
        break;
    }
  };

  onDone = () => {
    const { radioGroupValue } = this.state;
    switch (radioGroupValue) {
      case 'external-link':
        this.onDoneLink();
        break;
      case 'anchor':
        this.onDoneAnchor();
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('Unknown radio');
        break;
    }
  };

  onDoneAnchor = () => {
    const { anchorPanelValues } = this.state;
    /*
    //add to the html element id attribute with the block key + uniqueId

    // const uniqueId =
    //   anchorPanelValues.url === 'test-blockKey'
    //     ? '123456789'
    //     : Math.random()
    //         .toString(36)
    //         .substr(2, 9);
    // const uniqueBlockKey = `${anchorPanelValues.url}-${uniqueId}`;

    const uniqueBlockKey = `${anchorPanelValues.url}`;
    //editor
    const listOfAllEditorBlocks = document.querySelectorAll(`[data-editor]`);
    let editorBlockElementToAnchor;
    listOfAllEditorBlocks.forEach(e => {
      if (e.dataset.offsetKey === `${anchorPanelValues.url}-0-0`) {
        editorBlockElementToAnchor = e;
      }
    });
    editorBlockElementToAnchor.setAttribute('id', `editor-${uniqueBlockKey}`);
    //viewer
    const viewerBlockElementToAnchor = document.querySelector(
      `[id=viewer-${anchorPanelValues.url}]`
    );
    viewerBlockElementToAnchor.setAttribute('id', `viewer-${uniqueBlockKey}`);
    //
    */
    if (anchorPanelValues.url) {
      this.props.onDone({ ...anchorPanelValues, url: anchorPanelValues.url, linkToAnchor: true });
    }
  };

  onDoneLink = () => {
    const { linkPanelValues } = this.state;
    if (linkPanelValues.isValid && linkPanelValues.url) {
      this.props.onDone(linkPanelValues);
    } else if (linkPanelValues.url === '') {
      this.onDelete();
    }
  };

  onDelete = () => {
    this.props.onDelete();
    this.props.hidePanel();
  };

  onCancel = () => this.props.onCancel();

  changeRadioGroup = value => {
    this.setState({ radioGroupValue: value });
  };

  renderButtons = () => {
    const { styles } = this;
    const { isActive, t, tabIndex } = this.props;
    const doneButtonText = t('LinkPanelContainer_DoneButton');
    const cancelButtonText = t('LinkPanelContainer_CancelButton');
    const removeButtonText = t('LinkPanelContainer_RemoveButton');
    const doneButtonClassName = classNames(
      styles.linkPanel_FooterButton,
      this.isDoneButtonEnable() ? styles.linkPanel_enabled : styles.linkPanel_disabled
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
            onClick={this.onCancel}
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
          disabled={this.isDoneButtonEnable() ? undefined : true}
        >
          {doneButtonText}
        </button>
      </div>
    );
  };

  renderMobileTabs = () => {
    const { styles } = this;
    const { t } = this.props;
    const { radioGroupValue } = this.state; // 'external-link' || 'anchor'

    return (
      <div>
        <div className={styles.linkPanel_tabsWrapper}>
          <div
            className={classNames(styles.linkPanel_tab, {
              [styles.linkPanel_tabSelected]: radioGroupValue === 'external-link',
            })}
            onClick={() => this.changeRadioGroup('external-link')}
            data-hook="linkPanelContainerLinkTab"
          >
            {t('LinkTo_Modal_Sidebar_Website')}
          </div>
          <div
            className={classNames(styles.linkPanel_tab, {
              [styles.linkPanel_tabSelected]: radioGroupValue === 'anchor',
            })}
            onClick={() => this.changeRadioGroup('anchor')}
            data-hook="linkPanelContainerAnchorTab"
          >
            {t('LinkTo_Modal_Sidebar_Section')}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { styles } = this;
    const { radioGroupValue } = this.state;
    const {
      getEditorState,
      setEditorState,
      theme,
      anchorTarget,
      relValue,
      isMobile,
      t,
      ariaProps,
      uiSettings,
    } = this.props;

    const { linkPanel } = uiSettings || {};
    const { blankTargetToggleVisibilityFn, nofollowRelToggleVisibilityFn } = linkPanel || {};
    const showTargetBlankCheckbox =
      blankTargetToggleVisibilityFn && blankTargetToggleVisibilityFn(anchorTarget);
    const showRelValueCheckbox =
      nofollowRelToggleVisibilityFn && nofollowRelToggleVisibilityFn(relValue);

    const linkPanelAriaProps = { 'aria-label': 'Link management' };
    return (
      <FocusManager
        className={styles.linkPanel_container}
        data-hook="linkPanelContainer"
        role="form"
        {...ariaProps}
      >
        {isMobile && this.renderButtons()}
        <div className={styles.linkPanel_header}>
          {isMobile && <LinkIcon style={{ width: '19px', height: '19px', marginRight: '11px' }} />}
          <div>{t('LinkTo_Modal_Header')}</div>
        </div>
        {!isMobile && <div className={styles.linkPanel_actionsDivider} role="separator" />}
        {isMobile && this.renderMobileTabs()}
        <div className={styles.linkPanel_content}>
          {!isMobile && (
            <RadioGroup
              className={styles.linkPanel_radioButtons}
              dataSource={[
                {
                  value: 'external-link',
                  labelText: t('LinkTo_Modal_Sidebar_Website'),
                  dataHook: 'link-radio',
                },
                {
                  value: 'anchor',
                  labelText: t('LinkTo_Modal_Sidebar_Section'),
                  dataHook: 'anchor-radio',
                },
              ]}
              value={this.state.radioGroupValue}
              onChange={this.changeRadioGroup}
              {...this.props}
            />
          )}
          {!isMobile && <div className={styles.linkPanel_VerticalDivider} />}
          {radioGroupValue === 'external-link' && (
            <LinkPanel
              onEnter={this.onDoneLink}
              onEscape={this.onCancel}
              linkValues={this.state.linkPanelValues}
              onChange={linkPanelValues => this.setState({ linkPanelValues })}
              theme={styles}
              showTargetBlankCheckbox={showTargetBlankCheckbox}
              showRelValueCheckbox={showRelValueCheckbox}
              t={t}
              ariaProps={linkPanelAriaProps}
              {...uiSettings?.linkPanel}
            />
          )}
          {radioGroupValue === 'anchor' && (
            <LinkToAnchorPanel
              anchorableBlocksData={this.anchorableBlocksData}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              onEnter={this.onDone}
              onEscape={this.onCancel}
              anchorValues={this.state.anchorPanelValues}
              onChange={anchorPanelValues => this.setState({ anchorPanelValues })}
              theme={theme}
              t={t}
              ariaProps={linkPanelAriaProps}
              {...uiSettings?.linkPanel}
            />
          )}
        </div>
        {!isMobile && <div className={styles.linkPanel_actionsDivider} role="separator" />}
        {!isMobile && this.renderButtons()}
      </FocusManager>
    );
  }
}

NewLinkPanelContainer.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
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
};

export default NewLinkPanelContainer;

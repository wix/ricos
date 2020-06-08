import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LinkPanel from '../LinkComponents/LinkPanel';
import AnchorPanel from '../AnchorPanel';
import FocusManager from '../FocusManager';
import { mergeStyles } from 'wix-rich-content-common';
import RadioGroup from '../RadioGroup';
import styles from '../../../statics/styles/new-link-panel.scss';
import { LinkIcon } from '../../Icons';
import { getAnchorableBlocks } from './anchorUtils';
import LinkActionsButtons from '../LinkComponents/LinkActionsButtons';
import NewLinkPanelMobileTabs from './NewLinkPanelMobileTabs';

const RADIO_GROUP_VALUES = { EXTERNAL_LINK: 'external-link', ANCHOR: 'anchor' };

class NewLinkPanelContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { url, anchor, targetBlank, nofollow, getEditorState } = this.props;
    this.anchorableBlocksData = getAnchorableBlocks(getEditorState());
    this.state = {
      linkPanelValues: { url, targetBlank, nofollow },
      anchorPanelValues: {
        anchor: !this.isAnchorDeleted(anchor) && anchor,
      },
      radioGroupValue: !anchor ? RADIO_GROUP_VALUES.EXTERNAL_LINK : RADIO_GROUP_VALUES.ANCHOR,
    };
  }

  isAnchorDeleted = anchor => {
    return !this.anchorableBlocksData.anchorableBlocks.some(block => anchor === block.key);
  };

  isDoneButtonEnable = () => {
    const { radioGroupValue } = this.state;
    switch (radioGroupValue) {
      case 'external-link': {
        const { linkPanelValues } = this.state;
        return linkPanelValues.isValid && !!linkPanelValues.url;
      }
      case 'anchor': {
        const { anchorPanelValues } = this.state;
        return !!anchorPanelValues.anchor;
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
    if (anchorPanelValues.anchor) {
      this.props.onDone({
        ...anchorPanelValues,
        anchor: anchorPanelValues.anchor,
      });
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
      isActive,
      tabIndex,
    } = this.props;

    const { linkPanel } = uiSettings || {};
    const { blankTargetToggleVisibilityFn, nofollowRelToggleVisibilityFn } = linkPanel || {};
    const showTargetBlankCheckbox =
      blankTargetToggleVisibilityFn && blankTargetToggleVisibilityFn(anchorTarget);
    const showRelValueCheckbox =
      nofollowRelToggleVisibilityFn && nofollowRelToggleVisibilityFn(relValue);
    const linkPanelAriaProps = { 'aria-label': 'Link management' };
    const sharedProps = {
      onEnter: this.onDone,
      onEscape: this.onCancel,
      theme: styles,
      t,
      ariaProps: linkPanelAriaProps,
      ...uiSettings?.linkPanel,
    };
    const buttonsProps = {
      onDone: this.onDone,
      onCancel: this.onCancel,
      onDelete: this.onDelete,
      isActive,
      theme,
      t,
      tabIndex,
      isDoneButtonEnable: this.isDoneButtonEnable(),
    };
    return (
      <FocusManager
        className={styles.linkPanel_container}
        data-hook="linkPanelContainer"
        role="form"
        {...ariaProps}
      >
        {isMobile && <LinkActionsButtons {...buttonsProps} />}
        <div className={styles.linkPanel_header}>
          {isMobile && <LinkIcon style={{ width: '19px', height: '19px', marginRight: '11px' }} />}
          <div>{t('LinkTo_Modal_Header')}</div>
        </div>
        {!isMobile && <div className={styles.linkPanel_actionsDivider} role="separator" />}
        {isMobile && (
          <NewLinkPanelMobileTabs
            theme={theme}
            t={t}
            radioGroupValue={radioGroupValue}
            changeRadioGroup={this.changeRadioGroup}
          />
        )}
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
              linkValues={this.state.linkPanelValues}
              onChange={linkPanelValues => this.setState({ linkPanelValues })}
              showTargetBlankCheckbox={showTargetBlankCheckbox}
              showRelValueCheckbox={showRelValueCheckbox}
              {...sharedProps}
            />
          )}
          {radioGroupValue === 'anchor' && (
            <AnchorPanel
              anchorableBlocksData={this.anchorableBlocksData}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              anchorValues={this.state.anchorPanelValues}
              onChange={anchorPanelValues => this.setState({ anchorPanelValues })}
              {...sharedProps}
            />
          )}
        </div>
        {!isMobile && <div className={styles.linkPanel_actionsDivider} role="separator" />}
        {!isMobile && <LinkActionsButtons {...buttonsProps} />}
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
  anchor: PropTypes.string,
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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../statics/styles/new-link-panel.scss';
import { getAnchorableBlocks } from './anchorUtils';
import NewLinkPanelContainerDesktop from './NewLinkPanelContainerDesktop';
import NewLinkPanelContainerMobile from './NewLinkPanelContainerMobile';
import { RADIO_GROUP_VALUES } from './consts';

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
      case RADIO_GROUP_VALUES.EXTERNAL_LINK: {
        const { linkPanelValues } = this.state;
        return linkPanelValues.isValid && !!linkPanelValues.url;
      }
      case RADIO_GROUP_VALUES.ANCHOR: {
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
      case RADIO_GROUP_VALUES.EXTERNAL_LINK:
        this.onDoneLink();
        break;
      case RADIO_GROUP_VALUES.ANCHOR:
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

  onChangeLinkPanel = linkPanelValues => {
    this.setState(linkPanelValues);
  };

  onChangeAnchorPanel = anchorPanelValues => {
    this.setState(anchorPanelValues);
  };

  render() {
    const { styles } = this;
    const { radioGroupValue, linkPanelValues, anchorPanelValues } = this.state;
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
    const propsToPass = {
      getEditorState,
      setEditorState,
      theme,
      t,
      ariaProps,
      showTargetBlankCheckbox,
      showRelValueCheckbox,
      sharedProps,
      buttonsProps,
      radioGroupValue,
      changeRadioGroup: this.changeRadioGroup,
      linkPanelValues,
      onChangeLinkPanel: this.onChangeLinkPanel,
      onChangeAnchorPanel: this.onChangeAnchorPanel,
      anchorableBlocksData: this.anchorableBlocksData,
      anchorPanelValues,
    };
    return isMobile ? (
      <NewLinkPanelContainerMobile {...propsToPass} />
    ) : (
      <NewLinkPanelContainerDesktop {...propsToPass} />
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

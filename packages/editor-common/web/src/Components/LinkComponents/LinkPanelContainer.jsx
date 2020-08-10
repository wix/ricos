import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getAnchorableBlocks } from '../AnchorComponents/anchorUtils';
import { RADIO_GROUP_VALUES } from '../AnchorComponents/consts';
import BasicLinkPanel from './BasicLinkPanel';
import MultiSelectLinkPanel from './MultiSelectLinkPanel';
import { isEmpty } from 'lodash';

class LinkPanelContainer extends PureComponent {
  constructor(props) {
    super(props);
    const {
      url,
      anchor,
      targetBlank,
      nofollow,
      editorState,
      linkTypes,
      unchangedUrl,
      originalLinkPanel,
    } = this.props;
    this.renderBasicLinkPanel =
      !linkTypes ||
      isEmpty(linkTypes) ||
      !Object.values(linkTypes).find(addon => !!addon) ||
      unchangedUrl ||
      originalLinkPanel;
    this.anchorableBlocksData = !this.renderBasicLinkPanel
      ? getAnchorableBlocks(editorState)
      : undefined;
    this.state = {
      linkPanelValues: { url, targetBlank, nofollow },
      anchorPanelValues: this.renderBasicLinkPanel
        ? undefined
        : {
            anchor: !this.isAnchorDeleted(anchor) && anchor,
          },
      radioGroupValue: this.renderBasicLinkPanel ? undefined : this.setInitialRadioGroupValue(),
    };
  }

  setInitialRadioGroupValue = () => {
    const { anchor } = this.props;
    return !anchor ? RADIO_GROUP_VALUES.EXTERNAL_LINK : RADIO_GROUP_VALUES.ANCHOR;
  };

  isAnchorDeleted = anchor => {
    return !this.anchorableBlocksData.anchorableBlocks.some(block => anchor === block.key);
  };

  isDoneButtonEnable = () => {
    const { radioGroupValue } = this.state;
    if (radioGroupValue) {
      switch (radioGroupValue) {
        case RADIO_GROUP_VALUES.EXTERNAL_LINK: {
          const { linkPanelValues } = this.state;
          return (linkPanelValues.isValid && !!linkPanelValues.url) || this.props.unchangedUrl;
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
    } else {
      const { linkPanelValues } = this.state;
      return (linkPanelValues.isValid && !!linkPanelValues.url) || this.props.unchangedUrl;
    }
  };

  onDone = () => {
    const { radioGroupValue } = this.state;
    if (radioGroupValue) {
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
    } else {
      this.onDoneLink();
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
    const { radioGroupValue, linkPanelValues, anchorPanelValues } = this.state;
    const {
      theme,
      anchorTarget,
      relValue,
      isMobile,
      t,
      ariaProps,
      uiSettings,
      isActive,
      tabIndex,
      linkPanelWithTitle,
      unchangedUrl,
    } = this.props;

    const { linkPanel } = uiSettings || {};
    const { blankTargetToggleVisibilityFn, nofollowRelToggleVisibilityFn } = linkPanel || {};
    const showTargetBlankCheckbox =
      blankTargetToggleVisibilityFn && blankTargetToggleVisibilityFn(anchorTarget);
    const showRelValueCheckbox =
      nofollowRelToggleVisibilityFn && nofollowRelToggleVisibilityFn(relValue);
    const linkPanelAriaProps = { 'aria-label': 'Link management' };
    const sharedPanelsProps = {
      theme,
      onEnter: this.onDone,
      onEscape: this.onCancel,
      t,
      ariaProps: linkPanelAriaProps,
      unchangedUrl,
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
      unchangedUrl,
      isMobile,
    };
    const propsToPass = {
      theme,
      t,
      ariaProps,
      showTargetBlankCheckbox,
      showRelValueCheckbox,
      sharedPanelsProps,
      buttonsProps,
      radioGroupValue,
      changeRadioGroup: this.changeRadioGroup,
      linkPanelValues,
      onChangeLinkPanel: this.onChangeLinkPanel,
      onChangeAnchorPanel: this.onChangeAnchorPanel,
      anchorableBlocksData: this.anchorableBlocksData,
      anchorPanelValues,
      isMobile,
      linkPanelWithTitle,
    };
    return this.renderBasicLinkPanel ? (
      <BasicLinkPanel {...propsToPass} />
    ) : (
      <MultiSelectLinkPanel {...propsToPass} />
    );
  }
}

LinkPanelContainer.propTypes = {
  editorState: PropTypes.object.isRequired,
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
  linkTypes: PropTypes.object,
  unchangedUrl: PropTypes.bool,
  originalLinkPanel: PropTypes.bool,
  linkPanelWithTitle: PropTypes.bool,
};

export default LinkPanelContainer;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MultiSelectLinkPanelDesktop from './MultiSelectLinkPanelDesktop';
import MultiSelectLinkPanelMobile from './MultiSelectLinkPanelMobile';

class MultiSelectLinkPanel extends PureComponent {
  render() {
    const { isMobile } = this.props;
    return isMobile ? (
      <MultiSelectLinkPanelMobile {...this.props} />
    ) : (
      <MultiSelectLinkPanelDesktop {...this.props} />
    );
  }
}

MultiSelectLinkPanel.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
  showNewTabCheckbox: PropTypes.bool,
  showNoFollowCheckbox: PropTypes.bool,
  showSponsoredCheckbox: PropTypes.bool,
  sharedPanelsProps: PropTypes.object,
  buttonsProps: PropTypes.object,
  radioGroupValue: PropTypes.string,
  changeRadioGroup: PropTypes.func,
  linkPanelValues: PropTypes.object,
  onChangeLinkPanel: PropTypes.func,
  onChangeAnchorPanel: PropTypes.func,
  anchorableBlocksData: PropTypes.object,
  anchorPanelValues: PropTypes.object,
  isMobile: PropTypes.bool,
  blockPreview: PropTypes.func,
};

export default MultiSelectLinkPanel;

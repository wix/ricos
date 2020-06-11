import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExtensiveLinkPanelDesktop from './ExtensiveLinkPanelDesktop';
import ExtensiveLinkPanelMobile from './ExtensiveLinkPanelMobile';

class ExtensiveLinkPanel extends PureComponent {
  render() {
    const { isMobile } = this.props;
    return isMobile ? (
      <ExtensiveLinkPanelMobile {...this.props} />
    ) : (
      <ExtensiveLinkPanelDesktop {...this.props} />
    );
  }
}

ExtensiveLinkPanel.propTypes = {
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
};

export default ExtensiveLinkPanel;

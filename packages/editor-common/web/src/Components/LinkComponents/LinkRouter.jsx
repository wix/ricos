import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewLinkPanelContainer from '../AnchorComponents/NewLinkPanelContainer';
import LinkPanelContainer from './LinkPanelContainer';

class LinkRouter extends Component {
  render() {
    const { linkPanelAddons, unchangedUrl, originalLinkPanel } = this.props;
    return !linkPanelAddons || linkPanelAddons.length === 0 || unchangedUrl || originalLinkPanel ? (
      <LinkPanelContainer {...this.props} />
    ) : (
      <NewLinkPanelContainer {...this.props} />
    );
  }
}

LinkRouter.propTypes = {
  linkPanelAddons: PropTypes.array,
  unchangedUrl: PropTypes.bool,
  originalLinkPanel: PropTypes.bool,
};

export default LinkRouter;

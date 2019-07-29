import { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from '../../Utils/decorateComponentWithProps';
import { isEmpty } from 'lodash';
import LinkPanelContainer from '../../Components/LinkPanelContainer';

class BlockLinkPanel extends Component {
  componentDidMount() {
    const { anchorTarget, relValue, theme, t, uiSettings } = this.props;
    const componentLink = this.props.pubsub.getBlockData({ key: 'componentLink' });
    const { url, targetBlank, nofollow } = componentLink || {};
    const linkContainerProps = {
      url,
      targetBlank,
      nofollow,
      theme,
      anchorTarget,
      relValue,
      t,
      isActive: !!componentLink,
      onDone: this.wrapBlockInLink,
      onCancel: this.hideLinkPanel,
      onDelete: this.deleteLink,
      onOverrideContent: this.props.onOverrideContent,
      uiSettings,
    };

    const LinkPanelContainerWithProps = decorateComponentWithProps(
      LinkPanelContainer,
      linkContainerProps
    );
    this.props.onOverrideContent(LinkPanelContainerWithProps);
  }

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub } = this.props;
    if (!isEmpty(url)) {
      pubsub.setBlockData({ key: 'componentLink', item: { url, targetBlank, nofollow } });
    } else {
      pubsub.setBlockData({ key: 'componentLink', item: null });
    }
    this.hideLinkPanel();
  };

  deleteLink = () => {
    this.props.pubsub.setBlockData({ key: 'componentLink', item: null });
  };

  hideLinkPanel = () => {
    this.props.onOverrideContent(undefined);
  };

  render() {
    return false;
  }
}

BlockLinkPanel.propTypes = {
  pubsub: PropTypes.object.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
};

export default BlockLinkPanel;

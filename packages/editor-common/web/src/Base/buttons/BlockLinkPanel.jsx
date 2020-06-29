import { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from '../../Utils/decorateComponentWithProps';
import { isEmpty } from 'lodash';
import LinkPanelContainer from '../../Components/LinkPanelContainer';
class BlockLinkPanel extends Component {
  componentDidMount() {
    const { anchorTarget, relValue, theme, t, uiSettings, pubsub, unchangedUrl } = this.props;
    const componentLink = pubsub.get('componentData')?.config?.link;
    const { url, target, rel } = componentLink || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    const linkContainerProps = {
      url,
      targetBlank,
      nofollow,
      theme,
      anchorTarget,
      relValue,
      t,
      isActive: !!url,
      onDone: this.wrapBlockInLink,
      onCancel: this.hideLinkPanel,
      onDelete: this.deleteLink,
      onOverrideContent: this.props.onOverrideContent,
      uiSettings,
      unchangedUrl,
    };

    const LinkPanelContainerWithProps = decorateComponentWithProps(
      LinkPanelContainer,
      linkContainerProps
    );
    this.props.onOverrideContent(LinkPanelContainerWithProps);
  }

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub, anchorTarget, relValue, unchangedUrl } = this.props;
    let target = '_blank',
      rel = 'nofollow';
    if (!targetBlank) {
      target = anchorTarget !== '_blank' ? anchorTarget : '_self';
    }
    if (!nofollow) {
      rel = relValue !== 'nofollow' ? relValue : 'noopener';
    }
    if (!isEmpty(url) || unchangedUrl) {
      pubsub.setBlockData({
        key: 'componentLink',
        item: { url: url ? url : pubsub.get('componentData')?.config?.link?.url, target, rel },
      });
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
  unchangedUrl: PropTypes.bool,
};

export default BlockLinkPanel;

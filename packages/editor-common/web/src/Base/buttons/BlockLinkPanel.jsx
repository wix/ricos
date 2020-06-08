import { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from '../../Utils/decorateComponentWithProps';
import { isEmpty } from 'lodash';
import LinkRouter from '../../Components/LinkComponents/LinkRouter';
class BlockLinkPanel extends Component {
  componentDidMount() {
    const {
      anchorTarget,
      relValue,
      theme,
      t,
      uiSettings,
      pubsub,
      unchangedUrl,
      getEditorState,
      setEditorState,
      linkPanelAddons,
    } = this.props;
    const componentLink = pubsub.getBlockData({ key: 'componentLink' });
    const { url, anchor, target, rel } = componentLink || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    const linkContainerProps = {
      url,
      anchor,
      targetBlank,
      nofollow,
      theme,
      anchorTarget,
      relValue,
      t,
      isActive: !isEmpty(componentLink),
      onDone: this.wrapBlockInLink,
      onCancel: this.hideLinkPanel,
      onDelete: this.deleteLink,
      onOverrideContent: this.props.onOverrideContent,
      uiSettings,
      unchangedUrl,
      getEditorState,
      setEditorState,
      linkPanelAddons,
    };

    const LinkPanelContainerWithProps = decorateComponentWithProps(LinkRouter, linkContainerProps);
    this.props.onOverrideContent(LinkPanelContainerWithProps);
  }

  wrapBlockInLink = ({ url, anchor, targetBlank, nofollow }) => {
    const { pubsub, anchorTarget, relValue, unchangedUrl } = this.props;
    let target = '_blank',
      rel = 'nofollow';
    if (!targetBlank) {
      target = anchorTarget !== '_blank' ? anchorTarget : '_self';
    }
    if (!nofollow) {
      rel = relValue !== 'nofollow' ? relValue : 'noopener';
    }
    if (!isEmpty(url) || !isEmpty(anchor) || unchangedUrl) {
      const item = url
        ? {
            url: url ? url : pubsub.get('componentData')?.config?.link?.url,
            target,
            rel,
          }
        : {
            anchor: anchor ? anchor : pubsub.get('componentData')?.config?.link?.anchor,
          };
      pubsub.setBlockData({
        key: 'componentLink',
        item,
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
  getEditorState: PropTypes.func,
  setEditorState: PropTypes.func,
  linkPanelAddons: PropTypes.array,
};

export default BlockLinkPanel;

import { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import isEmpty from 'lodash/isEmpty';
import LinkPanelContainer from '../../Components/LinkPanelContainer';

class BlockLinkPanel extends Component {
  componentDidMount() {
    const { anchorTarget, relValue, theme, t } = this.props;
    const componentLink = this.props.pubsub.get('componentLink');
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
    };

    const LinkPanelContainerWithProps = decorateComponentWithProps(LinkPanelContainer, linkContainerProps);
    this.props.onOverrideContent(LinkPanelContainerWithProps);
  }

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub } = this.props;
    if (!isEmpty(url)) {
      pubsub.set('componentLink', { url, targetBlank, nofollow });
    } else {
      pubsub.set('componentLink', null);
    }
    this.hideLinkPanel();
  };

  deleteLink = () => {
    this.props.pubsub.set('componentLink', null);
  }

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
};

export default BlockLinkPanel;

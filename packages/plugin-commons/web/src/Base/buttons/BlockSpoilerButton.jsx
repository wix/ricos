import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton } from 'wix-rich-content-editor-common';
import SpoilerButtonIcon from '../../Icons/SpoilerButtonIcon';
import { SPOILER_TYPE } from 'wix-rich-content-common';

class BlockSpoilerButton extends Component {
  handleClick = event => {
    event.preventDefault();
    this.toggleSpoiler();
  };

  toggleSpoiler = () => {
    const { pubsub } = this.props;
    const { spoiler = {} } = this.props.pubsub.get('componentData')?.config;

    pubsub.setBlockData({
      key: 'componentSpoiler',
      item: { ...spoiler, enabled: !this.isActive },
    });
  };

  get isActive() {
    const componentData = this.props.pubsub.get('componentData');
    return !!componentData?.config?.spoiler?.enabled;
  }

  render() {
    const { theme, helpers, isMobile, tabIndex, tooltipText } = this.props;
    return (
      <InlineToolbarButton
        onClick={this.handleClick}
        isActive={this.isActive}
        helpers={helpers}
        dataHook={'spoilerButton'}
        theme={theme}
        isMobile={isMobile}
        tooltipText={tooltipText}
        tabIndex={tabIndex}
        icon={SpoilerButtonIcon}
        pluginType={SPOILER_TYPE}
      />
    );
  }
}

BlockSpoilerButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  isMobile: PropTypes.bool,
  tabIndex: PropTypes.number,
  tooltipText: PropTypes.string,
};

export default BlockSpoilerButton;

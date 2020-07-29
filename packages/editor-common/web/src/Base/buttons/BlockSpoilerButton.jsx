import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineToolbarButton from '../../Components/InlineToolbarButton';
import { SpoilerButtonIcon } from '../../Icons';

class BlockSpoilerButton extends Component {
  handleClick = event => {
    event.preventDefault();
    this.wrapBlockInSpoiler();
  };

  wrapBlockInSpoiler = () => {
    const { pubsub } = this.props;
    const { spoiler = {} } = this.props.pubsub.get('componentData')?.config;

    pubsub.setBlockData({
      key: 'componentSpoiler',
      item: { ...spoiler, enabled: this.isActive ? null : true },
    });
  };

  get isActive() {
    const componentData = this.props.pubsub.get('componentData');
    return !!componentData?.config?.spoiler?.enabled;
  }

  render() {
    const { theme, isMobile, tabIndex, tooltipText } = this.props;
    return (
      <InlineToolbarButton
        onClick={this.handleClick}
        isActive={this.isActive}
        dataHook={'spoilerButton'}
        theme={theme}
        isMobile={isMobile}
        tooltipText={tooltipText}
        tabIndex={tabIndex}
        icon={SpoilerButtonIcon}
      />
    );
  }
}

BlockSpoilerButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  tabIndex: PropTypes.number,
  tooltipText: PropTypes.string,
};

export default BlockSpoilerButton;

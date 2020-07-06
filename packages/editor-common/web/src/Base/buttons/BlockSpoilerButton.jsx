import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineToolbarButton from '../../Components/InlineToolbarButton';
import spoilerButtonIcon from '../../Icons/spoilerButtonIcon.svg';

class BlockSpoilerButton extends Component {
  handleClick = event => {
    event.preventDefault();

    this.wrapBlockInSpoiler();
  };

  wrapBlockInSpoiler = () => {
    const { pubsub } = this.props;
    pubsub.setBlockData({ key: 'componentSpoiler', item: this.isActive ? null : true });
  };

  get isActive() {
    const componentData = this.props.pubsub.get('componentData');
    return !!componentData?.config?.spoiler;
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
        icon={spoilerButtonIcon}
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

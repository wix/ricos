import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/spoiler.scss';

class BlockSpoilerComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = {
      spoiler: props.componentData?.config?.spoiler || false,
      styles: mergeStyles({ styles, theme }),
    };
  }

  componentWillReceiveProps(props) {
    const spoiler = props.componentData?.config?.spoiler || false;
    this.setState({ spoiler });
  }

  handleClick = e => {
    const { onClick } = this.props;
    const { onRevealBlock } = this.state;
    debugger;
    if (onRevealBlock) {
      onClick && onClick(e);
    } else {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ onRevealBlock: true });
    }
  };

  render() {
    const { children } = this.props;
    const { styles, spoiler, onRevealBlock } = this.state;
    const spoilerProps = {
      className: spoiler && !onRevealBlock && styles?.hideBlock,
      onClick: this.handleClick,
    };
    return <div {...spoilerProps}>{children}</div>;
  }
}

BlockSpoilerComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  onClick: PropTypes.func,
};

export default BlockSpoilerComponent;

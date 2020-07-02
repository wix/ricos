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
    onRevealBlock && onClick && onClick(e);
  };

  onRevealSpoiler = e => {
    e.preventDefault();
    this.setState({ onRevealBlock: true });
  };

  render() {
    const { children, disabledRevealSpoilerBtn, isVideo } = this.props;
    const { styles, spoiler, onRevealBlock } = this.state;
    const spoilerProps = {
      className: spoiler && !onRevealBlock ? styles?.hideBlock : undefined,
      onClick: this.handleClick,
    };
    return (
      <div className={!isVideo && styles.spoilerWrapper}>
        {spoiler && !onRevealBlock && (
          <button
            className={styles.revealSpoilerBtn}
            onClick={this.onRevealSpoiler}
            disabled={disabledRevealSpoilerBtn}
          >
            Reveal Spoiler
          </button>
        )}
        <div {...spoilerProps}>{children}</div>
      </div>
    );
  }
}

BlockSpoilerComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  disabledRevealSpoilerBtn: PropTypes.bool,
  isVideo: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default BlockSpoilerComponent;

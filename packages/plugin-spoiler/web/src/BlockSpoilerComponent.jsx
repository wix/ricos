import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import InSpoilerInput from './InSpoilerInput';
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

  renderDescription(description) {
    const { blockProps, setInPluginEditingMode, enableEditDescription } = this.props;
    const { styles } = this.state;

    // debugger;
    return (
      <InSpoilerInput
        setInPluginEditingMode={setInPluginEditingMode}
        className={styles.spoilerDescription}
        value={description}
        onChange={this.handleDescriptionChange}
        setFocusToBlock={enableEditDescription && blockProps.setFocusToBlock}
        disabled={!enableEditDescription}
      />
    );
  }

  handleDescriptionChange = spoiler_description =>
    this.handleMetadataChange({ spoiler_description });

  handleMetadataChange = newMetadata => {
    const { componentData } = this.props;
    const metadata = { ...componentData.metadata, ...newMetadata };
    this.props.store.update(
      'componentData',
      { ...componentData, metadata },
      this.props.block.getKey()
    );
  };

  render() {
    const { children, disabledRevealSpoilerBtn, isVideo, componentData } = this.props;
    const { styles, spoiler, onRevealBlock } = this.state;
    const { metadata = {} } = componentData;
    const spoilerProps = {
      className: spoiler && !onRevealBlock ? styles?.hideBlock : undefined,
      onClick: this.handleClick,
    };
    return (
      <div className={!isVideo && styles.spoilerWrapper}>
        {spoiler && !onRevealBlock && (
          <div className={styles.descriptionAndRevealBtnWrapper}>
            {this.renderDescription(metadata.spoiler_description)}
            <button
              className={styles.revealSpoilerBtn}
              onClick={this.onRevealSpoiler}
              disabled={disabledRevealSpoilerBtn}
            >
              Reveal Spoiler
            </button>
          </div>
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
  enableEditDescription: PropTypes.bool,
  isVideo: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  setFocusToBlock: PropTypes.func,
  t: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  store: PropTypes.object,
  blockProps: PropTypes.object,
  block: PropTypes.object,
};

export default BlockSpoilerComponent;

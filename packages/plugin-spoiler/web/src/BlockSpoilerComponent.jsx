import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import InSpoilerInput from './InSpoilerInput';
import SpoilerIcon from './icons/SpoilerIcon.svg';
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

  componentDidUpdate() {
    const { height, width } = this?.element?.getBoundingClientRect();
    const { size = {} } = this.props;
    const currHeight = height || size.height;
    const currWidth = width || size.width;

    if (this.state.height !== currHeight || this.state.width !== currWidth) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ height: currHeight, width: currWidth });
    }
  }

  componentWillReceiveProps(props) {
    const { onRevealBlock } = this.state;
    const spoiler = props.componentData?.config?.spoiler || false;
    if (onRevealBlock) {
      this.setState({ spoiler, onRevealBlock: spoiler });
    } else {
      this.setState({ spoiler });
    }
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
    const { blockProps, setInPluginEditingMode, enableEditDescription, t, pluginType } = this.props;
    const { styles } = this.state;
    const value = description || t('Default_Description', { type: pluginType });

    return (
      <InSpoilerInput
        setInPluginEditingMode={setInPluginEditingMode}
        className={styles.spoilerDescription}
        value={value}
        onChange={this.handleDescriptionChange}
        setFocusToBlock={enableEditDescription && blockProps.setFocusToBlock}
        disabled={!enableEditDescription}
      />
    );
  }

  handleDescriptionChange = spoiler_description => {
    const { componentData } = this.props;
    const metadata = { ...componentData.metadata, spoiler_description };
    this.props.store.update(
      'componentData',
      { ...componentData, metadata },
      this.props.block.getKey()
    );
  };

  renderSpoilerContainer = () => {
    const { width, height } = this.state;
    const { disabledRevealSpoilerBtn, componentData, pluginType, t } = this.props;
    const { metadata = {} } = componentData;
    const containerClassName =
      pluginType === 'gallery' ? styles.spoilerContainer_Gallery : styles.spoilerContainer;

    if (width && height && (width < 340 || height < 240)) {
      return (
        <SpoilerIcon
          className={containerClassName}
          style={{ cursor: 'pointer' }}
          onClick={!disabledRevealSpoilerBtn && this.onRevealSpoiler}
        />
      );
    } else {
      return (
        <div className={containerClassName}>
          <SpoilerIcon />
          {this.renderDescription(metadata.spoiler_description)}
          <button
            className={styles.revealSpoilerBtn}
            onClick={this.onRevealSpoiler}
            disabled={disabledRevealSpoilerBtn}
          >
            {t('Reveal Spoiler')}
          </button>
        </div>
      );
    }
  };

  render() {
    const { children, pluginType } = this.props;
    const { styles, spoiler, onRevealBlock } = this.state;
    const spoilerProps = {
      className: spoiler && !onRevealBlock ? styles?.hideBlock : '',
      onClick: this.handleClick,
    };

    return (
      <div
        ref={ref => (this.element = ref)}
        className={styles.spoilerWrapper}
        style={{
          position: pluginType !== 'video' ? 'relative' : 'absolute',
        }}
      >
        {spoiler && !onRevealBlock && this.renderSpoilerContainer()}
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
  pluginType: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  setFocusToBlock: PropTypes.func,
  t: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  store: PropTypes.object,
  blockProps: PropTypes.object,
  block: PropTypes.object,
  size: PropTypes.object,
};

export default BlockSpoilerComponent;

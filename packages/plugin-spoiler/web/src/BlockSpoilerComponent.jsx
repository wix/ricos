import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import classnames from 'classnames';
import InSpoilerInput from './InSpoilerInput';
import SpoilerIcon from './icons/SpoilerIcon.svg';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';
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
    const { height, width } = this?.element?.getBoundingClientRect?.();
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
    const {
      blockProps,
      setInPluginEditingMode,
      enableEditDescription,
      t,
      pluginType,
      isMobile,
    } = this.props;
    const { styles } = this.state;
    const value = description || t(`Spoiler_Reveal_${pluginType}_Placeholder`);
    const className = classnames(
      styles.spoilerDescription,
      isMobile ? styles.spoilerDescription_Mobile : styles.spoilerDescription_Desktop
    );

    return (
      <InSpoilerInput
        setInPluginEditingMode={setInPluginEditingMode}
        className={className}
        isMobile={isMobile}
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
    const { disabledRevealSpoilerBtn, componentData, pluginType, t, isMobile } = this.props;
    const { metadata = {} } = componentData;
    const containerClassName =
      pluginType === 'Gallery' ? styles.spoilerContainer_Gallery : styles.spoilerContainer;

    let spoilerContainer;
    if (
      width &&
      height &&
      ((!isMobile && (width < 340 || height < 240)) || (isMobile && height < 228))
    ) {
      spoilerContainer = disabledRevealSpoilerBtn ? (
        <SpoilerIcon
          className={classnames(containerClassName, {
            [styles.cursorPointerOnIcon]: !disabledRevealSpoilerBtn,
          })}
          onClick={!disabledRevealSpoilerBtn ? this.onRevealSpoiler : undefined}
          data-hook={!disabledRevealSpoilerBtn && 'revealSpoilerBtn'}
        />
      ) : (
        <Tooltip content={t(`Spoiler_Reveal_${pluginType}_CTA`)} hideArrow>
          <SpoilerIcon
            className={classnames(containerClassName, {
              [styles.cursorPointerOnIcon]: !disabledRevealSpoilerBtn,
            })}
            onClick={!disabledRevealSpoilerBtn ? this.onRevealSpoiler : undefined}
            data-hook={!disabledRevealSpoilerBtn && 'revealSpoilerBtn'}
          />
        </Tooltip>
      );
    } else {
      const buttonClassName = classnames(
        styles.revealSpoilerBtn,
        isMobile ? styles.revealSpoilerBtn_Mobile : styles.revealSpoilerBtn_Desktop
      );

      spoilerContainer = (
        <div className={containerClassName} style={{ width: '100%' }}>
          <SpoilerIcon />
          {this.renderDescription(metadata.spoiler_description)}
          <button
            className={buttonClassName}
            onClick={this.onRevealSpoiler}
            disabled={disabledRevealSpoilerBtn}
            data-hook={!disabledRevealSpoilerBtn && 'revealSpoilerBtn'}
          >
            {t(`Spoiler_Reveal_${pluginType}_CTA`)}
          </button>
        </div>
      );
    }
    return spoilerContainer;
  };

  render() {
    const { children, pluginType, dataHook } = this.props;
    const { styles, spoiler, onRevealBlock } = this.state;

    let className = '';
    if (spoiler && !onRevealBlock) {
      className = pluginType === 'Gallery' ? styles.hideBlock_gallery : styles.hideBlock;
    }
    const spoilerProps = { className, onClick: this.handleClick };

    return (
      <div
        ref={ref => (this.element = ref)}
        data-hook={dataHook}
        className={styles.spoilerWrapper}
        style={{
          position: pluginType !== 'Video' ? 'relative' : 'absolute',
        }}
      >
        {spoiler && !onRevealBlock && this.renderSpoilerContainer()}
        <div {...spoilerProps}>
          {children}
          {spoiler && !onRevealBlock && (
            <div
              role="none"
              className={pluginType === 'Gallery' ? styles.overlay_gallery : styles.overlay}
            />
          )}
        </div>
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
  dataHook: PropTypes.string,
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

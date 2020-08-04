import React from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from 'wix-rich-content-common';
import classnames from 'classnames';
import SpoilerDescriptionInput from './SpoilerDescriptionInput';
import RevealButton from './RevealButton';
import SpoilerContainerIcon from './icons/SpoilerContainerIcon.svg';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';

class SpoilerContainer extends React.Component {
  static contextType = GlobalContext;

  renderDescription(description) {
    const {
      blockProps,
      setInPluginEditingMode,
      EditableSpoilerDescription,
      pluginType,
      styles,
    } = this.props;
    const { isMobile, t } = this.context;
    const className = classnames(
      styles.spoilerDescription,
      isMobile ? styles.spoilerDescription_Mobile : styles.spoilerDescription_Desktop
    );

    return (
      <SpoilerDescriptionInput
        setInPluginEditingMode={setInPluginEditingMode}
        className={className}
        isMobile={isMobile}
        value={description || t(`Spoiler_Reveal_${pluginType}_Placeholder`)}
        onChange={this.handleDescriptionChange}
        setFocusToBlock={EditableSpoilerDescription && blockProps?.setFocusToBlock}
        disabled={!EditableSpoilerDescription}
      />
    );
  }

  handleDescriptionChange = description => {
    this.updateComponentData({ description });
  };

  handleButtonContentChange = buttonContent => {
    this.updateComponentData({ buttonContent });
  };

  updateComponentData = data => {
    const { componentData } = this.props;
    const { spoiler } = componentData?.config;
    const config = { ...componentData?.config, spoiler: { ...spoiler, ...data } };
    this.props.store.update(
      'componentData',
      { ...componentData, config },
      this.props.block.getKey()
    );
  };

  getReducedContainer = className => {
    const { disabledRevealSpoilerBtn, onRevealSpoiler, pluginType } = this.props;
    const { t } = this.context;

    const container = (
      <SpoilerContainerIcon
        className={className}
        style={{ cursor: !disabledRevealSpoilerBtn ? 'pointer' : 'auto' }}
        onClick={!disabledRevealSpoilerBtn ? onRevealSpoiler : undefined}
        data-hook={!disabledRevealSpoilerBtn && 'revealSpoilerBtn'}
      />
    );

    return disabledRevealSpoilerBtn ? (
      container
    ) : (
      <Tooltip content={t(`Spoiler_Reveal_${pluginType}_CTA`)} hideArrow>
        {container}
      </Tooltip>
    );
  };

  getExpandedContainer = containerClassName => {
    const {
      EditableSpoilerDescription,
      disabledRevealSpoilerBtn,
      componentData,
      pluginType,
      onRevealSpoiler,
      styles,
      setInPluginEditingMode,
      blockProps,
    } = this.props;
    const { description, buttonContent } = componentData?.config?.spoiler;
    const { isMobile, t } = this.context;
    const content = buttonContent || t(`Spoiler_Reveal_${pluginType}_CTA`);
    const buttonClassName = classnames(styles.revealSpoilerBtn, {
      [styles.onHoverBtn]: !disabledRevealSpoilerBtn,
    });

    return (
      <div className={containerClassName} style={{ width: '100%' }}>
        <SpoilerContainerIcon />
        {this.renderDescription(description)}
        <RevealButton
          onRevealSpoiler={onRevealSpoiler}
          isMobile={isMobile}
          EditableSpoilerDescription={EditableSpoilerDescription}
          className={buttonClassName}
          value={content}
          onChange={this.handleButtonContentChange}
          setInPluginEditingMode={setInPluginEditingMode}
          setFocusToBlock={blockProps?.setFocusToBlock}
        />
      </div>
    );
  };

  render() {
    const { isMobile } = this.context;
    const { pluginType, width, height, styles } = this.props;
    const containerClassName =
      pluginType === 'Gallery' ? styles.spoilerContainer_Gallery : styles.spoilerContainer;
    let spoilerContainer;
    if (
      width &&
      height &&
      ((!isMobile && (width < 340 || height < 240)) || (isMobile && height < 228))
    ) {
      spoilerContainer = this.getReducedContainer(containerClassName);
    } else {
      spoilerContainer = this.getExpandedContainer(containerClassName);
    }
    return spoilerContainer;
  }
}

SpoilerContainer.propTypes = {
  componentData: PropTypes.object.isRequired,
  styles: PropTypes.object,
  disabledRevealSpoilerBtn: PropTypes.bool,
  EditableSpoilerDescription: PropTypes.bool,
  pluginType: PropTypes.string,
  onRevealSpoiler: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  store: PropTypes.object,
  blockProps: PropTypes.object,
  block: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default SpoilerContainer;

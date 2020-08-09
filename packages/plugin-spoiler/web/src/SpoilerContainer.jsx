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
      setInPluginEditingMode,
      isEditableText,
      pluginType,
      styles,
      handleDescriptionChange,
      setFocusToBlock,
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
        value={description || t(`Spoiler_Reveal_${pluginType}_Placeholder`)}
        onChange={handleDescriptionChange}
        setFocusToBlock={isEditableText && setFocusToBlock}
        disabled={!isEditableText}
      />
    );
  }

  getReducedContainer = className => {
    const { disabledRevealSpoilerBtn, onRevealSpoiler, pluginType } = this.props;
    const { t } = this.context;

    const container = (
      <SpoilerContainerIcon
        className={className}
        style={{ cursor: !disabledRevealSpoilerBtn ? 'pointer' : 'auto' }}
        onClick={onRevealSpoiler}
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
      isEditableText,
      disabledRevealSpoilerBtn,
      componentData,
      pluginType,
      onRevealSpoiler,
      styles,
      setInPluginEditingMode,
      setFocusToBlock,
      handleButtonContentChange,
    } = this.props;
    const { description, buttonContent } = componentData?.config?.spoiler;
    const { isMobile, t } = this.context;
    const content = buttonContent || t(`Spoiler_Reveal_${pluginType}_CTA`);
    const buttonClassName = classnames(styles.revealSpoilerBtn, {
      [styles.onHoverBtn]: !disabledRevealSpoilerBtn,
    });

    return (
      <div className={containerClassName} style={{ width: '100%' }}>
        <SpoilerContainerIcon
          style={{ cursor: !disabledRevealSpoilerBtn ? 'pointer' : 'auto' }}
          onClick={onRevealSpoiler}
        />
        {this.renderDescription(description)}
        <RevealButton
          onRevealSpoiler={onRevealSpoiler}
          isMobile={isMobile}
          isEditableText={isEditableText}
          disabledRevealSpoilerBtn={disabledRevealSpoilerBtn}
          className={buttonClassName}
          value={content}
          onChange={handleButtonContentChange}
          setInPluginEditingMode={setInPluginEditingMode}
          setFocusToBlock={setFocusToBlock}
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
      ((!isMobile && (width < 340 || height < 230)) || (isMobile && height < 228))
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
  isEditableText: PropTypes.bool,
  pluginType: PropTypes.string,
  onRevealSpoiler: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  handleDescriptionChange: PropTypes.func,
  handleButtonContentChange: PropTypes.func,
};

export default SpoilerContainer;

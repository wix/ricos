import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpoilerDescriptionInput from './SpoilerDescriptionInput';
import RevealButton from './RevealButton';
import SpoilerContainerIcon from './icons/SpoilerContainerIcon.svg';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';

class SpoilerContainer extends React.Component {
  renderDescription(description) {
    const {
      setInPluginEditingMode,
      pluginType,
      styles,
      handleDescriptionChange,
      setFocusToBlock,
      isMobile,
      t,
    } = this.props;
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
        setFocusToBlock={setFocusToBlock}
      />
    );
  }

  getReducedContainer = className => {
    const { onRevealSpoiler, pluginType, t } = this.props;
    const disabledRevealBtn = !onRevealSpoiler;
    const container = (
      <SpoilerContainerIcon
        className={className}
        style={{ cursor: !disabledRevealBtn ? 'pointer' : 'auto' }}
        onClick={onRevealSpoiler}
        data-hook={'revealSpoilerBtn'}
      />
    );

    return disabledRevealBtn ? (
      container
    ) : (
      <Tooltip content={t(`Spoiler_Reveal_${pluginType}_CTA`)} hideArrow>
        {container}
      </Tooltip>
    );
  };

  getExpandedContainer = containerClassName => {
    const {
      description,
      buttonContent,
      pluginType,
      onRevealSpoiler,
      styles,
      setInPluginEditingMode,
      setFocusToBlock,
      handleButtonContentChange,
      isMobile,
      t,
    } = this.props;
    const disabledRevealBtn = !onRevealSpoiler;
    const content = buttonContent || t(`Spoiler_Reveal_${pluginType}_CTA`);
    const buttonClassName = classnames(styles.revealSpoilerBtn, {
      [styles.onHoverBtn]: !disabledRevealBtn,
    });

    return (
      <div className={containerClassName} style={{ width: '100%' }}>
        <SpoilerContainerIcon
          style={{ cursor: !disabledRevealBtn ? 'pointer' : 'auto' }}
          onClick={onRevealSpoiler}
        />
        {this.renderDescription(description)}
        <RevealButton
          onRevealSpoiler={onRevealSpoiler}
          isMobile={isMobile}
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
    const { pluginType, width, height, styles, isMobile } = this.props;
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
  description: PropTypes.string,
  buttonContent: PropTypes.string,
  styles: PropTypes.object,
  pluginType: PropTypes.string,
  onRevealSpoiler: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  handleDescriptionChange: PropTypes.func,
  handleButtonContentChange: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default SpoilerContainer;

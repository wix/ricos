import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';
import SpoilerContainer from './SpoilerContainer';
import classNames from 'classnames';
import styles from '../statics/styles/spoiler.scss';

const Overlay = ({ hideOverlay, pluginType }) =>
  !hideOverlay ? (
    <div
      role="none"
      className={pluginType === 'Gallery' ? styles.overlay_gallery : styles.overlay}
    />
  ) : null;

Overlay.propTypes = {
  hideOverlay: PropTypes.bool,
  pluginType: PropTypes.string,
};

class BlockSpoilerComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = {
      styles: mergeStyles({ styles, theme }),
    };
  }

  static contextType = GlobalContext;

  handleClick = e => {
    const { onClick } = this.props;
    const { isReveal } = this.state;
    isReveal && onClick?.(e);
  };

  onRevealSpoiler = e => {
    e.preventDefault();
    this.setState({ isReveal: true });
  };

  renderSpoilerContainer = () => {
    const { isReveal, styles } = this.state;
    const {
      disabledRevealSpoilerBtn,
      setFocusToBlock,
      componentData,
      pluginType,
      setInPluginEditingMode,
      handleButtonContentChange,
      handleDescriptionChange,
    } = this.props;

    const width = this.state?.elementRef?.offsetWidth;
    const height = this.state?.elementRef?.offsetHeight;
    return (
      !isReveal && (
        <SpoilerContainer
          styles={styles}
          width={width}
          height={height}
          setInPluginEditingMode={setInPluginEditingMode}
          setFocusToBlock={setFocusToBlock}
          pluginType={pluginType}
          description={componentData?.config?.spoiler?.description}
          buttonContent={componentData?.config?.spoiler?.buttonContent}
          onRevealSpoiler={!disabledRevealSpoilerBtn ? this.onRevealSpoiler : undefined}
          handleButtonContentChange={handleButtonContentChange}
          handleDescriptionChange={handleDescriptionChange}
        />
      )
    );
  };

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.handleClick(e);
    }
  };

  setRef = ref => this.setState({ elementRef: ref });

  render() {
    const { children, pluginType, width } = this.props;
    const { styles, isReveal } = this.state;
    let className = '';
    if (!isReveal) {
      className = pluginType === 'Gallery' ? styles.hideBlock_gallery : styles.hideBlock;
    }

    return (
      <div
        ref={this.setRef}
        className={classNames(styles.spoilerWrapper, this.props.className)}
        style={{ width }}
      >
        {this.renderSpoilerContainer()}
        <div
          className={className}
          onClick={this.handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={this.onKeyDown}
        >
          {children}
          <Overlay hideOverlay={isReveal} pluginType={pluginType} />
        </div>
      </div>
    );
  }
}

BlockSpoilerComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  theme: PropTypes.object,
  disabledRevealSpoilerBtn: PropTypes.bool,
  isEditableText: PropTypes.bool,
  pluginType: PropTypes.string,
  onClick: PropTypes.func,
  handleDescriptionChange: PropTypes.func,
  handleButtonContentChange: PropTypes.func,
  className: PropTypes.string,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  width: PropTypes.object,
};

export default BlockSpoilerComponent;

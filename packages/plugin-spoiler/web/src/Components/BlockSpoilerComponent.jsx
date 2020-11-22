import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import SpoilerContainer from './SpoilerContainer';
import classNames from 'classnames';
import styles from '../../statics/styles/spoiler.scss';
import { debounce } from 'lodash';

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

  componentDidMount() {
    if (window?.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(debounce(this.onResizeElement, 60));
      this.resizeObserver?.observe(this.elementRef);
    }
  }

  onResizeElement = () => {
    this.forceUpdate();
  };

  componentWillUnmount() {
    if (window?.ResizeObserver) {
      this.resizeObserver?.unobserve(this.elementRef);
    }
  }

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
      isMobile,
      t,
    } = this.props;

    const width = this.elementRef?.offsetWidth;
    const height = this.elementRef?.offsetHeight;
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
          isMobile={isMobile}
          t={t}
        />
      )
    );
  };

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.handleClick(e);
    }
  };

  setRef = ref => (this.elementRef = ref);

  render() {
    const { children, pluginType, width, isMobile } = this.props;
    const { styles, isReveal } = this.state;
    let className = '';
    if (!isReveal) {
      className = pluginType === 'Gallery' ? styles.hideBlock_gallery : styles.hideBlock;
    }

    return (
      <div
        ref={this.setRef}
        className={classNames(styles.spoilerWrapper, this.props.className, {
          [styles.isMobile]: isMobile,
        })}
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
  t: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default BlockSpoilerComponent;

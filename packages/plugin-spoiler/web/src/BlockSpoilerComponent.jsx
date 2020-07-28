import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';
import SpoilerContainer from './SpoilerContainer';
import styles from '../statics/styles/spoiler.scss';

class BlockSpoilerComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = {
      hasSpoiler: props.componentData?.config?.spoiler || false,
      styles: mergeStyles({ styles, theme }),
    };
  }

  static contextType = GlobalContext;

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
    const { isReveal } = this.state;
    const hasSpoiler = props.componentData?.config?.spoiler || false;
    if (isReveal) {
      this.setState({ hasSpoiler, isReveal: hasSpoiler });
    } else {
      this.setState({ hasSpoiler });
    }
  }

  handleClick = e => {
    const { onClick } = this.props;
    const { isReveal } = this.state;
    isReveal && onClick && onClick(e);
  };

  onRevealSpoiler = e => {
    e.preventDefault();
    this.setState({ isReveal: true });
  };

  renderSpoilerContainer = () => {
    const { width, height, hasSpoiler, isReveal, styles } = this.state;
    const {
      disabledRevealSpoilerBtn,
      setFocusToBlock,
      enableEditDescription,
      componentData,
      pluginType,
      block,
      blockProps,
      store,
      setInPluginEditingMode,
    } = this.props;

    return (
      hasSpoiler &&
      !isReveal && (
        <SpoilerContainer
          styles={styles}
          block={block}
          width={width}
          height={height}
          blockProps={blockProps}
          store={store}
          setInPluginEditingMode={setInPluginEditingMode}
          setFocusToBlock={setFocusToBlock}
          pluginType={pluginType}
          enableEditDescription={enableEditDescription}
          disabledRevealSpoilerBtn={disabledRevealSpoilerBtn}
          componentData={componentData}
          onRevealSpoiler={this.onRevealSpoiler}
        />
      )
    );
  };

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.handleClick(e);
    }
  };

  render() {
    const { children, pluginType, dataHook } = this.props;
    const { styles, hasSpoiler, isReveal } = this.state;

    let className = '';
    if (hasSpoiler && !isReveal) {
      className = pluginType === 'Gallery' ? styles.hideBlock_gallery : styles.hideBlock;
    }

    return (
      <div
        ref={ref => (this.element = ref)}
        data-hook={dataHook}
        className={styles.spoilerWrapper}
        style={{
          position: pluginType !== 'Video' ? 'relative' : 'absolute',
        }}
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
          {hasSpoiler && !isReveal && (
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
  disabledRevealSpoilerBtn: PropTypes.bool,
  enableEditDescription: PropTypes.bool,
  pluginType: PropTypes.string,
  dataHook: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  store: PropTypes.object,
  blockProps: PropTypes.object,
  block: PropTypes.object,
  size: PropTypes.object,
};

export default BlockSpoilerComponent;

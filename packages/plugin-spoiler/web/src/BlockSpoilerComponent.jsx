import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';
import SpoilerContainer from './SpoilerContainer';
import classNames from 'classnames';
import styles from '../statics/styles/spoiler.scss';

class BlockSpoilerComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = {
      hasSpoiler: props.componentData?.config?.spoiler?.enabled || false,
      styles: mergeStyles({ styles, theme }),
    };
  }

  static contextType = GlobalContext;

  componentDidMount() {
    const { offsetWidth: width, offsetHeight: height } = this?.element;
    this.setState({ height, width });
  }

  componentDidUpdate() {
    const { offsetWidth: width, offsetHeight: height } = this?.element;
    const currHeight = height || this.state.height;
    const currWidth = width || this.state.width;
    if (this.state.height !== currHeight || this.state.width !== currWidth) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ height: currHeight, width: currWidth });
    }
  }

  componentWillReceiveProps(props) {
    const { isReveal } = this.state;
    const hasSpoiler = props.componentData?.config?.spoiler?.enabled || false;
    if (isReveal) {
      this.setState({ hasSpoiler, isReveal: hasSpoiler });
    } else {
      this.setState({ hasSpoiler });
    }
  }

  handleClick = e => {
    const { onClick } = this.props;
    const { isReveal, hasSpoiler } = this.state;
    (!hasSpoiler || isReveal) && onClick?.(e);
  };

  onRevealSpoiler = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ isReveal: true });
  };

  renderSpoilerContainer = () => {
    const { width, height, hasSpoiler, isReveal, styles } = this.state;
    const {
      disabledRevealSpoilerBtn,
      setFocusToBlock,
      EditableSpoilerDescription,
      componentData,
      pluginType,
      block,
      blockProps,
      store,
      setInPluginEditingMode,
      size,
    } = this.props;

    return (
      hasSpoiler &&
      !isReveal && (
        <SpoilerContainer
          styles={styles}
          block={block}
          width={width || size?.width}
          height={height}
          blockProps={blockProps}
          store={store}
          setInPluginEditingMode={setInPluginEditingMode}
          setFocusToBlock={setFocusToBlock}
          pluginType={pluginType}
          EditableSpoilerDescription={EditableSpoilerDescription}
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
    const { children, pluginType, dataHook, size = {} } = this.props;
    const { styles, hasSpoiler, isReveal } = this.state;

    let className = '';
    if (hasSpoiler && !isReveal) {
      className = pluginType === 'Gallery' ? styles.hideBlock_gallery : styles.hideBlock;
    }

    return (
      <div
        ref={ref => (this.element = ref)}
        data-hook={dataHook}
        className={classNames(styles.spoilerWrapper, this.props.className)}
        style={size}
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
  EditableSpoilerDescription: PropTypes.bool,
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

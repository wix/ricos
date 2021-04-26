/* eslint-disable react/no-find-dom-node */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { merge, compact, debounce } from 'lodash';
import classNames from 'classnames';
import {
  alignmentClassName,
  sizeClassName,
  textWrapClassName,
  createHocName,
} from 'wix-rich-content-common';
import styles from 'wix-rich-content-editor-common/dist/statics/styles/general.scss';
import rtlIgnoredStyles from 'wix-rich-content-common/dist/statics/styles/general.rtlignore.scss';

const DEFAULTS = Object.freeze({
  alignment: null,
  size: 'content',
  url: undefined,
  textWrap: null,
});

const createBaseComponent = ({
  PluginComponent,
  theme,
  settings,
  pubsub,
  commonPubsub,
  helpers,
  t,
  isMobile,
  pluginDecorationProps,
  componentWillReceiveDecorationProps,
  getEditorBounds,
  onOverlayClick,
  disableRightClick,
  onComponentMount,
  locale,
  shouldRenderOptimizedImages,
  iframeSandboxDomain,
  setInPluginEditingMode,
  getInPluginEditingMode,
  anchorTarget,
  relValue,
  renderInnerRCE,
  noPluginBorder,
  noPointerEventsOnFocus,
  withHorizontalScroll,
  disableKeyboardEvents,
  addNewLineBelow,
  addNewLineAbove,
}) => {
  return class WrappedComponent extends Component {
    static propTypes = {
      block: PropTypes.object.isRequired,
      blockProps: PropTypes.object.isRequired,
      selection: PropTypes.object.isRequired,
      className: PropTypes.string,
      onClick: PropTypes.func,
      onDragStart: PropTypes.func,
    };

    static displayName = createHocName('BaseComponent', PluginComponent);

    constructor(props) {
      super(props);
      this.state = { componentState: {}, ...this.stateFromProps(props) };
      this.styles = { ...styles, ...rtlIgnoredStyles };
      this.containerRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
      componentWillReceiveDecorationProps?.(this.props, nextProps, this.updateComponentConfig);
      this.setState(this.stateFromProps(nextProps));
    }

    onResizeElement = blockKey => element => {
      const boundingRect = this.getBoundingClientRectAsObject(element[0].target);
      const focusedBlock = pubsub.get('focusedBlock');
      const shouldResize = boundingRect.width !== 0 && focusedBlock === blockKey;

      if (shouldResize) {
        const batchUpdates = {};
        batchUpdates.boundingRect = boundingRect;
        batchUpdates.focusedBlock = focusedBlock;
        pubsub.set(batchUpdates);
      }
    };

    stateFromProps(props) {
      const initialState = commonPubsub.get('initialState_' + props.block.getKey());
      if (initialState) {
        //reset the initial state
        commonPubsub.set('initialState_' + props.block.getKey(), undefined);
      }
      return {
        componentData: this.getData(props),
        componentState: initialState || {},
      };
    }

    getData(props) {
      const { getData } = props.blockProps;
      const data = getData() || { config: DEFAULTS };
      if (settings?.defaultData) {
        merge(data, settings.defaultData);
      }
      return data;
    }

    componentDidMount() {
      this.updateComponent();
      this.subscriptions = [
        ['componentData', this.onComponentDataChange],
        ['componentState', this.onComponentStateChange],
      ];
      this.subscriptions.forEach(subscription => pubsub.subscribe(...subscription));
      const blockKey = this.props.block.getKey();
      this.subscriptionsOnBlock = [
        { key: 'htmlPluginMaxHeight', callback: this.onHtmlPluginMaxHeightChange },
        { key: 'componentLink', callback: this.onComponentLinkChange },
        { key: 'componentSpoiler', callback: this.onComponentSpoilerChange },
      ].map(({ key, callback }) => pubsub.subscribeOnBlock({ key, callback, blockKey }));
      const { componentData } = this.state;
      const e = { preventDefault: () => {} };
      onComponentMount && onComponentMount({ e, pubsub, componentData });
      if (window?.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(debounce(this.onResizeElement(blockKey), 40));
        this.resizeObserver?.observe(this.containerRef.current);
      }
    }

    componentDidUpdate() {
      this.duringUpdate = true;
      this.updateComponent();
      this.duringUpdate = false;
    }

    componentWillUnmount() {
      this.subscriptions.forEach(subscription => pubsub.unsubscribe(...subscription));
      this.subscriptionsOnBlock.forEach(unsubscribe => unsubscribe());
      this.updateUnselectedComponent();
      this.resizeObserver?.unobserve(this.containerRef.current);
    }

    isMe = blockKey => {
      const { block } = this.props;
      if (blockKey) {
        return blockKey === block.getKey();
      } else {
        return pubsub.get('focusedBlock') === block.getKey();
      }
    };

    isMeAndIdle = blockKey => {
      return this.isMe(blockKey) && !this.duringUpdate;
    };

    onComponentDataChange = (componentData, blockKey) => {
      if (this.isMeAndIdle(blockKey)) {
        this.setState({ componentData: componentData || {} }, () => {
          const {
            blockProps: { setData },
          } = this.props;
          setData(componentData);
        });
      }
    };

    onComponentStateChange = (componentState, blockKey) => {
      if (this.isMeAndIdle(blockKey)) {
        this.setState({ componentState: componentState || {} });
      }
    };

    onHtmlPluginMaxHeightChange = htmlPluginMaxHeight => {
      if (htmlPluginMaxHeight) {
        this.setState({ htmlPluginMaxHeight });
      }
    };

    onComponentLinkChange = linkData => {
      if (!linkData) {
        this.updateLinkData(null);
        return;
      }
      const { url, anchor, target, rel } = linkData;
      if (this.isMeAndIdle()) {
        const link = url
          ? {
              url,
              target,
              rel,
            }
          : { anchor };
        this.updateLinkData(link);
      }
    };

    onComponentSpoilerChange = data => {
      if (this.isMeAndIdle()) {
        this.updateComponentConfig({ spoiler: data });
      }
    };

    updateLinkData = link => {
      pubsub.update('componentData', { config: { link: null } }); // clean the link data (prevent deep merging bug with anchor/link)
      pubsub.update('componentData', { config: { link } });
    };

    deleteBlock = () => {
      pubsub.set('focusedBlock', null);
      this.props.blockProps.deleteBlock();
    };

    updateComponent() {
      const { block, blockProps } = this.props;
      if (blockProps.isFocused && blockProps.isCollapsedSelection) {
        this.updateSelectedComponent();
      } else if (pubsub.get('focusedBlock') === block.getKey()) {
        this.updateUnselectedComponent();
      }
    }

    handleClick = e => {
      if (onOverlayClick) {
        const { componentData } = this.state;
        onOverlayClick({ e, pubsub, componentData });
      }
      const { onClick } = this.props;
      onClick && onClick(e);
    };

    updateComponentConfig = newConfig => {
      pubsub.update('componentData', { config: newConfig });
    };

    getBoundingClientRectAsObject = element => {
      const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect();
      return { top, right, bottom, left, width, height, x, y };
    };

    updateSelectedComponent() {
      const { block } = this.props;

      const oldFocusedBlock = pubsub.get('focusedBlock');
      const focusedBlock = block.getKey();
      const blockNode = this.containerRef.current;
      const boundingRect = this.getBoundingClientRectAsObject(blockNode);

      if (oldFocusedBlock !== focusedBlock) {
        const batchUpdates = {};
        batchUpdates.boundingRect = boundingRect;
        batchUpdates.componentData = this.state.componentData;
        batchUpdates.componentState = {};
        batchUpdates.deleteBlock = this.deleteBlock;
        batchUpdates.focusedBlock = focusedBlock;
        pubsub.set(batchUpdates);
      } else {
        //maybe just the position has changed
        pubsub.set('boundingRect', boundingRect);
      }
    }

    updateUnselectedComponent() {
      pubsub.set({ focusedBlock: null, componentData: {}, componentState: {} });
    }

    handleContextMenu = e => disableRightClick && e.preventDefault();

    setComponentUrl = url => (this.url = url);

    onDragStart = event => {
      this.props.onDragStart(event);
      event.dataTransfer.setData('url', this.url || window?.location?.href);
    };

    // eslint-disable-next-line complexity
    render = () => {
      const { blockProps, className, selection } = this.props;
      const { componentData } = this.state;
      const { containerClassName, ...decorationProps } =
        pluginDecorationProps?.(this.props, componentData) || {};
      const { width: currentWidth, height: currentHeight } = componentData.config || {};
      const { width: initialWidth, height: initialHeight } = settings || {};
      const isEditorFocused = selection.getHasFocus();
      const isOneBlockSelected = selection.getStartKey() === selection.getEndKey();
      const isPartOfSelection = blockProps.isFocused && !isOneBlockSelected;
      blockProps.isFocused = blockProps.isFocused && isOneBlockSelected;

      const { isFocused } = blockProps;

      const classNameStrategies = compact([
        PluginComponent.alignmentClassName || alignmentClassName,
        PluginComponent.sizeClassName || sizeClassName,
        PluginComponent.textWrapClassName || textWrapClassName,
        PluginComponent.customClassName,
      ]).map(strategy => strategy(this.state.componentData, theme, this.styles, isMobile));

      const hasFocus = (isFocused ? !noPluginBorder : isPartOfSelection) && isEditorFocused;

      const ContainerClassNames = classNames(
        this.styles.pluginContainer,
        theme.pluginContainer,
        theme.pluginContainerWrapper,
        withHorizontalScroll && this.styles.horizontalScrollbar,
        !isPartOfSelection && noPluginBorder && this.styles.noBorder,
        {
          [this.styles.pluginContainerMobile]: isMobile,
          [theme.pluginContainerMobile]: isMobile,
          [containerClassName]: !!containerClassName,
        },
        classNameStrategies,
        className || '',
        {
          [this.styles.hasFocus]: hasFocus,
          [theme.hasFocus]: hasFocus,
          [this.styles.hideTextSelection]: !isFocused,
        }
      );

      const overlayClassNames = classNames(
        this.styles.overlay,
        theme.overlay,
        isFocused && noPointerEventsOnFocus && this.styles.noPointerEventsOnFocus
      );

      const sizeStyles = withHorizontalScroll
        ? { position: 'unset' }
        : {
            width: currentWidth || initialWidth,
            height: currentHeight || initialHeight,
            maxHeight: this.state.htmlPluginMaxHeight,
          };

      const component = (
        <div
          ref={this.containerRef}
          role="none"
          style={sizeStyles}
          className={ContainerClassNames}
          data-focus={hasFocus}
          onDragStart={this.onDragStart}
          onContextMenu={this.handleContextMenu}
          {...decorationProps}
        >
          <PluginComponent
            {...this.props}
            isMobile={isMobile}
            settings={settings}
            store={pubsub.store}
            commonPubsub={commonPubsub}
            theme={theme}
            componentData={this.state.componentData}
            componentState={this.state.componentState}
            helpers={helpers}
            t={t}
            editorBounds={getEditorBounds()}
            disableRightClick={disableRightClick}
            anchorTarget={anchorTarget}
            relValue={relValue}
            locale={locale}
            shouldRenderOptimizedImages={shouldRenderOptimizedImages}
            iframeSandboxDomain={iframeSandboxDomain}
            setInPluginEditingMode={setInPluginEditingMode}
            getInPluginEditingMode={getInPluginEditingMode}
            setComponentUrl={this.setComponentUrl}
            renderInnerRCE={renderInnerRCE}
            disableKeyboardEvents={disableKeyboardEvents}
          />
          <div
            role="none"
            data-hook={'componentOverlay'}
            onClick={this.handleClick}
            className={overlayClassNames}
            draggable
          />
        </div>
      );

      const componentWithEmptyBlocksButtons = (
        <>
          {hasFocus && <div className={this.styles.addNewLine} onClick={addNewLineAbove} />}
          {component}
          {hasFocus && <div className={this.styles.addNewLine} onClick={addNewLineBelow} />}
        </>
      );

      return withHorizontalScroll ? (
        <div className={styles.horizontalScrollbarWrapper}>
          <div
            data-id={'horizontal-scrollbar-element'}
            className={classNames(
              styles.pluginWithHorizontalScrollbar,
              blockProps.isFocused ? styles.show : styles.hide
            )}
          >
            {componentWithEmptyBlocksButtons}
          </div>
        </div>
      ) : (
        componentWithEmptyBlocksButtons
      );
    };
  };
};

export default createBaseComponent;

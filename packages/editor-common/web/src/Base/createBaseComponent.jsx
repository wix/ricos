/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { merge, compact, isNil } from 'lodash';
import classNames from 'classnames';
import {
  getDisplayName,
  alignmentClassName,
  sizeClassName,
  textWrapClassName,
  normalizeUrl,
  createHocName,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/general.scss';
import rtlIgnoredStyles from 'wix-rich-content-common/dist/statics/styles/general.rtlignore.scss';

const DEFAULTS = {
  alignment: null,
  size: 'content',
  url: undefined,
  textWrap: null,
};

const createBaseComponent = ({
  PluginComponent,
  theme,
  settings,
  pubsub,
  commonPubsub,
  helpers,
  anchorTarget,
  relValue,
  t,
  isMobile,
  pluginDecorationProps = () => ({}),
  componentWillReceiveDecorationProps = () => {},
  getEditorBounds,
  onOverlayClick,
  disableRightClick,
}) => {
  class WrappedComponent extends Component {
    static displayName = createHocName('BaseComponent', PluginComponent);

    constructor(props) {
      super(props);
      this.state = { componentState: {}, ...this.stateFromProps(props) };
      this.styles = { ...styles, ...rtlIgnoredStyles };
    }

    componentWillReceiveProps(nextProps) {
      componentWillReceiveDecorationProps(this.props, nextProps, this.updateComponentConfig);
      this.setState(this.stateFromProps(nextProps));
    }

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
      ].map(({ key, callback }) => pubsub.subscribeOnBlock({ key, callback, blockKey }));
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

    onComponentStateChange = componentState => {
      if (this.isMeAndIdle()) {
        this.setState({ componentState: componentState || {} });
      }
    };

    onHtmlPluginMaxHeightChange = htmlPluginMaxHeight => {
      if (htmlPluginMaxHeight) {
        this.setState({ htmlPluginMaxHeight });
      }
    };

    onComponentLinkChange = linkData => {
      const { url, target, rel } = linkData || {};
      if (this.isMeAndIdle()) {
        const link = url
          ? {
              url,
              target,
              rel,
            }
          : null;

        this.updateComponentConfig({ link });
      }
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
      if (oldFocusedBlock !== focusedBlock) {
        const batchUpdates = {};
        const blockNode = findDOMNode(this);
        const componentData = this.state.componentData;
        const boundingRect = this.getBoundingClientRectAsObject(blockNode);
        batchUpdates.boundingRect = boundingRect;
        batchUpdates.componentData = componentData;
        batchUpdates.componentState = {};
        batchUpdates.deleteBlock = this.deleteBlock;
        batchUpdates.focusedBlock = focusedBlock;
        pubsub.set(batchUpdates);
      } else {
        //maybe just the position has changed
        const blockNode = findDOMNode(this);
        const boundingRect = this.getBoundingClientRectAsObject(blockNode);
        pubsub.set('boundingRect', boundingRect);
      }
    }

    updateUnselectedComponent() {
      pubsub.set({ focusedBlock: null, componentData: {}, componentState: {} });
    }

    handleContextMenu = e => disableRightClick && e.preventDefault();

    render = () => {
      const { blockProps, className, selection, onDragStart } = this.props;
      const { componentData } = this.state;
      const { containerClassName, ...decorationProps } = pluginDecorationProps(
        this.props,
        componentData
      );
      const { link, width: currentWidth, height: currentHeight } = componentData.config || {};
      const { width: initialWidth, height: initialHeight } = settings || {};
      const isEditorFocused = selection.getHasFocus();
      const { isFocused } = blockProps;
      const isActive = isFocused && isEditorFocused;

      const classNameStrategies = compact([
        PluginComponent.alignmentClassName || alignmentClassName,
        PluginComponent.sizeClassName || sizeClassName,
        PluginComponent.textWrapClassName || textWrapClassName,
        PluginComponent.customClassName,
      ]).map(strategy => strategy(this.state.componentData, theme, this.styles, isMobile));

      const ContainerClassNames = classNames(
        this.styles.pluginContainer,
        theme.pluginContainer,
        {
          [this.styles.pluginContainerMobile]: isMobile,
          [theme.pluginContainerMobile]: isMobile,
          [containerClassName]: !!containerClassName,
        },
        classNameStrategies,
        className || '',
        {
          [this.styles.hasFocus]: isActive,
          [theme.hasFocus]: isActive,
        }
      );

      const overlayClassNames = classNames(this.styles.overlay, theme.overlay);

      const sizeStyles = {
        width: currentWidth || initialWidth,
        height: currentHeight || initialHeight,
        maxHeight: this.state.htmlPluginMaxHeight,
      };

      const component = (
        <PluginComponent
          {...this.props}
          isMobile={isMobile}
          settings={settings}
          store={pubsub.store}
          theme={theme}
          componentData={this.state.componentData}
          componentState={this.state.componentState}
          helpers={helpers}
          t={t}
          editorBounds={getEditorBounds()}
        />
      );

      let anchorProps = {};
      if (!isNil(link)) {
        anchorProps = {
          href: normalizeUrl(link.url),
          target: link.target ? link.target : anchorTarget || '_self',
          rel: link.rel ? link.rel : relValue || 'noopener',
        };
      }
      const anchorClass = classNames(this.styles.absFull, this.styles.anchor, {
        [this.styles.isImage]:
          getDisplayName(PluginComponent)
            .toLowerCase()
            .indexOf('image') !== -1,
      });

      /* eslint-disable jsx-a11y/anchor-has-content */
      return (
        <div
          role="none"
          style={sizeStyles}
          className={ContainerClassNames}
          data-focus={isActive}
          onDragStart={onDragStart}
          onContextMenu={this.handleContextMenu}
          {...decorationProps}
        >
          {!isNil(link) ? (
            <div>
              {component}
              <a className={anchorClass} {...anchorProps} />
            </div>
          ) : (
            component
          )}
          <div
            role="none"
            data-hook={'componentOverlay'}
            onClick={this.handleClick}
            className={overlayClassNames}
            draggable
          />
        </div>
      );
      /* eslint-enable jsx-a11y/anchor-has-content */
    };
  }

  WrappedComponent.propTypes = {
    block: PropTypes.object.isRequired,
    blockProps: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onDragStart: PropTypes.func,
  };

  return WrappedComponent;
};

export default createBaseComponent;

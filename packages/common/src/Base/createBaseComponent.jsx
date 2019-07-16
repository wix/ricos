/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import isNil from 'lodash/isNil';
import classNames from 'classnames';
import createHocName from '../Utils/createHocName';
import getDisplayName from '../Utils/getDisplayName';
import { alignmentClassName, sizeClassName, textWrapClassName } from '../Utils/classNameStrategies';
import { normalizeUrl } from '../Utils/urlValidators';
import Styles from '../../statics/styles/global.scss';

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
  helpers,
  anchorTarget,
  relValue,
  t,
  isMobile,
}) => {
  class WrappedComponent extends Component {
    static displayName = createHocName('BaseComponent', PluginComponent);

    constructor(props) {
      super(props);
      this.state = { componentState: {}, ...this.stateFromProps(props) };
    }

    componentWillReceiveProps(nextProps) {
      this.setState(this.stateFromProps(nextProps));
    }

    stateFromProps(props) {
      const { getData, readOnly } = props.blockProps;
      const initialState = pubsub.get('initialState_' + props.block.getKey());
      if (initialState) {
        //reset the initial state
        pubsub.set('initialState_' + props.block.getKey(), undefined);
      }
      return {
        componentData: getData() || { config: DEFAULTS },
        readOnly: !!readOnly,
        componentState: initialState || {},
      };
    }

    componentDidMount() {
      this.updateComponent();
      this.subscriptions = [
        ['componentData', this.onComponentDataChange],
        ['componentState', this.onComponentStateChange],
        ['componentAlignment', this.onComponentAlignmentChange],
        ['componentSize', this.onComponentSizeChange],
        ['componentTextWrap', this.onComponentTextWrapChange],
        ['editorBounds', this.onEditorBoundsChange],
      ];
      this.subscriptions.forEach(subscription => pubsub.subscribe(...subscription));
      const blockKey = this.props.block.getKey();
      this.subscriptionsOnBlock = [
        ['htmlPluginMaxHeight', this.onHtmlPluginMaxHeightChange],
        ['componentLink', this.onComponentLinkChange],
      ].map(subscription =>
        pubsub.subscribeOnBlock({ key: subscription[0], callback: subscription[1], blockKey })
      );
    }

    componentDidUpdate() {
      this.duringUpdate = true;
      this.updateComponent();
      this.duringUpdate = false;
    }

    componentWillUnmount() {
      this.subscriptions.forEach(subscription => pubsub.unsubscribe(...subscription));
      this.subscriptionsOnBlock.forEach(unsubscribe => unsubscribe());
      pubsub.set('visibleBlock', null);
    }

    isMe = () => {
      const { block } = this.props;
      const updatedVisibleBlock = pubsub.get('visibleBlock');
      return updatedVisibleBlock === block.getKey();
    };

    onEditorBoundsChange = editorBounds => {
      this.setState({ editorBounds });
    };

    onEditorScrollChange = scroll => {
      console.log({ scroll }); // eslint-disable-line no-console
    };

    onComponentDataChange = componentData => {
      if (this.isMeAndIdle) {
        this.setState({ componentData: componentData || {} }, () => {
          const {
            blockProps: { setData },
          } = this.props;
          setData(componentData);
        });
      }
    };

    onComponentStateChange = componentState => {
      if (this.isMeAndIdle) {
        this.setState({ componentState: componentState || {} });
      }
    };

    onComponentAlignmentChange = alignment => {
      if (alignment && this.isMeAndIdle) {
        this.updateComponentConfig({ alignment });
      }
    };

    onComponentSizeChange = size => {
      if (size && this.isMeAndIdle) {
        this.updateComponentConfig({ size });
      }
    };

    onHtmlPluginMaxHeightChange = htmlPluginMaxHeight => {
      if (htmlPluginMaxHeight) {
        this.setState({ htmlPluginMaxHeight });
      }
    };

    onComponentTextWrapChange = textWrap => {
      if (textWrap && this.isMeAndIdle) {
        this.updateComponentConfig({ textWrap });
      }
    };

    onComponentLinkChange = linkData => {
      const { url, targetBlank, nofollow } = linkData || {};
      if (this.isMeAndIdle) {
        const link = url
          ? {
              url,
              target: targetBlank === true ? '_blank' : anchorTarget || '_self',
              rel: nofollow === true ? 'nofollow' : relValue || 'noopener',
            }
          : null;

        this.updateComponentConfig({ link });
      }
    };

    deleteBlock = () => {
      pubsub.set('visibleBlock', null);
      this.props.blockProps.deleteBlock();
    };

    updateComponent() {
      const { block, blockProps } = this.props;
      if (blockProps.isFocused && blockProps.isCollapsedSelection) {
        this.updateSelectedComponent();
      } else if (pubsub.get('visibleBlock') === block.getKey()) {
        this.updateUnselectedComponent();
      }
    }

    get isMeAndIdle() {
      return this.isMe() && !this.duringUpdate;
    }

    updateComponentConfig = newConfig => {
      pubsub.update('componentData', { config: newConfig });
    };

    getBoundingClientRectAsObject = element => {
      const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect();
      return { top, right, bottom, left, width, height, x, y };
    };

    updateSelectedComponent() {
      const { block } = this.props;

      const oldVisibleBlock = pubsub.get('visibleBlock');
      const visibleBlock = block.getKey();
      if (oldVisibleBlock !== visibleBlock) {
        const batchUpdates = {};
        const blockNode = findDOMNode(this);
        const componentData = this.state.componentData;
        const config = componentData.config || {};
        const boundingRect = this.getBoundingClientRectAsObject(blockNode);
        batchUpdates.boundingRect = boundingRect;
        batchUpdates.componentData = componentData;
        batchUpdates.componentState = {};
        batchUpdates.componentSize = config.size;
        batchUpdates.componentAlignment = config.alignment;
        batchUpdates.componentTextWrap = config.textWrap;
        batchUpdates.deleteBlock = this.deleteBlock;
        batchUpdates.visibleBlock = visibleBlock;
        pubsub.set(batchUpdates);
      } else {
        //maybe just the position has changed
        const blockNode = findDOMNode(this);
        const boundingRect = this.getBoundingClientRectAsObject(blockNode);
        pubsub.set('boundingRect', boundingRect);
      }
    }

    updateUnselectedComponent() {
      const batchUpdates = {};
      batchUpdates.visibleBlock = null;
      batchUpdates.componentData = {};
      batchUpdates.componentState = {};
      batchUpdates.componentSize = null;
      batchUpdates.componentAlignment = null;
      batchUpdates.componentTextWrap = null;
      pubsub.set(batchUpdates);
    }

    render = () => {
      const { blockProps, className, onClick, selection } = this.props;
      const { componentData, readOnly } = this.state;
      const { link, width: currentWidth, height: currentHeight } = componentData.config || {};
      const { width: initialWidth, height: initialHeight } = settings || {};
      const isEditorFocused = selection.getHasFocus();
      const { isFocused } = blockProps;
      const isActive = isFocused && isEditorFocused && !readOnly;

      const classNameStrategies = [
        PluginComponent.WrappedComponent.alignmentClassName || alignmentClassName,
        PluginComponent.WrappedComponent.sizeClassName || sizeClassName,
        PluginComponent.WrappedComponent.textWrapClassName || textWrapClassName,
      ].map(strategy => strategy(this.state.componentData, theme, Styles, isMobile));

      const ContainerClassNames = classNames(
        {
          [Styles.pluginContainer]: !readOnly,
          [Styles.pluginContainerReadOnly]: readOnly,
          [Styles.pluginContainerMobile]: isMobile,
          [theme.pluginContainer]: !readOnly,
          [theme.pluginContainerReadOnly]: readOnly,
          [theme.pluginContainerMobile]: isMobile,
        },
        classNameStrategies,
        className || '',
        {
          [Styles.hasFocus]: isActive,
          [theme.hasFocus]: isActive,
        }
      );

      const overlayClassNames = classNames(Styles.overlay, theme.overlay, {
        [Styles.hidden]: readOnly,
        [theme.hidden]: readOnly,
      });

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
          editorBounds={this.state.editorBounds}
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
      const anchorClass = classNames(Styles.absFull, Styles.anchor, {
        [Styles.isImage]:
          getDisplayName(PluginComponent)
            .toLowerCase()
            .indexOf('image') !== -1,
      });
      /* eslint-disable jsx-a11y/anchor-has-content */
      return (
        <div style={sizeStyles} className={ContainerClassNames}>
          {!isNil(link) ? (
            <div>
              {component}
              <a className={anchorClass} {...anchorProps} />
            </div>
          ) : (
            component
          )}
          {!this.state.readOnly && (
            <div
              role="none"
              data-hook={'componentOverlay'}
              onClick={onClick}
              className={overlayClassNames}
            />
          )}
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
  };

  return WrappedComponent;
};

export default createBaseComponent;

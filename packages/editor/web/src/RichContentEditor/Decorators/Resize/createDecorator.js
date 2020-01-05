/*
 * Based on draft-js-resizeable-plugin with following changes:
 *  - additional props width, containerClassName are rendered on WrappedComponent
 *  - styles for handles added
 *  - context is available (for theme access)
 *  - onMove: isLeft, isRight calculation considers current size and alignment
 *  - config accepts minHeight, minWidth instead of hard-coded values
 *
 *  TODO: mouse handlers can be optimized (vertical resizing is disabled)
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, Context } from 'wix-rich-content-common';
import deafultStyles from '../../../../statics/styles/resizeable.rtlignore.scss';

const getDisplayName = WrappedComponent => {
  const component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

const round = (x, steps) => Math.ceil(x / steps) * steps;

export default ({ config, store }) => WrappedComponent =>
  class BlockResizeableDecorator extends Component {
    static contextType = Context.type;
    static displayName = `Resizable(${getDisplayName(WrappedComponent)})`;
    static WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent;

    static propTypes = {
      blockProps: PropTypes.object,
      vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      horizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      style: PropTypes.object,
      resizeSteps: PropTypes.number,
      minHeight: PropTypes.number,
      minWidth: PropTypes.number,
    };
    static defaultProps = {
      horizontal: 'relative',
      vertical: false,
      resizeSteps: 1,
      minHeight: 40,
      minWidth: 40,
      ...config,
    };
    state = {
      hoverPosition: {},
      clicked: false,
    };

    updateEntityData = (width, height) => {
      const { setData, getData } = this.props.blockProps;
      const data = getData();
      setData({ ...data, config: { ...data.config, width, height } });
    };

    // used to save the hoverPosition so it can be leveraged to determine if a
    // drag should happen on mousedown
    mouseLeave = () => {
      if (!this.state.clicked) {
        this.setState({ hoverPosition: {} });
      }
    };

    // used to save the hoverPosition so it can be leveraged to determine if a
    // drag should happen on mousedown
    mouseMove = evt => {
      const { vertical, horizontal, blockProps } = this.props;
      const componentData = blockProps.getData();
      const { size, alignment } = componentData.config;
      const hoverPosition = this.state.hoverPosition;
      const tolerance = 6;
      // TODO figure out if and how to achieve this without fetching the DOM node
      // eslint-disable-next-line react/no-find-dom-node
      const pane = ReactDOM.findDOMNode(this);
      const b = pane.getBoundingClientRect();
      const x = evt.clientX - b.left;
      const y = evt.clientY - b.top;

      const isTop = vertical && vertical !== 'auto' ? y < tolerance : false;
      let isLeft = horizontal ? x < tolerance : false;
      let isRight = horizontal ? x >= b.width - tolerance : false;
      const isBottom =
        vertical && vertical !== 'auto' ? y >= b.height - tolerance && y < b.height : false;

      isLeft = isLeft && alignment !== 'left' && size !== 'fullWidth' && !this.context.isMobile;
      isRight = isRight && alignment !== 'right' && size !== 'fullWidth' && !this.context.isMobile;

      const canResize = isTop || isLeft || isRight || isBottom;

      const newHoverPosition = {
        isTop,
        isLeft,
        isRight,
        isBottom,
        canResize,
      };
      const hasNewHoverPositions = Object.keys(newHoverPosition).filter(
        key => hoverPosition[key] !== newHoverPosition[key]
      );

      if (hasNewHoverPositions.length) {
        this.setState({ hoverPosition: newHoverPosition });
      }
    };

    // Handle mousedown for resizing
    mouseDown = event => {
      // No mouse-hover-position data? Nothing to resize!
      if (!this.state.hoverPosition.canResize) {
        return;
      }

      event.preventDefault();
      const { resizeSteps, vertical, horizontal } = this.props;
      const { hoverPosition } = this.state;
      const { isTop, isLeft, isRight, isBottom } = hoverPosition;

      // TODO figure out how to achieve this without fetching the DOM node
      // eslint-disable-next-line react/no-find-dom-node
      const pane = ReactDOM.findDOMNode(this);
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = parseInt(document.defaultView.getComputedStyle(pane).width, 10);
      const startHeight = parseInt(document.defaultView.getComputedStyle(pane).height, 10);

      // Do the actual drag operation
      const doDrag = dragEvent => {
        let width = startWidth + (isLeft ? startX - dragEvent.clientX : dragEvent.clientX - startX);
        let height = startHeight + dragEvent.clientY - startY;

        const editorComp = store.getEditorRef();
        // this keeps backwards-compatibility with react 15
        const editorNode = editorComp.refs.editor ? editorComp.refs.editor : editorComp.editor;

        width = Math.min(editorNode.clientWidth, width);
        height = Math.min(editorNode.clientHeight, height);

        const widthPerc = (100 / editorNode.clientWidth) * width;
        const heightPerc = (100 / editorNode.clientHeight) * height;

        const newState = {};
        if ((isLeft || isRight) && horizontal === 'relative') {
          newState.width = resizeSteps ? round(widthPerc, resizeSteps) : widthPerc;
          newState.width = Math.max(widthPerc, this.props.minWidth);
        } else if ((isLeft || isRight) && horizontal === 'absolute') {
          newState.width = resizeSteps ? round(width, resizeSteps) : width;
          newState.width = Math.max(width, this.props.minWidth);
        }

        if ((isTop || isBottom) && vertical === 'relative') {
          newState.height = resizeSteps ? round(heightPerc, resizeSteps) : heightPerc;
          newState.height = Math.max(heightPerc, this.props.minHeight);
        } else if ((isTop || isBottom) && vertical === 'absolute') {
          newState.height = resizeSteps ? round(height, resizeSteps) : height;
          newState.height = Math.max(height, this.props.minHeight);
        }

        dragEvent.preventDefault();

        this.setState(newState);
      };

      // Finished dragging
      const stopDrag = () => {
        // TODO clean up event listeners
        document.removeEventListener('mousemove', doDrag, false);
        document.removeEventListener('mouseup', stopDrag, false);

        const { width, height } = this.state;
        this.setState({ clicked: false });
        this.updateEntityData(width, height);
      };

      // TODO clean up event listeners
      document.addEventListener('mousemove', doDrag, false);
      document.addEventListener('mouseup', stopDrag, false);

      this.setState({ clicked: true });
    };

    /* eslint-disable complexity */
    render() {
      const {
        blockProps,
        vertical,
        horizontal,
        style,
        // using destructuring to make sure unused props are not passed down to the block
        resizeSteps, // eslint-disable-line no-unused-vars
        ...elementProps
      } = this.props;
      const componentData = blockProps.getData();
      const { size, alignment } = componentData.config;

      const {
        width = componentData.config.width,
        height = componentData.config.height,
        hoverPosition,
      } = this.state;
      const { isTop, isLeft, isRight, isBottom } = hoverPosition;

      const styles = { position: 'relative', ...style };

      this.mergedStyles =
        this.mergedStyles || mergeStyles({ styles: deafultStyles, theme: this.context.theme });

      if (horizontal === 'auto') {
        styles.width = 'auto';
      } else if (horizontal === 'relative') {
        styles.width = `${width || this.props.minWidth}%`;
      } else if (horizontal === 'absolute') {
        styles.width = `${width || this.props.minWidth}px`;
      }

      if (vertical === 'auto') {
        styles.height = 'auto';
      } else if (vertical === 'relative') {
        styles.height = `${height || this.props.minHeight}%`;
      } else if (vertical === 'absolute') {
        styles.height = `${height || this.props.minHeight}px`;
      }

      // Handle cursor
      if ((isRight && isBottom) || (isLeft && isTop)) {
        styles.cursor = 'nwse-resize';
      } else if ((isRight && isTop) || (isBottom && isLeft)) {
        styles.cursor = 'nesw-resize';
      } else if (isRight || isLeft) {
        styles.cursor = 'ew-resize';
      } else if (isBottom || isTop) {
        styles.cursor = 'ns-resize';
      } else {
        styles.cursor = 'default';
      }

      const containerClassName = classNames({
        [this.mergedStyles.resizeHandleR]:
          alignment !== 'right' && size !== 'fullWidth' && !this.context.isMobile,
        [this.mergedStyles.resizeHandleL]:
          alignment !== 'left' && size !== 'fullWidth' && !this.context.isMobile,
      });

      const interactionProps = {
        onMouseDown: this.mouseDown,
        onMouseMove: this.mouseMove,
        onMouseLeave: this.mouseLeave,
        width: this.state.width || this.props.minWidth,
        containerClassName,
      };

      return (
        <WrappedComponent
          {...elementProps}
          {...interactionProps}
          blockProps={blockProps}
          ref={element => {
            this.wrapper = element;
          }}
          style={styles}
        />
      );
    }
    /* eslint-enable complexity */
  };

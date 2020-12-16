import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ToolbarContainer.scss';
import { getVisibleSelectionRect } from 'wix-rich-content-editor-common';

const TOOLBAR_OFFSET = 5;

class ToolbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbarPosition: {},
    };
  }

  getRelativeParent = element => {
    if (!element) {
      return null;
    }
    const position = window.getComputedStyle(element).getPropertyValue('position');
    if (position !== 'static') {
      return element;
    }
    return this.getRelativeParent(element.parentElement);
  };

  getRelativePosition() {
    const relativeParent = this.getRelativeParent(this.toolbarContainerRef.parentElement);
    const halfToolbarWidth = this.toolbarContainerRef.clientWidth / 2;
    const toolbarHeight = this.toolbarContainerRef.clientHeight;
    const toolbarParentRect = (relativeParent || document.body).getBoundingClientRect();
    const selectionRect = getVisibleSelectionRect(window);

    if (!selectionRect) {
      return { top: 0, left: 0 };
    }

    let top;
    if (!this.props.isMobile) {
      top = selectionRect.top - toolbarParentRect.top - toolbarHeight - TOOLBAR_OFFSET;
    } else {
      top = selectionRect.bottom - toolbarParentRect.top + TOOLBAR_OFFSET;
    }

    let left =
      selectionRect.left - toolbarParentRect.left + selectionRect.width / 2 - halfToolbarWidth;
    // make sure we're not out of bounds, adjust position if we are
    if (selectionRect.left - toolbarParentRect.left < halfToolbarWidth) {
      left = 0;
    } else if (left + this.toolbarContainerRef.clientWidth > toolbarParentRect.width) {
      left = toolbarParentRect.width - this.toolbarContainerRef.clientWidth;
    }

    return { top, left };
  }

  componentDidMount() {
    const { positionBySelection } = this.props;
    if (positionBySelection) {
      const { top, left } = this.getRelativePosition();
      this.setState({ toolbarPosition: { top: `${top}px`, left: `${left}px` } });
    } else {
      this.setState({ toolbarPosition: this.getToolbarPosition() });
    }
  }
  componentDidUpdate(prevProps) {
    const { positionBySelection } = this.props;
    if (positionBySelection) {
      const { top, left } = this.getRelativePosition();
      const { toolbarPosition } = this.state;
      if (`${top}px` !== toolbarPosition.top || `${left}px` !== toolbarPosition.left) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ toolbarPosition: { top: `${top}px`, left: `${left}px` } });
      }
    } else if (prevProps.toolbarPosition !== this.props.toolbarPosition) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ toolbarPosition: this.getToolbarPosition() });
    }
  }

  setToolbarContainerRef = ref => (this.toolbarContainerRef = ref);

  getToolbarPosition = () => {
    const { toolbarPosition } = this.props;
    const {
      x,
      y,
      offsetLeftInsideContainer,
      containerWidth = 0,
      extraTopOffset,
      extraLeftOffset = 0,
    } = toolbarPosition || {};
    if (this.toolbarContainerRef) {
      const top = y ? `${y - extraTopOffset}px` : null;
      const toolbarWidth = this.toolbarContainerRef.offsetWidth;
      if (offsetLeftInsideContainer + toolbarWidth < containerWidth) {
        return { top, left: x - extraLeftOffset };
      } else {
        return { top, right: 0 };
      }
    }
  };

  render() {
    const { children } = this.props;
    const { toolbarPosition } = this.state;
    return (
      <div
        ref={this.setToolbarContainerRef}
        className={styles.container}
        style={{
          ...toolbarPosition,
        }}
      >
        {children}
      </div>
    );
  }
}

ToolbarContainer.propTypes = {
  toolbarPosition: PropTypes.object,
  children: PropTypes.any,
  positionBySelection: PropTypes.bool,
  isMobile: PropTypes.bool,
};

export default ToolbarContainer;

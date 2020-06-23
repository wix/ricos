import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { getVisibleSelectionRect } from 'wix-rich-content-editor-common';
const TOOLBAR_OFFSET = 5;

const getRelativeParent = element => {
  if (!element) {
    return null;
  }

  const position = window.getComputedStyle(element).getPropertyValue('position');
  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
};

export default class Floater extends Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    getEditorState: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  setKeepOpen = keepOpen => this.setState({ keepOpen });

  shouldBeVisible = () => {
    const selection = this.props.getEditorState().getSelection();
    return (!selection.isCollapsed() && selection.getHasFocus()) || this.state.keepOpen;
  };

  getRelativePosition() {
    const relativeParent = getRelativeParent(this.toolbar.parentElement);
    const halfToolbarWidth = this.toolbar.clientWidth / 2;
    const toolbarHeight = this.toolbar.clientHeight;
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
    } else if (left + this.toolbar.clientWidth > toolbarParentRect.width) {
      left = toolbarParentRect.width - this.toolbar.clientWidth;
    }

    return { top, left };
  }

  getStyle = isVisible => {
    const style = {
      visibility: isVisible ? 'visible' : 'hidden',
      transform: isVisible ? 'scale(1)' : 'scale(0)',
    };
    if (this.toolbar) {
      const { left, top } = this.getRelativePosition();
      style['--offset-top'] = `${top}px`;
      style['--offset-left'] = `${left}px`;
    }

    return style;
  };

  handleToolbarRef = node => {
    this.toolbar = node;
  };

  render() {
    // if (!this.state.isVisible) {
    //   return null;
    // }

    const isVisible = this.shouldBeVisible();
    const style = this.getStyle(isVisible);

    return (
      <div ref={this.handleToolbarRef} style={style}>
        {React.cloneElement(this.props.children, { setKeepOpen: this.setKeepOpen })}
      </div>
    );
  }
}

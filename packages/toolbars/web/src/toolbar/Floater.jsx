import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { getVisibleSelectionRect } from 'wix-rich-content-editor-common';
import stylesRtlIgnore from '../../statics/styles/inline-toolbar.rtlignore.scss';
import styles from '../../statics/styles/inline-toolbar.scss';

const Styles = { ...stylesRtlIgnore, ...styles };
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

  componentWillMount() {
    this.props.pubsub.subscribe('selection', this.onSelectionChanged);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('selection', this.onSelectionChanged);
  }

  onSelectionChanged = debounce(() => {
    // need to wait a tick for window.getSelection() to be accurate
    // when focusing editor with already present selection
    this.setState({ isVisible: this.shouldBeVisible() });
    if (!this.toolbar) {
      return;
    }
    if (!this.state.keepOpen) {
      const { top, left } = this.getRelativePosition();
      this.setState({ position: { '--offset-top': `${top}px`, '--offset-left': `${left}px` } });
    }
  }, 40);

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

  getStyle = () => ({
    ...this.state.position,
    visibility: this.state.isVisible ? 'visible' : 'hidden',
    transform: this.state.isVisible ? 'scale(1)' : 'scale(0)',
  });

  handleToolbarRef = node => {
    this.toolbar = node;
  };

  render() {
    // if (!this.state.isVisible) {
    //   return null;
    // }
    const { theme, children } = this.props;
    const { toolbarStyles } = theme || {};

    const className = classNames(
      Styles.inlineToolbar,
      toolbarStyles && toolbarStyles.inlineToolbar
    );

    return (
      <div ref={this.handleToolbarRef} className={className} style={this.getStyle()}>
        {React.cloneElement(children, { setKeepOpen: this.setKeepOpen })}
      </div>
    );
  }
}

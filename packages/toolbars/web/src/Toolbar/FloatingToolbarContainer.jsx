import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './ToolbarContainer.scss';
import { getVisibleSelectionRect } from 'wix-rich-content-editor-common';

const TOOLBAR_OFFSET = 5;

class FloatingToolbarContainer extends PureComponent {
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
    const { top, left } = this.getRelativePosition();
    this.setState({ toolbarPosition: { top: `${top}px`, left: `${left}px` } });
  }

  componentDidUpdate() {
    const { top, left } = this.getRelativePosition();
    const { toolbarPosition } = this.state;
    const reactModalElement = document.querySelector('[data-id="rich-content-editor-modal"]');
    const pluginMenuElement = document.querySelector('[data-hook="addPluginMenu"]');
    if (
      !reactModalElement &&
      !pluginMenuElement &&
      (`${top}px` !== toolbarPosition.top || `${left}px` !== toolbarPosition.left)
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ toolbarPosition: { top: `${top}px`, left: `${left}px` } });
    }
  }

  setToolbarContainerRef = ref => (this.toolbarContainerRef = ref);

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

FloatingToolbarContainer.propTypes = {
  children: PropTypes.any,
  isMobile: PropTypes.bool,
};

export default FloatingToolbarContainer;

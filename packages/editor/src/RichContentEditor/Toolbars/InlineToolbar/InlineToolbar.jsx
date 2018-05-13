import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getVisibleSelectionRect } from '@wix/draft-js';
import Styles from '~/Styles/inline-toolbar.scss';

const toolbarOffset = 5;

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

export default class InlineToolbar extends Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    helpers: PropTypes.object,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    t: PropTypes.func,
  };

  state = {
    isVisible: false,
    position: undefined,
    overrideContent: undefined,
    extendContent: undefined,
    showRightArrow: false,
    showLeftArrow: false
  }

  componentWillMount() {
    this.props.pubsub.subscribe('selection', this.onSelectionChanged);
  }

  componentDidMount() {
    this.handleToolbarScroll();
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('selection', this.onSelectionChanged);
    this.buttons && this.buttons.removeEventListener('srcoll', this.handleToolbarScroll);
    window && window.removeEventListener('resize', this.handleToolbarScroll);
    window && window.removeEventListener('orientationchange', this.handleToolbarScroll);
  }

  onOverrideContent = overrideContent => {
    this.setState({ overrideContent }, () => {
      this.handleToolbarScroll();
    });
  }

  onExtendContent = extendContent => this.setState({ extendContent });

  onSelectionChanged = () => {
    // need to wait a tick for window.getSelection() to be accurate
    // when focusing editor with already present selection
    setTimeout(() => {
      if (!this.toolbar || this.state.overrideContent || this.state.extendContent) {
        return;
      }

      const relativeParent = getRelativeParent(this.toolbar.parentElement);
      const halfToolbarWidth = this.toolbar.clientWidth / 2;
      const toolbarHeight = this.toolbar.clientHeight;
      const relativeRect = (relativeParent || document.body).getBoundingClientRect();
      const selectionRect = getVisibleSelectionRect(window);

      if (!selectionRect) {
        return;
      }

      let top;
      if (!this.props.isMobile) {
        top = ((selectionRect.top - relativeRect.top) - toolbarHeight) - toolbarOffset;
      } else {
        top = (selectionRect.bottom - relativeRect.top) + toolbarOffset;
      }

      let left = (selectionRect.left - relativeRect.left) + (selectionRect.width / 2);
      // make sure we're not out of bounds, adjust position if we are
      if (left < halfToolbarWidth) {
        left = halfToolbarWidth;
      } else if ((left + halfToolbarWidth) > relativeRect.width) {
        left = relativeRect.width - halfToolbarWidth;
      }

      this.setState({ position: { top, left } });
    });
  };

  getTabIndexByVisibility = () => this.isVisible() ? 0 : -1;

  isVisible = () => {
    const { pubsub } = this.props;
    const { overrideContent, extendContent } = this.state;
    const selection = pubsub.get('getEditorState')().getSelection();
    // overrideContent could for example contain a text input, hence we always show overrideContent
    // TODO: Test readonly mode and possibly set isVisible to false if the editor is readonly
    return (!selection.isCollapsed() && selection.getHasFocus()) || overrideContent || extendContent;
  };

  getStyle() {
    const { position } = this.state;
    const style = { ...position };

    if (this.isVisible()) {
      style.visibility = 'visible';
      style.transform = 'translate(-50%) scale(1)';
      style.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
    } else {
      style.transform = 'translate(-50%) scale(0)';
      style.visibility = 'hidden';
    }

    return style;
  }

  handleToolbarRef = node => {
    this.toolbar = node;
  };

  handleButtonsRef = node => {
    this.buttons = node;
    if (this.buttons) {
      this.buttons.addEventListener('scroll', this.handleToolbarScroll);
      window && window.addEventListener('resize', this.handleToolbarScroll);
      window && window.addEventListener('orientationchange', this.handleToolbarScroll);
    }
  };

  scrollToolbar(event, direction) {
    event.preventDefault();
    const { scrollLeft, clientWidth, scrollWidth } = this.buttons;
    switch (direction) {
      case 'right':
        this.buttons.scrollLeft += scrollWidth - clientWidth - scrollLeft;
        break;
      case 'left':
        this.buttons.scrollLeft -= scrollLeft;
        break;
      default:
        break;
    }
  }

  handleToolbarScroll = () => {
    if (this.state.overrideContent) {
      this.setState({
        showLeftArrow: false,
        showRightArrow: false
      });
      return;
    }

    if (this.buttons) {
      const spaceLeft = this.buttons.scrollLeft;
      const eleWidth = this.buttons.clientWidth;
      const fullWidth = this.buttons.scrollWidth;

      const spaceRight = fullWidth - eleWidth - spaceLeft;

      this.setState({
        showLeftArrow: (spaceLeft > 2),
        showRightArrow: (spaceRight > 26) // responsiveSpacer width + 2
      });
    }
  }

  render() {
    const { theme, pubsub, structure, helpers, isMobile, anchorTarget, relValue, t } = this.props;
    const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
    const hasArrow = showLeftArrow || showRightArrow;
    const { toolbarStyles } = theme || {};
    const toolbarClassNames = classNames(Styles.inlineToolbar, toolbarStyles && toolbarStyles.inlineToolbar);
    const buttonClassNames = classNames(Styles.inlineToolbar_buttons, toolbarStyles && toolbarStyles.inlineToolbar_buttons, {
      [Styles.inlineToolbar_overrideContent]: !!OverrideContent,
      [toolbarStyles.inlineToolbar_overrideContent]: !!OverrideContent,
    });
    const extendClassNames = classNames(Styles.inlineToolbar_extend, toolbarStyles && toolbarStyles.inlineToolbar_extend);
    const childrenProps = {
      theme,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent,
      onExtendContent: this.onExtendContent,
      isMobile,
      helpers,
      anchorTarget,
      relValue,
      t,
      tabIndex: this.getTabIndexByVisibility()
    };

    return (
      <div
        role="toolbar"
        aria-orientation="horizontal"
        className={toolbarClassNames}
        style={this.getStyle()}
        ref={this.handleToolbarRef}
        data-hook="inlineToolbar"
        tabIndex={this.getTabIndexByVisibility()}
      >
        <div
          className={buttonClassNames}
          ref={this.handleButtonsRef}
        >
          {
            showLeftArrow &&
            <button
              tabIndex={this.getTabIndexByVisibility()}
              className={classNames(Styles.inlineToolbar_responsiveArrow, Styles.inlineToolbar_responsiveArrowLeft,
                toolbarStyles.inlineToolbar_responsiveArrow, toolbarStyles.inlineToolbar_responsiveArrowLeft)}
              data-hook="inlineToolbarLeftArrow" onMouseDown={e => this.scrollToolbar(e, 'left')}
            >
              <i/>
            </button>
          }
          {OverrideContent ?
            <OverrideContent {...childrenProps} /> :
            structure.map((Button, index) =>
              <Button key={index} {...childrenProps}/>
            )
          }
          {hasArrow && <div className={Styles.inlineToolbar_responsiveSpacer} />}
          {
            showRightArrow &&
            <button
              tabIndex={this.getTabIndexByVisibility()}
              className={classNames(Styles.inlineToolbar_responsiveArrow, Styles.inlineToolbar_responsiveArrowRight,
                toolbarStyles.inlineToolbar_responsiveArrow, toolbarStyles.inlineToolbar_responsiveArrowRight)}
              data-hook="inlineToolbarRightArrow" onMouseDown={e => this.scrollToolbar(e, 'right')}
            >
              <i/>
            </button>
          }
        </div>
        {ExtendContent && (
          <div className={extendClassNames}>
            <ExtendContent {...childrenProps} />
          </div>
        )}
      </div>
    );
  }
}

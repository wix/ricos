import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getVisibleSelectionRect } from '@wix/draft-js';
import Measure from 'react-measure';
import Styles from '../../../../statics/styles/inline-toolbar.scss';
import ClickOutside from 'react-click-outside';

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
    defaultTextAlignment: PropTypes.oneOf(['left', 'right', 'center']),
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    helpers: PropTypes.object,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    t: PropTypes.func,
    visibilityFn: PropTypes.func,
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })
  };

  state = {
    position: undefined,
    overrideContent: undefined,
    extendContent: undefined,
    showRightArrow: false,
    showLeftArrow: false
  }

  componentWillMount() {
    this.props.pubsub.subscribe('selection', this.onSelectionChanged);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('selection', this.onSelectionChanged);
  }

  onOverrideContent = overrideContent => {
    this.setState({ overrideContent });
  }

  onExtendContent = extendContent => this.setState({ extendContent });

  onClickOutside = () => {
    if (this.state.overrideContent || this.state.extendContent) {
      this.setState({ overrideContent: null, extendContent: null });
    }
  }

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

      if (this.props.offset) {
        top += this.props.offset.y || 0;
        left += this.props.offset.x || 0;
      }

      this.setState({ position: { top, left } });
    });
  };

  getTabIndexByVisibility = () => this.isVisible() ? 0 : -1;

  isVisible = () => {
    const { pubsub, visibilityFn } = this.props;
    const { overrideContent, extendContent } = this.state;

    let isVisible = false;
    if (visibilityFn) {
      const editorState = pubsub.get('getEditorState')();
      isVisible = visibilityFn(editorState);
    }

    // TODO: Test readonly mode and possibly set isVisible to false if the editor is readonly
    return isVisible || overrideContent || extendContent;
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

  scrollToolbar(event, leftDirection) {
    event.preventDefault();
    const { clientWidth, scrollWidth } = this.scrollContainer;
    this.scrollContainer.scrollLeft = leftDirection ? 0 : Math.min(this.scrollContainer.scrollLeft + clientWidth, scrollWidth);
  }

  setToolbarScrollButton = (scrollLeft, scrollWidth, clientWidth) => {
    if (this.props.isMobile) {
      return;
    }

    const currentScrollButtonWidth = this.state.showLeftArrow || this.state.showRightArrow ? 20 : 0;
    const isScroll = scrollWidth - clientWidth - currentScrollButtonWidth > 8;

    this.setState({
      showLeftArrow: isScroll && scrollLeft === scrollWidth - clientWidth,
      showRightArrow: isScroll && scrollLeft < scrollWidth - clientWidth
    });
  };

  render() {
    const { theme, pubsub, structure, defaultTextAlignment, helpers, isMobile, anchorTarget, relValue, t } = this.props;
    const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
    const hasArrow = showLeftArrow || showRightArrow;
    const { toolbarStyles } = theme || {};
    const toolbarClassNames = classNames(Styles.inlineToolbar, toolbarStyles && toolbarStyles.inlineToolbar);
    const buttonClassNames = classNames(Styles.inlineToolbar_buttons, toolbarStyles && toolbarStyles.inlineToolbar_buttons, {
      [Styles.inlineToolbar_overrideContent]: !!OverrideContent,
      [toolbarStyles.inlineToolbar_overrideContent]: !!OverrideContent,
    });
    const extendClassNames = classNames(Styles.inlineToolbar_extend, toolbarStyles && toolbarStyles.inlineToolbar_extend);

    const scrollableClassNames = classNames(
      Styles.inlineToolbar_scrollableContainer,
      toolbarStyles && toolbarStyles.inlineToolbar_scrollableContainer,
      {
        [Styles.mobile]: isMobile,
      }
    );

    const arrowClassNames = classNames(Styles.inlineToolbar_responsiveArrow, toolbarStyles.inlineToolbar_responsiveArrow);
    const leftArrowIconClassNames = classNames(Styles.inlineToolbar_responsiveArrowLeft_icon, toolbarStyles.responsiveArrowLeft_icon);
    const rightArrowIconClassNames = classNames(Styles.inlineToolbar_responsiveArrowRight_icon, toolbarStyles.responsiveArrowRight_icon);

    const toolbarStyle = this.getStyle();

    const tabIndex = this.isVisible() ? 0 : -1;

    const childrenProps = {
      theme,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent,
      onExtendContent: this.onExtendContent,
      defaultTextAlignment,
      isVisible: toolbarStyle.visibility === 'visible',
      isMobile,
      helpers,
      anchorTarget,
      relValue,
      t,
      tabIndex
    };

    return (
      <div
        role="toolbar"
        aria-orientation="horizontal"
        className={toolbarClassNames}
        style={toolbarStyle}
        ref={this.handleToolbarRef}
        data-hook="inlineToolbar"
        tabIndex={tabIndex}
      >
        <ClickOutside onClickOutside={this.onClickOutside}>
          <div
            className={buttonClassNames}
          >
            <Measure
              client
              scroll
              innerRef={ref => this.scrollContainer = ref}
              onResize={({ scroll, client }) => this.setToolbarScrollButton(scroll.left, scroll.width, client.width)}
            >
              {({ measure, measureRef }) => (
                <div className={scrollableClassNames} ref={measureRef} onScroll={() => measure()}>
                  {
                    OverrideContent ?
                      <OverrideContent {...childrenProps} /> :
                      structure.map((Button, index) => <Button key={index} {...childrenProps} />)
                  }
                </div>
              )}
            </Measure>
            {
              hasArrow &&
              <button
                tabIndex={tabIndex}
                className={arrowClassNames}
                data-hook="inlineToolbarRightArrow" onMouseDown={e => this.scrollToolbar(e, showLeftArrow)}
              >
                <i className={showLeftArrow ? leftArrowIconClassNames : rightArrowIconClassNames} />
              </button>
            }
          </div>
          {ExtendContent && (
            <div className={extendClassNames}>
              <ExtendContent {...childrenProps} />
            </div>
          )}
        </ClickOutside>
      </div>
    );
  }
}

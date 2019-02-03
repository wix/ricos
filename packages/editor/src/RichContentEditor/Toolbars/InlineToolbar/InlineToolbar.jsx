import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getVisibleSelectionRect } from '@wix/draft-js';
import Measure from 'react-measure';
import { DISPLAY_MODE } from 'wix-rich-content-common';
import Styles from '../../../../statics/styles/inline-toolbar.scss';
import ClickOutside from 'react-click-outside';

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

const displayOptionStyles = {
  [DISPLAY_MODE.NORMAL]: {},
  [DISPLAY_MODE.FLOATING]: { position: 'fixed' },
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
    displayOptions: PropTypes.shape({
      displayMode: PropTypes.string,
    }),
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    toolbarDecorationFn: PropTypes.func,
  };

  static defaultProps = {
    displayOptions: {
      displayMode: DISPLAY_MODE.NORMAL,
    },
    toolbarDecorationFn: () => null,
  };

  constructor(props) {
    super(props);
    const { offset, displayOptions } = props;
    let position;

    if (displayOptions.displayMode === DISPLAY_MODE.FLOATING) {
      position = { top: offset.y, left: offset.x };
    }
    this.state = {
      position,
      overrideContent: undefined,
      extendContent: undefined,
      showRightArrow: false,
      showLeftArrow: false,
    };

    this.ToolbarDecoration = props.toolbarDecorationFn();
  }

  componentWillMount() {
    this.props.pubsub.subscribe('selection', this.onSelectionChanged);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('selection', this.onSelectionChanged);
  }

  onOverrideContent = overrideContent => {
    this.setState({ overrideContent });
  };

  onExtendContent = extendContent => this.setState({ extendContent });

  onClickOutside = () => {
    if (this.state.overrideContent || this.state.extendContent) {
      this.setState({ overrideContent: null, extendContent: null });
    }
  };

  getRelativePosition() {
    const relativeParent = getRelativeParent(this.toolbar.parentElement);
    const halfToolbarWidth = this.toolbar.clientWidth / 2;
    const toolbarHeight = this.toolbar.clientHeight;
    const relativeRect = (relativeParent || document.body).getBoundingClientRect();
    const selectionRect = getVisibleSelectionRect(window);

    if (!selectionRect) {
      return { top: 0, left: 0 };
    }

    let top;
    if (!this.props.isMobile) {
      top = selectionRect.top - relativeRect.top - toolbarHeight - TOOLBAR_OFFSET;
    } else {
      top = selectionRect.bottom - relativeRect.top + TOOLBAR_OFFSET;
    }

    let left = selectionRect.left - relativeRect.left + selectionRect.width / 2;
    // make sure we're not out of bounds, adjust position if we are
    if (left < halfToolbarWidth) {
      left = halfToolbarWidth;
    } else if (left + halfToolbarWidth > relativeRect.width) {
      left = relativeRect.width - halfToolbarWidth;
    }

    if (this.props.offset) {
      top += this.props.offset.y || 0;
      left += this.props.offset.x || 0;
    }

    return { top, left };
  }

  onSelectionChanged = () => {
    // need to wait a tick for window.getSelection() to be accurate
    // when focusing editor with already present selection
    setTimeout(() => {
      if (!this.toolbar || this.state.overrideContent || this.state.extendContent) {
        return;
      }

      const { displayOptions } = this.props;

      if (displayOptions.displayMode === DISPLAY_MODE.NORMAL) {
        const { top, left } = this.getRelativePosition();
        this.setState({ position: { top, left } });
      }
    });
  };

  getTabIndexByVisibility = () => (this.isVisible() ? 0 : -1);

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
    const { displayOptions } = this.props;
    const { position } = this.state;
    const style = { ...position };
    const defaultDispayStyles = {
      visibility: this.isVisible() ? 'visible' : 'hidden',
      transform: this.isVisible() ? 'translate(-50%) scale(1)' : 'translate(-50%) scale(1)',
      transition: this.isVisible() ? 'transform 0.15s cubic-bezier(.3,1.2,.2,1)' : '',
    };

    Object.assign(style, defaultDispayStyles, displayOptionStyles[displayOptions.displayMode]);

    return style;
  }

  handleToolbarRef = node => {
    this.toolbar = node;
  };

  scrollToolbar(event, leftDirection) {
    event.preventDefault();
    const { clientWidth, scrollWidth } = this.scrollContainer;
    this.scrollContainer.scrollLeft = leftDirection
      ? 0
      : Math.min(this.scrollContainer.scrollLeft + clientWidth, scrollWidth);
  }

  setToolbarScrollButton = (scrollLeft, scrollWidth, clientWidth) => {
    if (this.props.isMobile) {
      return;
    }

    const currentScrollButtonWidth = this.state.showLeftArrow || this.state.showRightArrow ? 20 : 0;
    const isScroll = scrollWidth - clientWidth - currentScrollButtonWidth > 8;

    this.setState({
      showLeftArrow: isScroll && scrollLeft === scrollWidth - clientWidth,
      showRightArrow: isScroll && scrollLeft < scrollWidth - clientWidth,
    });
  };

  renderToolbarContent() {
    const {
      theme,
      pubsub,
      structure,
      defaultTextAlignment,
      helpers,
      isMobile,
      anchorTarget,
      relValue,
      t,
    } = this.props;
    const {
      showLeftArrow,
      showRightArrow,
      overrideContent: OverrideContent,
      extendContent: ExtendContent,
    } = this.state;

    const tabIndex = this.isVisible() ? 0 : -1;
    const toolbarStyle = this.getStyle();
    const hasArrow = showLeftArrow || showRightArrow;
    const { toolbarStyles } = theme || {};

    const buttonClassNames = classNames(
      Styles.inlineToolbar_buttons,
      toolbarStyles && toolbarStyles.inlineToolbar_buttons,
      {
        [Styles.inlineToolbar_overrideContent]: !!OverrideContent,
        [toolbarStyles.inlineToolbar_overrideContent]: !!OverrideContent,
      }
    );
    const extendClassNames = classNames(
      Styles.inlineToolbar_extend,
      toolbarStyles && toolbarStyles.inlineToolbar_extend
    );

    const scrollableClassNames = classNames(
      Styles.inlineToolbar_scrollableContainer,
      toolbarStyles && toolbarStyles.inlineToolbar_scrollableContainer,
      {
        [Styles.mobile]: isMobile,
      }
    );

    const arrowClassNames = classNames(
      Styles.inlineToolbar_responsiveArrow,
      toolbarStyles.inlineToolbar_responsiveArrow
    );
    const leftArrowIconClassNames = classNames(
      Styles.inlineToolbar_responsiveArrowLeft_icon,
      toolbarStyles.responsiveArrowLeft_icon
    );
    const rightArrowIconClassNames = classNames(
      Styles.inlineToolbar_responsiveArrowRight_icon,
      toolbarStyles.responsiveArrowRight_icon
    );

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
      tabIndex,
    };

    return (
      <ClickOutside onClickOutside={this.onClickOutside}>
        <div className={buttonClassNames}>
          <Measure
            client
            scroll
            innerRef={ref => (this.scrollContainer = ref)}
            onResize={({ scroll, client }) =>
              this.setToolbarScrollButton(scroll.left, scroll.width, client.width)
            }
          >
            {({ measure, measureRef }) => (
              <div className={scrollableClassNames} ref={measureRef} onScroll={() => measure()}>
                {OverrideContent ? (
                  <OverrideContent {...childrenProps} />
                ) : (
                  structure.map((Button, index) => <Button key={index} {...childrenProps} />)
                )}
              </div>
            )}
          </Measure>
          {hasArrow && (
            <button
              tabIndex={tabIndex}
              className={arrowClassNames}
              data-hook="inlineToolbarRightArrow"
              onMouseDown={e => this.scrollToolbar(e, showLeftArrow)}
            >
              <i className={showLeftArrow ? leftArrowIconClassNames : rightArrowIconClassNames} />
            </button>
          )}
        </div>
        {ExtendContent && (
          <div className={extendClassNames}>
            <ExtendContent {...childrenProps} />
          </div>
        )}
      </ClickOutside>
    );
  }

  render() {
    const { theme } = this.props;
    const { toolbarStyles } = theme || {};

    const props = {
      className: classNames(Styles.inlineToolbar, toolbarStyles && toolbarStyles.inlineToolbar),
      style: this.getStyle(),
      tabIndex: this.isVisible() ? 0 : -1,
      role: 'toolbar',
      'aria-orientation': 'horizontal',
      'data-hook': 'inlineToolbar',
    };

    if (this.ToolbarDecoration) {
      const { ToolbarDecoration } = this;
      return (
        <ToolbarDecoration refCallback={this.handleToolbarRef} {...props}>
          {this.renderToolbarContent()}
        </ToolbarDecoration>
      );
    }

    return (
      <div ref={this.handleToolbarRef} {...props}>
        {this.renderToolbarContent()}
      </div>
    );
  }
}

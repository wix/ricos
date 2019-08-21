import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Measure from 'react-measure';
import { debounce, identity, pickBy } from 'lodash';
import { DISPLAY_MODE, Context, TooltipHost } from 'wix-rich-content-common';
import Styles from '../../../../statics/styles/static-toolbar.scss';

const displayOptionStyles = {
  [DISPLAY_MODE.NORMAL]: {},
  [DISPLAY_MODE.FLOATING]: { position: 'absolute' },
};

export default class StaticToolbar extends React.PureComponent {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    linkModal: PropTypes.bool,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    helpers: PropTypes.object,
    t: PropTypes.func,
    dataHook: PropTypes.string,
    id: PropTypes.string,
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    visibilityFn: PropTypes.func,
    displayOptions: PropTypes.shape({
      displayMode: PropTypes.string,
    }),
    uiSettings: PropTypes.object,
    toolbarDecorationFn: PropTypes.func,
    renderTooltips: PropTypes.bool,
    locale: PropTypes.string,
    setEditorState: PropTypes.func,
    config: PropTypes.object,
  };

  static defaultProps = {
    displayOptions: {
      displayMode: DISPLAY_MODE.NORMAL,
    },
    toolbarDecorationFn: () => null,
    createContext: false,
  };

  constructor(props) {
    super(props);
    this.state = {
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

  // must wait for next tick. So editorState will be updated
  onSelectionChanged = debounce(() => this.forceUpdate(), 100);

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

  onOverrideContent = overrideContent => this.setState({ overrideContent });

  onExtendContent = extendContent => this.setState({ extendContent });

  renderToolbarContent(childrenProps) {
    const { theme, structure, isMobile } = this.props;
    const { toolbarStyles } = theme || {};
    const { showLeftArrow, showRightArrow, overrideContent: OverrideContent } = this.state;
    const hasArrow = showLeftArrow || showRightArrow;
    const arrowClassNames = classNames(
      Styles.staticToolbar_responsiveArrow,
      toolbarStyles.responsiveArrow
    );
    const leftArrowIconClassNames = classNames(
      Styles.staticToolbar_responsiveArrowStart_icon,
      toolbarStyles.responsiveArrowStart_icon
    );
    const rightArrowIconClassNames = classNames(
      Styles.staticToolbar_responsiveArrowEnd_icon,
      toolbarStyles.responsiveArrowEnd_icon
    );

    const buttonClassNames = classNames(Styles.staticToolbar_buttons, toolbarStyles.buttons);
    const scrollableClassNames = classNames(
      Styles.staticToolbar_scrollableContainer,
      toolbarStyles.scrollableContainer,
      {
        [Styles.mobile]: isMobile,
      }
    );

    return (
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
            className={arrowClassNames}
            data-hook="toolbarArrow"
            onMouseDown={e => this.scrollToolbar(e, showLeftArrow)}
          >
            <i className={showLeftArrow ? leftArrowIconClassNames : rightArrowIconClassNames} />
          </button>
        )}
      </div>
    );
  }

  render() {
    const { visibilityFn, pubsub } = this.props;
    if (visibilityFn) {
      const editorState = pubsub.get('getEditorState')();
      if (!visibilityFn(editorState)) {
        return null;
      }
    }

    const {
      theme,
      helpers,
      isMobile,
      linkModal,
      anchorTarget,
      relValue,
      t,
      dataHook,
      id,
      offset,
      uiSettings,
      displayOptions,
      renderTooltips,
      locale,
      setEditorState,
      config,
    } = this.props;
    const { extendContent: ExtendContent } = this.state;

    const { toolbarStyles } = theme || {};
    const extendClassNames = classNames(Styles.staticToolbar_extend, toolbarStyles.extend);

    const childrenProps = {
      theme,
      helpers,
      isMobile,
      linkModal,
      anchorTarget,
      relValue,
      t,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent,
      onExtendContent: this.onExtendContent,
      uiSettings,
    };

    const style = pickBy(offset, identity);
    Object.assign(style, displayOptionStyles[displayOptions.displayMode]);

    const props = {
      style,
      className: classNames(Styles.staticToolbar, toolbarStyles.toolbar),
      role: 'toolbar',
      'aria-orientation': 'horizontal',
      id,
      'data-hook': dataHook,
    };

    const ToolbarDecoration = this.ToolbarDecoration ? this.ToolbarDecoration : 'div';

    if (renderTooltips) {
      const context = {
        isMobile,
        theme,
        t,
        anchorTarget,
        relValue,
        locale,
        helpers,
        config,
        setEditorState,
      };
      return (
        <Context.Provider value={context}>
          <ToolbarDecoration {...props}>
            {this.renderToolbarContent(childrenProps)}
            {ExtendContent && (
              <div className={extendClassNames}>
                <ExtendContent {...childrenProps} />
              </div>
            )}
          </ToolbarDecoration>
          <TooltipHost />
        </Context.Provider>
      );
    }

    return (
      <ToolbarDecoration {...props}>
        {this.renderToolbarContent(childrenProps)}
        {ExtendContent && (
          <div className={extendClassNames}>
            <ExtendContent {...childrenProps} />
          </div>
        )}
      </ToolbarDecoration>
    );
  }
}

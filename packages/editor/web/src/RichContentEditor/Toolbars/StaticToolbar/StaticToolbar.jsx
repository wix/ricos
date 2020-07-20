import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Measure from 'react-measure';
import { debounce } from 'lodash';
import { DISPLAY_MODE, TOOLBARS } from 'wix-rich-content-editor-common';
import Styles from '../../../../statics/styles/static-toolbar.scss';
import MoreButton from './MoreButton.js';

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
    footerToolbarConfig: PropTypes.object,
  };

  static defaultProps = {
    displayOptions: {
      displayMode: DISPLAY_MODE.NORMAL,
    },
    toolbarDecorationFn: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      overrideContent: undefined,
      extendContent: undefined,
      showRightArrow: false,
      showLeftArrow: false,
    };
    const { footerToolbarConfig = {}, structure, isMobile } = props;
    this.ToolbarDecoration = props.toolbarDecorationFn();
    if (isMobile || typeof structure[0] === 'function') {
      this.structure = structure.map(component => ({ component }));
    } else if (footerToolbarConfig.pluginsToDisplayInToolbar) {
      this.structure = structure.filter(({ blockType }) =>
        footerToolbarConfig.pluginsToDisplayInToolbar.includes(blockType)
      );
      this.pluginMenuPlugins = structure.filter(
        ({ name }) => !footerToolbarConfig.pluginsToDisplayInToolbar.includes(name)
      );
    } else if (footerToolbarConfig.morePluginsMenu) {
      this.structure = structure.slice(0, 8);
      this.pluginMenuPlugins = structure.slice(8);
    } else {
      this.structure = structure;
    }
    this.shouldShowSortcut =
      footerToolbarConfig.morePluginsMenu && this.pluginMenuPlugins?.length > 0;
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
    const { theme, isMobile, footerToolbarConfig, pubsub, t } = this.props;
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

    childrenProps.toolbarName = TOOLBARS.FOOTER;
    const addPluginMenuProps = {
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      isMobile,
      theme,
      searchablePlugins: this.props.structure,
    };
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
                this.structure.map(({ component: Component }, index) => (
                  <Component key={index} {...childrenProps} />
                ))
              )}
            </div>
          )}
        </Measure>
        {this.shouldShowSortcut ? (
          <MoreButton
            t={t}
            theme={theme}
            addPluginMenuProps={addPluginMenuProps}
            footerToolbarConfig={footerToolbarConfig}
            structure={this.pluginMenuPlugins}
          />
        ) : (
          hasArrow && (
            <button
              className={arrowClassNames}
              data-hook="toolbarArrow"
              onMouseDown={e => this.scrollToolbar(e, showLeftArrow)}
            >
              <i className={showLeftArrow ? leftArrowIconClassNames : rightArrowIconClassNames} />
            </button>
          )
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

    const { x: left = 0, y: top = 0 } = offset;
    const style = { left, top, ...displayOptionStyles[displayOptions.displayMode] };

    const props = {
      style,
      className: classNames(
        Styles.staticToolbar,
        toolbarStyles.toolbar,
        toolbarStyles.staticToolbar
      ),
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
        <Fragment>
          <ToolbarDecoration {...props} {...(this.ToolbarDecoration ? context : {})}>
            {this.renderToolbarContent({ ...childrenProps, ...context })}
            {ExtendContent && (
              <div className={extendClassNames}>
                <ExtendContent {...childrenProps} {...context} />
              </div>
            )}
          </ToolbarDecoration>
        </Fragment>
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

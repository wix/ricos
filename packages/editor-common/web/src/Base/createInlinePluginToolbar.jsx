/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Measure from 'react-measure';
import { TOOLBARS, TOOLBAR_OFFSETS, DISPLAY_MODE } from '../consts';
import { getConfigByFormFactor } from '../Utils/getConfigByFormFactor';
import { mergeToolbarSettings } from '../Utils/mergeToolbarSettings';
import Separator from '../Components/Separator';
import BaseToolbarButton from './baseToolbarButton';
import { getDefaultToolbarSettings } from './default-toolbar-settings';
import { BUTTONS, BUTTONS_BY_KEY } from './buttons';
import Panel from '../Components/Panel';
import toolbarStyles from '../../statics/styles/plugin-toolbar.scss';
import buttonStyles from '../../statics/styles/plugin-toolbar-button.scss';

const getInitialState = () => ({
  position: { transform: 'scale(0)' },
  showLeftArrow: false,
  showRightArrow: false,
  componentData: {},
  componentState: {},
  overrideContent: undefined,
  tabIndex: -1,
});

export default function createInlinePluginToolbar({
  buttons,
  theme,
  pubsub,
  commonPubsub,
  helpers,
  settings,
  isMobile,
  t,
  name,
  uiSettings,
  getToolbarSettings = () => [],
  getEditorBounds,
  languageDir,
}) {
  class BaseToolbar extends Component {
    constructor(props) {
      super(props);
      const { all, hidden } = buttons;
      const visibleButtons = all.filter(({ keyName }) => !hidden.includes(keyName));

      const defaultSettings = getDefaultToolbarSettings({ pluginButtons: visibleButtons });
      const customSettings = getToolbarSettings({ pluginButtons: visibleButtons }).filter(
        ({ name }) => name === TOOLBARS.PLUGIN
      );
      const toolbarSettings = mergeToolbarSettings({ defaultSettings, customSettings }).filter(
        ({ name }) => name === TOOLBARS.PLUGIN
      )[0];

      const {
        shouldCreate,
        getPositionOffset,
        getButtons,
        getVisibilityFn,
        getDisplayOptions,
        getToolbarDecorationFn,
      } = toolbarSettings;

      this.structure = getConfigByFormFactor({ config: getButtons(), isMobile, defaultValue: [] });
      this.offset = getConfigByFormFactor({
        config: getPositionOffset(),
        isMobile,
        defaultValue: { x: 0, y: 0 },
      });
      this.shouldCreate = getConfigByFormFactor({
        config: shouldCreate(),
        isMobile,
        defaultValue: true,
      });
      this.visibilityFn = getConfigByFormFactor({
        config: getVisibilityFn(),
        isMobile,
        defaultValue: () => true,
      });
      this.displayOptions = getConfigByFormFactor({
        config: getDisplayOptions(),
        isMobile,
        defaultValue: { displayMode: DISPLAY_MODE.NORMAL },
      });
      const toolbarDecorationFn = getConfigByFormFactor({
        config: getToolbarDecorationFn(),
        isMobile,
        defaultValue: () => null,
      });
      this.ToolbarDecoration = toolbarDecorationFn();

      this.state = getInitialState();
    }

    componentDidMount() {
      commonPubsub.subscribe('cursorOnInlinePlugin', this.cursorIsOnInlinePlugin);
    }

    componentWillUnmount() {
      commonPubsub.unsubscribe('cursorOnInlinePlugin', this.cursorIsOnInlinePlugin);
    }

    cursorIsOnInlinePlugin = () => {
      if (
        commonPubsub.get('cursorOnInlinePlugin') &&
        commonPubsub.get('cursorOnInlinePlugin').boundingRect
      ) {
        this.showToolbar();
      } else if (!commonPubsub.get('cursorOnInlinePlugin')) {
        this.hideToolbar();
      }
    };

    shouldComponentUpdate() {
      return !!this.state.isVisible;
    }

    onOverrideContent = overrideContent => {
      this.setState({ overrideContent });
    };

    hideToolbar = () => {
      this.setState({ ...getInitialState(), isVisible: false });
    };

    getRelativePositionStyle() {
      const { x, y } = this.offset;
      const toolbarNode = findDOMNode(this);
      if (!this.offsetHeight) {
        this.offsetHeight = toolbarNode.offsetHeight;
      }
      const toolbarHeight = this.offsetHeight;
      const toolbarWidth = toolbarNode.offsetWidth;
      const offsetParentRect = toolbarNode.offsetParent.getBoundingClientRect();
      const offsetParentTop = offsetParentRect.top;
      const offsetParentLeft = offsetParentRect.left;
      const boundingRect = commonPubsub.get('cursorOnInlinePlugin').boundingRect;
      if (!boundingRect) {
        return { top: 0, left: 0 };
      }
      const top = boundingRect.top - toolbarHeight - TOOLBAR_OFFSETS.top - offsetParentTop + y;
      const tmpLeft =
        boundingRect.left + boundingRect.width / 2 - offsetParentLeft - toolbarWidth / 2 + x;
      const maxLeft = offsetParentRect.right - toolbarWidth - TOOLBAR_OFFSETS.left;
      const left = this.calculateLeftOffset(tmpLeft, maxLeft);
      return {
        '--offset-top': `${top}px`,
        '--offset-left': `${left}px`,
        transform: 'scale(1)',
      };
    }

    calculateLeftOffset = (left, maxLeft) => {
      const isLtr = languageDir === 'ltr';
      const outOfMargins = isLtr ? left < 0 : left > maxLeft;
      if (outOfMargins) {
        return -TOOLBAR_OFFSETS.left * 2;
      }
      if (isLtr) {
        return Math.min(left, maxLeft);
      }
      return left < 0 ? maxLeft : left;
    };

    showToolbar = () => {
      if (
        !this.visibilityFn() ||
        name.toUpperCase() !== commonPubsub.get('cursorOnInlinePlugin').type
      ) {
        return;
      }

      let position;
      if (this.displayOptions.displayMode === DISPLAY_MODE.NORMAL) {
        position = this.getRelativePositionStyle();
      } else if (this.displayOptions.displayMode === DISPLAY_MODE.FLOATING) {
        position = {
          '--offset-top': `${this.offset.y}px`,
          '--offset-left': `${this.offset.x}px`,
          transform: 'scale(1)',
          position: 'absolute',
        };
      }

      const componentData = pubsub.get('componentData') || {};
      const componentState = pubsub.get('componentState') || {};
      this.setState({
        isVisible: true,
        position,
        componentData,
        componentState,
        tabIndex: 0,
      });
    };

    scrollToolbar(event, leftDirection) {
      event.preventDefault();
      const { clientWidth, scrollWidth } = this.scrollContainer;
      this.scrollContainer.scrollLeft = leftDirection
        ? 0
        : Math.min(this.scrollContainer.scrollLeft + clientWidth, scrollWidth);
    }

    /*eslint-disable complexity*/
    renderButton = (button, key, themedStyle, separatorClassNames, tabIndex) => {
      const icons = settings?.toolbar?.icons || {};
      const buttonByKey = BUTTONS_BY_KEY[button.type];
      const Button = (buttonByKey && buttonByKey(icons[button.keyName])) || BaseToolbarButton;
      const buttonProps = {
        ...this.mapComponentDataToButtonProps(button, this.state.componentData),
        ...this.mapStoreDataToButtonProps(button, pubsub.store, this.state.componentData),
        settings: button.settings,
        pubsub,
      };
      const preventDefault = event => event.preventDefault();
      if (button.component) {
        const Button = button.component;
        return (
          <Button
            onMouseDown={preventDefault}
            t={t}
            theme={themedStyle}
            onOverrideContent={this.onOverrideContent}
          />
        );
      }
      switch (button.type) {
        case BUTTONS.SEPARATOR:
          return <Separator className={separatorClassNames} key={key} />;
        default:
          return (
            <Button
              tabIndex={tabIndex}
              theme={themedStyle}
              componentData={this.state.componentData}
              componentState={this.state.componentState}
              pubsub={pubsub}
              helpers={helpers}
              key={key}
              t={t}
              isMobile={isMobile}
              displayPanel={this.displayPanel}
              displayInlinePanel={this.displayInlinePanel}
              hideInlinePanel={this.hidePanels}
              uiSettings={uiSettings}
              getEditorBounds={getEditorBounds}
              {...buttonProps}
            />
          );
      }
    };
    /*eslint-enable complexity*/
    mapComponentDataToButtonProps = (button, componentData) => {
      if (!button.mapComponentDataToButtonProps) {
        return button;
      }
      return {
        ...button,
        ...button.mapComponentDataToButtonProps(componentData),
      };
    };

    mapStoreDataToButtonProps = (button, store, componentData) => {
      if (!button.mapStoreDataToButtonProps) {
        return button;
      }
      return {
        ...button,
        ...button.mapStoreDataToButtonProps({ store, componentData }),
      };
    };

    setToolbarScrollButton = (scrollLeft, scrollWidth, clientWidth) => {
      const currentScrollButtonWidth =
        this.state.showLeftArrow || this.state.showRightArrow ? 20 : 0;
      const isScroll = scrollWidth - clientWidth - currentScrollButtonWidth > 8;

      this.setState({
        showLeftArrow: isScroll && scrollLeft === scrollWidth - clientWidth,
        showRightArrow: isScroll && scrollLeft < scrollWidth - clientWidth,
      });
    };

    hidePanels = () => this.setState({ panel: null, inlinePanel: null });

    displayPanel = panel => {
      this.hidePanels();
      this.setState({ panel });
    };

    displayInlinePanel = inlinePanel => {
      this.hidePanels();
      this.setState({ inlinePanel });
    };

    renderInlinePanel() {
      const { inlinePanel, componentData, componentState } = this.state;
      const { PanelContent, keyName } = inlinePanel || {};

      return inlinePanel ? (
        <div
          className={toolbarStyles.pluginToolbar_inlinePanel}
          data-hook="baseToolbar_InlinePanel"
        >
          <PanelContent
            key={keyName}
            theme={theme}
            store={pubsub}
            helpers={helpers}
            t={t}
            componentData={componentData}
            componentState={componentState}
            close={this.hidePanels}
          />
        </div>
      ) : null;
    }

    renderPanel() {
      const { panel, componentData, componentState } = this.state;

      return panel ? (
        <div className={toolbarStyles.pluginToolbar_panel}>
          <Panel
            key={panel.keyName}
            theme={theme}
            store={pubsub}
            helpers={helpers}
            t={t}
            componentData={componentData}
            componentState={componentState}
            content={panel.PanelContent}
            keyName={panel.keyName}
            close={this.hidePanels}
            getEditorBounds={getEditorBounds}
          />
        </div>
      ) : null;
    }

    renderToolbarContent() {
      const {
        showLeftArrow,
        showRightArrow,
        overrideContent: OverrideContent,
        tabIndex,
      } = this.state;
      const hasArrow = showLeftArrow || showRightArrow;
      const { toolbarStyles: toolbarTheme } = theme || {};
      const { buttonStyles: buttonTheme, separatorStyles: separatorTheme } = theme || {};
      const scrollableContainerClasses = classNames(
        toolbarStyles.pluginToolbar_scrollableContainer,
        toolbarTheme && toolbarTheme.pluginToolbar_scrollableContainer
      );
      const buttonContainerClassnames = classNames(
        toolbarStyles.pluginToolbar_buttons,
        toolbarTheme && toolbarTheme.pluginToolbar_buttons,
        {
          [toolbarStyles.pluginToolbar_overrideContent]: !!OverrideContent,
          [toolbarTheme.pluginToolbar_overrideContent]: !!OverrideContent,
        }
      );
      const themedButtonStyle = {
        buttonWrapper: classNames(
          buttonStyles.pluginToolbarButton_wrapper,
          buttonTheme && buttonTheme.pluginToolbarButton_wrapper
        ),
        button: classNames(
          buttonStyles.pluginToolbarButton,
          buttonTheme && buttonTheme.pluginToolbarButton
        ),
        icon: classNames(
          buttonStyles.pluginToolbarButton_icon,
          buttonTheme && buttonTheme.pluginToolbarButton_icon
        ),
        active: classNames(
          buttonStyles.pluginToolbarButton_active,
          buttonTheme && buttonTheme.pluginToolbarButton_active
        ),
        disabled: classNames(
          buttonStyles.pluginToolbarButton_disabled,
          buttonTheme && buttonTheme.pluginToolbarButton_disabled
        ),
        ...theme,
      };

      const arrowClassNames = classNames(
        toolbarStyles.pluginToolbar_responsiveArrow,
        toolbarTheme && toolbarTheme.pluginToolbar_responsiveArrow
      );
      const leftArrowIconClassNames = classNames(
        toolbarStyles.pluginToolbar_responsiveArrowStart_icon,
        toolbarTheme && toolbarTheme.responsiveArrowStart_icon
      );
      const rightArrowIconClassNames = classNames(
        toolbarStyles.pluginToolbar_responsiveArrowEnd_icon,
        toolbarTheme && toolbarTheme.responsiveArrowEnd_icon
      );
      const separatorClassNames = classNames(
        toolbarStyles.pluginToolbarSeparator,
        separatorTheme && separatorTheme.pluginToolbarSeparator
      );
      const overrideProps = { onOverrideContent: this.onOverrideContent };

      return (
        <div className={buttonContainerClassnames}>
          <Measure
            client
            scroll
            innerRef={ref => (this.scrollContainer = ref)}
            onResize={({ scroll, client }) =>
              this.setToolbarScrollButton(scroll.left, scroll.width, client.width)
            }
          >
            {({ measure, measureRef }) => (
              <div
                className={scrollableContainerClasses}
                ref={measureRef}
                onScroll={() => measure()}
              >
                {OverrideContent ? (
                  <OverrideContent {...overrideProps} />
                ) : (
                  this.structure.map((button, index) =>
                    this.renderButton(
                      button,
                      index,
                      themedButtonStyle,
                      separatorClassNames,
                      tabIndex
                    )
                  )
                )}
              </div>
            )}
          </Measure>
          {hasArrow && (
            <button
              tabIndex={tabIndex}
              className={arrowClassNames}
              data-hook="pluginToolbarRightArrow"
              onMouseDown={e => this.scrollToolbar(e, showLeftArrow)}
            >
              <i className={showLeftArrow ? leftArrowIconClassNames : rightArrowIconClassNames} />
            </button>
          )}
        </div>
      );
    }

    render() {
      if (!this.shouldCreate) {
        return null;
      }

      const { toolbarStyles: toolbarTheme } = theme || {};

      // TODO: visibilityFn params?
      if (this.visibilityFn()) {
        const props = {
          style: this.state.position,
          className: classNames(
            toolbarStyles.pluginToolbar,
            toolbarTheme && toolbarTheme.pluginToolbar
          ),
          'data-hook': name ? `${name}PluginToolbar` : null,
        };

        if (this.ToolbarDecoration) {
          const { ToolbarDecoration } = this;
          return (
            <ToolbarDecoration {...props}>
              {this.renderToolbarContent()}
              {this.renderInlinePanel()}
              {this.renderPanel()}
            </ToolbarDecoration>
          );
        }

        return (
          <div {...props}>
            {this.renderToolbarContent()}
            {this.renderInlinePanel()}
            {this.renderPanel()}
          </div>
        );
      } else {
        return null;
      }
    }
  }

  return BaseToolbar;
}

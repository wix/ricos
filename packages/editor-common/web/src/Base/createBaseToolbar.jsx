/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Measure from 'react-measure';
import { TOOLBARS, TOOLBAR_OFFSETS, DISPLAY_MODE } from '../consts';
import { getConfigByFormFactor } from '../Utils/getConfigByFormFactor';
import { mergeToolbarSettings } from '../Utils/mergeToolbarSettings';
import { getDefaultToolbarSettings } from './default-toolbar-settings';
import toolbarStyles from '../../statics/styles/plugin-toolbar.scss';
import buttonStyles from '../../statics/styles/plugin-toolbar-button.scss';

export const getInitialState = () => ({
  position: { transform: 'scale(0)' },
  showLeftArrow: false,
  showRightArrow: false,
  componentData: {},
  componentState: {},
  overrideContent: undefined,
  tabIndex: -1,
});

export const constructor = ({ buttons, getToolbarSettings, isMobile }) => {
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
    shouldCreate: _shouldCreate,
    getPositionOffset,
    getButtons,
    getVisibilityFn,
    getDisplayOptions,
    getToolbarDecorationFn,
  } = toolbarSettings;

  const structure = getConfigByFormFactor({ config: getButtons(), isMobile, defaultValue: [] });
  const offset = getConfigByFormFactor({
    config: getPositionOffset(),
    isMobile,
    defaultValue: { x: 0, y: 0 },
  });
  const shouldCreate = getConfigByFormFactor({
    config: _shouldCreate(),
    isMobile,
    defaultValue: true,
  });
  const visibilityFn = getConfigByFormFactor({
    config: getVisibilityFn(),
    isMobile,
    defaultValue: () => true,
  });
  const displayOptions = getConfigByFormFactor({
    config: getDisplayOptions(),
    isMobile,
    defaultValue: { displayMode: DISPLAY_MODE.NORMAL },
  });
  const toolbarDecorationFn = getConfigByFormFactor({
    config: getToolbarDecorationFn(),
    isMobile,
    defaultValue: () => null,
  });
  const ToolbarDecoration = toolbarDecorationFn();
  return { structure, offset, shouldCreate, visibilityFn, displayOptions, ToolbarDecoration };
};

export const shouldComponentUpdate = state => {
  return !!state.isVisible;
};

export const onOverrideContent = (setState, overrideContent) => {
  setState({ overrideContent });
};

export const hideToolbar = setState => {
  setState({ ...getInitialState(), isVisible: false });
};

export const getRelativePositionStyle = ({
  boundingRect,
  offset,
  offsetHeight,
  toolbarNode,
  languageDir,
}) => {
  const { x, y } = offset;
  const updatedOffsetHeight = offsetHeight || toolbarNode.offsetHeight;
  const toolbarHeight = updatedOffsetHeight;
  const toolbarWidth = toolbarNode.offsetWidth;
  const offsetParentRect = toolbarNode.offsetParent.getBoundingClientRect();
  const offsetParentTop = offsetParentRect.top;
  const offsetParentLeft = offsetParentRect.left;
  const top = boundingRect.top - toolbarHeight - TOOLBAR_OFFSETS.top - offsetParentTop + y;
  const tmpLeft =
    boundingRect.left + boundingRect.width / 2 - offsetParentLeft - toolbarWidth / 2 + x;
  const maxLeft = offsetParentRect.right - toolbarWidth - TOOLBAR_OFFSETS.left;
  const left = calculateLeftOffset(tmpLeft, maxLeft, languageDir);
  return {
    position: {
      '--offset-top': `${top}px`,
      '--offset-left': `${left}px`,
      transform: 'scale(1)',
    },
    updatedOffsetHeight,
  };
};

const calculateLeftOffset = (left, maxLeft, languageDir) => {
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

export const showToolbar = (
  setState,
  { boundingRect, visibilityFn, displayOptions, getRelativePositionStyle, offset, pubsub }
) => {
  if (!visibilityFn()) {
    return;
  }

  let position;
  if (displayOptions.displayMode === DISPLAY_MODE.NORMAL) {
    position = getRelativePositionStyle(boundingRect);
  } else if (displayOptions.displayMode === DISPLAY_MODE.FLOATING) {
    position = {
      '--offset-top': `${offset.y}px`,
      '--offset-left': `${offset.x}px`,
      transform: 'scale(1)',
      position: 'absolute',
    };
  }

  const componentData = pubsub.get('componentData') || {};
  const componentState = pubsub.get('componentState') || {};
  setState({
    isVisible: true,
    position,
    componentData,
    componentState,
    tabIndex: 0,
  });
};

export default class RenderToolbarContent extends Component {
  static propTypes = {
    overrideContent: PropTypes.any,
    tabIndex: PropTypes.number,
    theme: PropTypes.object,
    renderButton: PropTypes.func,
    structure: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = getInitialState();
  }
  scrollToolbar(event, leftDirection) {
    event.preventDefault();
    const { clientWidth, scrollWidth } = this.scrollContainer;
    this.scrollContainer.scrollLeft = leftDirection
      ? 0
      : Math.min(this.scrollContainer.scrollLeft + clientWidth, scrollWidth);
  }

  setToolbarScrollButton = (scrollLeft, scrollWidth, clientWidth) => {
    const currentScrollButtonWidth = this.state.showLeftArrow || this.state.showRightArrow ? 20 : 0;
    const isScroll = scrollWidth - clientWidth - currentScrollButtonWidth > 8;

    this.setState({
      showLeftArrow: isScroll && scrollLeft === scrollWidth - clientWidth,
      showRightArrow: isScroll && scrollLeft < scrollWidth - clientWidth,
    });
  };

  render() {
    const { showLeftArrow, showRightArrow } = this.state;
    const {
      overrideContent: OverrideContent,
      tabIndex,
      theme,
      renderButton,
      structure,
    } = this.props;
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
    const overrideProps = { onOverrideContent };

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
            <div className={scrollableContainerClasses} ref={measureRef} onScroll={() => measure()}>
              {OverrideContent ? (
                <OverrideContent {...overrideProps} />
              ) : (
                structure.map((button, index) =>
                  renderButton(button, index, themedButtonStyle, separatorClassNames, tabIndex)
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
}

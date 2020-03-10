/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Separator from '../Components/Separator';
import { BUTTONS } from './buttons';
import toolbarStyles from '../../statics/styles/plugin-toolbar.scss';
import RenderToolbarContent, {
  getInitialState,
  constructor,
  shouldComponentUpdate,
  onOverrideContent,
  hideToolbar,
  getRelativePositionStyle,
  showToolbar,
} from './createBaseToolbar';

export default function createInlinePluginToolbar({
  buttons,
  theme,
  pubsub,
  commonPubsub,
  isMobile,
  t,
  name,
  getToolbarSettings = () => [],
  languageDir,
}) {
  class BaseToolbar extends Component {
    constructor(props) {
      super(props);

      const {
        structure,
        offset,
        shouldCreate,
        visibilityFn,
        displayOptions,
        ToolbarDecoration,
      } = constructor({ buttons, getToolbarSettings, isMobile });
      this.structure = structure;
      this.offset = offset;
      this.shouldCreate = shouldCreate;
      this.visibilityFn = visibilityFn;
      this.displayOptions = displayOptions;
      this.ToolbarDecoration = ToolbarDecoration;

      this.state = getInitialState();
    }

    mySetState = stateToSet => {
      this.setState(stateToSet);
    };

    componentDidMount() {
      commonPubsub.subscribe('cursorOnInlinePlugin', this.cursorIsOnInlinePlugin);
    }

    componentWillUnmount() {
      commonPubsub.unsubscribe('cursorOnInlinePlugin', this.cursorIsOnInlinePlugin);
    }

    cursorIsOnInlinePlugin = () => {
      if (
        commonPubsub.get('cursorOnInlinePlugin') &&
        commonPubsub.get('cursorOnInlinePlugin').boundingRect &&
        name.toUpperCase() === commonPubsub.get('cursorOnInlinePlugin').type
      ) {
        const boundingRect = commonPubsub.get('cursorOnInlinePlugin').boundingRect;
        this.showToolbar(boundingRect);
      } else if (!commonPubsub.get('cursorOnInlinePlugin')) {
        this.hideToolbar();
      }
    };

    shouldComponentUpdate() {
      return shouldComponentUpdate(this.state);
    }

    onOverrideContent = overrideContent => {
      onOverrideContent(this.mySetState, overrideContent);
    };

    hideToolbar = () => {
      hideToolbar(this.mySetState);
    };

    getRelativePositionStyle = boundingRect => {
      const { position, updatedOffsetHeight } = getRelativePositionStyle({
        boundingRect,
        offset: this.offset,
        offsetHeight: this.offsetHeight,
        toolbarNode: findDOMNode(this),
        languageDir,
      });
      this.offsetHeight = updatedOffsetHeight;
      return position;
    };

    showToolbar = boundingRect => {
      showToolbar(this.mySetState, {
        boundingRect,
        visibilityFn: this.visibilityFn,
        displayOptions: this.displayOptions,
        getRelativePositionStyle: this.getRelativePositionStyle,
        offset: this.offset,
        pubsub,
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
    renderButton = (button, key, themedStyle, separatorClassNames) => {
      if (button.component) {
        const Button = button.component;
        return <Button t={t} theme={themedStyle} onOverrideContent={this.onOverrideContent} />;
      }
      switch (button.type) {
        case BUTTONS.SEPARATOR:
          return <Separator className={separatorClassNames} key={key} />;
        default:
          return null;
      }
    };

    render() {
      const { overrideContent: OverrideContent, tabIndex } = this.state;
      const renderToolbarContentProps = {
        overrideContent: OverrideContent,
        tabIndex,
        theme,
        renderButton: this.renderButton,
        structure: this.structure,
      };

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
              <RenderToolbarContent {...renderToolbarContentProps} />
            </ToolbarDecoration>
          );
        }

        return (
          <div {...props}>
            <RenderToolbarContent {...renderToolbarContentProps} />
          </div>
        );
      } else {
        return null;
      }
    }
  }

  return BaseToolbar;
}

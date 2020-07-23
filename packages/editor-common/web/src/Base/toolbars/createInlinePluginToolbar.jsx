/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Separator from '../../Components/Separator';
import { BUTTONS } from '../buttons';
import toolbarStyles from '../../../statics/styles/plugin-toolbar.scss';
import ToolbarContent from './ToolbarContent';
import { setVariables, getRelativePositionStyle, getToolbarPosition } from './toolbarUtils';

export default function createInlinePluginToolbar({
  buttons,
  theme,
  commonPubsub,
  isMobile,
  t,
  name,
  getToolbarSettings = () => [],
  languageDir,
}) {
  return class BaseToolbar extends Component {
    static propTypes = {
      hide: PropTypes.bool,
    };

    constructor(props) {
      super(props);

      const {
        structure,
        offset,
        shouldCreate,
        visibilityFn,
        displayOptions,
        ToolbarDecoration,
      } = setVariables({ buttons, getToolbarSettings, isMobile });
      this.structure = structure;
      this.offset = offset;
      this.shouldCreate = shouldCreate;
      this.visibilityFn = visibilityFn;
      this.displayOptions = displayOptions;
      this.ToolbarDecoration = ToolbarDecoration;

      this.state = {
        position: { transform: 'scale(0)' },
        overrideContent: undefined,
        tabIndex: -1,
      };
    }

    componentDidMount() {
      commonPubsub.subscribe('cursorOnInlinePlugin', this.cursorIsOnInlinePlugin);
    }

    componentWillUnmount() {
      commonPubsub.unsubscribe('cursorOnInlinePlugin', this.cursorIsOnInlinePlugin);
    }

    cursorIsOnInlinePlugin = () => {
      const { boundingRect, type } = commonPubsub.get('cursorOnInlinePlugin') || {};
      if (commonPubsub.get('cursorOnInlinePlugin') && boundingRect && name.toUpperCase() === type) {
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
      this.setState({
        position: { transform: 'scale(0)' },
        overrideContent: undefined,
        tabIndex: -1,
        isVisible: false,
      });
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

    showToolbar = () => {
      const boundingRect = commonPubsub.get('cursorOnInlinePlugin').boundingRect;
      if (this.visibilityFn()) {
        const position = getToolbarPosition({
          boundingRect,
          displayOptions: this.displayOptions,
          getRelativePositionStyle: this.getRelativePositionStyle,
          offset: this.offset,
        });
        this.setState({ isVisible: true, tabIndex: 0, position }, this.forceUpdate());
      }
    };

    scrollToolbar(event, leftDirection) {
      event.preventDefault();
      const { clientWidth, scrollWidth } = this.scrollContainer;
      this.scrollContainer.scrollLeft = leftDirection
        ? 0
        : Math.min(this.scrollContainer.scrollLeft + clientWidth, scrollWidth);
    }

    /*eslint-disable complexity*/
    PluginToolbarButton = ({ button, index, themedStyle, separatorClassNames }) => {
      if (button.component) {
        const Button = button.component;
        return (
          <Button
            t={t}
            theme={themedStyle}
            toolbarOffsetTop={this.state.position && this.state.position['--offset-top']}
            toolbarOffsetLeft={this.state.position && this.state.position['--offset-left']}
          />
        );
      }
      switch (button.type) {
        case BUTTONS.SEPARATOR:
          return <Separator className={separatorClassNames} key={index} />;
        default:
          return null;
      }
    };

    render() {
      const { overrideContent, tabIndex } = this.state;
      const { hide } = this.props;
      const toolbarContentProps = {
        overrideContent,
        tabIndex,
        theme,
        PluginToolbarButton: this.PluginToolbarButton,
        structure: this.structure,
      };

      if (!this.shouldCreate) {
        return null;
      }

      const { toolbarStyles: toolbarTheme } = theme || {};

      if (this.visibilityFn()) {
        const props = {
          style: { ...this.state.position, visibility: hide ? 'hidden' : 'visible' },
          className: classNames(
            toolbarStyles.pluginToolbar,
            toolbarTheme && toolbarTheme.pluginToolbar
          ),
          'data-hook': name ? `${name}PluginToolbar` : null,
        };

        const ToolbarWrapper = this.ToolbarDecoration || 'div';

        return (
          <ToolbarWrapper {...props}>
            <ToolbarContent {...toolbarContentProps} />
          </ToolbarWrapper>
        );
      } else {
        return null;
      }
    }
  };
}

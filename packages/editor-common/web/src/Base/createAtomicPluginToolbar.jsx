/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Separator from '../Components/Separator';
import BaseToolbarButton from './baseToolbarButton';
import { BUTTONS, BUTTONS_BY_KEY, BlockLinkButton, deleteButton } from './buttons';
import Panel from '../Components/Panel';
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

export default function createAtomicPluginToolbar({
  buttons,
  theme,
  pubsub,
  helpers,
  settings,
  isMobile,
  anchorTarget,
  relValue,
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
      pubsub.subscribe('focusedBlock', this.onVisibilityChanged);
      pubsub.subscribe('componentState', this.onComponentStateChanged);
      pubsub.subscribe('componentData', this.onComponentDataChanged);
      this.unsubscribeOnBlock = pubsub.subscribeOnBlock({
        key: 'componentLink',
        callback: this.onComponentLinkChange,
      });
    }

    componentWillUnmount() {
      pubsub.unsubscribe('focusedBlock', this.onVisibilityChanged);
      pubsub.unsubscribe('componentState', this.onComponentStateChanged);
      pubsub.unsubscribe('componentData', this.onComponentDataChanged);
      this.unsubscribeOnBlock && this.unsubscribeOnBlock();
    }

    shouldComponentUpdate() {
      return shouldComponentUpdate(this.state);
    }

    onOverrideContent = overrideContent => {
      onOverrideContent(this.mySetState, overrideContent);
    };

    onComponentStateChanged = contentState => {
      this.setState({ contentState });
    };

    onComponentDataChanged = componentData => {
      this.setState({ componentData }, () => this.onVisibilityChanged(pubsub.get('focusedBlock')));
    };

    onComponentLinkChange = linkData => {
      const { url, target, rel } = linkData || {};
      const link = url
        ? {
            url,
            target,
            rel,
          }
        : null;

      pubsub.update('componentData', { config: { link } });
    };

    setLayoutProps = ({ alignment, size, textWrap }) => {
      pubsub.update('componentData', { config: { alignment, size, textWrap } });
    };

    onVisibilityChanged = focusedBlock => {
      if (!this.shouldCreate) {
        return;
      }
      if (focusedBlock) {
        const boundingRect = pubsub.get('boundingRect');
        this.showToolbar(boundingRect);
      } else {
        this.hideToolbar();
      }

      if (focusedBlock !== this.focusedBlock) {
        this.hidePanels();
      }

      this.focusedBlock = focusedBlock;
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
    renderButton = (button, key, themedStyle, separatorClassNames, tabIndex) => {
      const { alignment, size } = this.state.componentData.config || {};
      const icons = settings?.toolbar?.icons || {};
      const buttonByKey = BUTTONS_BY_KEY[button.type];
      const Button = (buttonByKey && buttonByKey(icons[button.keyName])) || BaseToolbarButton;
      const buttonProps = {
        ...this.mapComponentDataToButtonProps(button, this.state.componentData),
        ...this.mapStoreDataToButtonProps(button, pubsub.store, this.state.componentData),
        settings: button.settings,
        pubsub,
      };
      switch (button.type) {
        case BUTTONS.TEXT_ALIGN_LEFT:
        case BUTTONS.TEXT_ALIGN_CENTER:
        case BUTTONS.TEXT_ALIGN_RIGHT:
          return (
            <Button
              alignment={alignment}
              setLayoutProps={this.setLayoutProps}
              theme={themedStyle}
              isMobile={isMobile}
              key={key}
              t={t}
              tabIndex={tabIndex}
              {...buttonProps}
            />
          );
        case BUTTONS.SIZE_SMALL:
        case BUTTONS.SIZE_MEDIUM:
        case BUTTONS.SIZE_LARGE:
          return (
            <Button
              size={size}
              setLayoutProps={this.setLayoutProps}
              theme={themedStyle}
              isMobile={isMobile}
              key={key}
              t={t}
              tabIndex={tabIndex}
              {...buttonProps}
            />
          );
        case BUTTONS.SIZE_ORIGINAL:
        case BUTTONS.SIZE_CONTENT:
        case BUTTONS.SIZE_FULL_WIDTH:
        case BUTTONS.SIZE_CONTENT_CENTER:
        case BUTTONS.SIZE_SMALL_CENTER:
        case BUTTONS.SIZE_SMALL_LEFT:
        case BUTTONS.SIZE_SMALL_RIGHT:
        case BUTTONS.ALIGN_RIGHT:
        case BUTTONS.ALIGN_LEFT:
        case BUTTONS.ALIGN_CENTER:
          return (
            <Button
              size={size}
              alignment={alignment}
              setLayoutProps={this.setLayoutProps}
              theme={themedStyle}
              key={key}
              t={t}
              tabIndex={tabIndex}
              {...buttonProps}
            />
          );
        case BUTTONS.SEPARATOR:
          return <Separator className={separatorClassNames} key={key} />;
        case BUTTONS.HORIZONTAL_SEPARATOR:
          return <Separator className={separatorClassNames} horizontal key={key} />;
        case BUTTONS.LINK:
          return (
            <BlockLinkButton
              tabIndex={tabIndex}
              pubsub={pubsub}
              onOverrideContent={this.onOverrideContent}
              theme={themedStyle}
              key={key}
              helpers={helpers}
              isMobile={isMobile}
              componentState={this.state.componentState}
              closeModal={helpers.closeModal}
              anchorTarget={anchorTarget}
              relValue={relValue}
              t={t}
              uiSettings={uiSettings}
              icons={icons.link}
            />
          );
        case BUTTONS.DELETE: {
          const DeleteButtonComponent = deleteButton(icons.delete);
          return (
            <DeleteButtonComponent
              tabIndex={tabIndex}
              onClick={pubsub.get('deleteBlock')}
              theme={themedStyle}
              key={key}
              t={t}
              icon={icons.delete}
              {...buttonProps}
            />
          );
        }
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
              {this.renderInlinePanel()}
              {this.renderPanel()}
            </ToolbarDecoration>
          );
        }

        return (
          <div {...props}>
            <RenderToolbarContent {...renderToolbarContentProps} />
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

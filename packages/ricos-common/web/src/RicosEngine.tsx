import React, { Component, Children, FunctionComponent } from 'react';

import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import { merge } from 'lodash';

import previewStrategy from './previewStrategy/previewStrategy';
import { ThemeStrategyFunction, ThemeStrategyResult } from './themeTypes';
import {
  RicosEditorProps,
  RicosViewerProps,
  RichContentChild,
  RichContentProps,
  PreviewSettings,
  EditorPluginConfig,
  ViewerPluginConfig,
} from './types';

interface EngineProps extends RicosEditorProps, RicosViewerProps {
  children: RichContentChild;
  plugins?: (EditorPluginConfig & ViewerPluginConfig)[];
  RicosModal: FunctionComponent;
  isViewer: boolean;
  isPreviewExpanded?: boolean;
  onPreviewExpand?: PreviewSettings['onPreviewExpand'];
  createThemeStrategy?: () => ThemeStrategyFunction;
}

export class RicosEngine extends Component<EngineProps> {
  themeStrategy: ThemeStrategyFunction;
  constructor(props: EngineProps) {
    super(props);
    const { createThemeStrategy } = props;
    if (createThemeStrategy) {
      this.themeStrategy = createThemeStrategy();
    }
  }

  static defaultProps = { locale: 'en', isMobile: false };

  runStrategies() {
    const {
      cssOverride,
      theme,
      plugins = [],
      isViewer = false,
      content,
      preview,
      isPreviewExpanded = false,
      onPreviewExpand,
      children,
    } = this.props;

    let themeStrategyResult: ThemeStrategyResult = { html: '', theme: {} };
    if (this.themeStrategy) {
      themeStrategyResult = this.themeStrategy({
        isViewer,
        plugins,
        theme,
      });
    }

    const { theme: strategyTheme, html } = themeStrategyResult;
    const mergedTheme = { ...strategyTheme, ...cssOverride };

    const strategiesProps = merge(
      { theme: mergedTheme },
      pluginsStrategy(isViewer, plugins, children.props, mergedTheme, content)
    );

    const { initialState: previewContent, ...previewStrategyResult } = previewStrategy(
      isViewer,
      isPreviewExpanded,
      onPreviewExpand,
      preview,
      content
    );

    return {
      strategyProps: merge(strategiesProps, previewStrategyResult),
      previewContent,
      html: [html],
    };
  }
  render() {
    const {
      _rcProps,
      children,
      isMobile,
      toolbarSettings,
      modalSettings = {},
      isPreviewExpanded,
      placeholder,
      content,
      RicosModal,
      onError,
      mediaSettings = {},
      linkSettings = {},
      linkPanelSettings = {},
    } = this.props;

    const { strategyProps, previewContent, html } = this.runStrategies();

    const { useStaticTextToolbar, textToolbarContainer, getToolbarSettings } =
      toolbarSettings || {};

    const { openModal, closeModal, ariaHiddenId } = modalSettings;
    const { pauseMedia, disableRightClick } = mediaSettings;
    const { anchorTarget, relValue } = linkSettings;

    // any of ricos props that should be merged into child
    const ricosPropsToMerge: RichContentProps = {
      isMobile,
      textToolbarType:
        !isMobile && (textToolbarContainer || useStaticTextToolbar) ? 'static' : 'inline',
      config: {
        getToolbarSettings,
        uiSettings: { disableRightClick, linkPanel: linkPanelSettings },
      },
      initialState: previewContent || content,
      placeholder,
      onError,
      helpers: {
        openModal,
        closeModal,
      },
      disabled: pauseMedia,
      anchorTarget,
      relValue,
    };

    const mergedRCProps = merge(strategyProps, _rcProps, ricosPropsToMerge, children.props);
    return [
      ...html,
      <RicosModal
        ariaHiddenId={ariaHiddenId}
        isModalSuspended={previewContent && !isPreviewExpanded}
        {...mergedRCProps}
        key={'ricosElement'}
      >
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </RicosModal>,
    ];
  }
}

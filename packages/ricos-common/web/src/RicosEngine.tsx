import React, { Component, Children, FunctionComponent } from 'react';
import createThemeStrategy, { ThemeStrategyFunction } from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import { merge } from 'lodash';
import { isDefined } from 'ts-is-present';
import previewStrategy from './previewStrategy/previewStrategy';
import {
  RicosEditorProps,
  RicosViewerProps,
  RichContentChild,
  RichContentProps,
  ThemeGeneratorFunction,
  PreviewSettings,
} from './types';

type RicosProps = RicosEditorProps & RicosViewerProps;

type EngineProps = RicosProps & {
  children: RichContentChild;
  RicosModal: FunctionComponent;
  isViewer: boolean;
  isPreviewExpanded?: boolean;
  onPreviewExpand?: PreviewSettings['onPreviewExpand'];
};

export class RicosEngine extends Component<EngineProps> {
  themeStrategy: ThemeStrategyFunction;
  constructor(props: EngineProps) {
    super(props);
    this.themeStrategy = createThemeStrategy();
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

    const themeGeneratorFunctions: ThemeGeneratorFunction[] = plugins
      .map(plugin => plugin.theme)
      .filter(isDefined);

    const { theme: themeStrategyResult, rawCss } = this.themeStrategy({
      isViewer,
      themeGeneratorFunctions,
      theme,
      cssOverride,
    });

    const strategyProps = merge(
      { theme: themeStrategyResult },
      pluginsStrategy(isViewer, plugins, children.props, themeStrategyResult, content)
    );

    const { initialState: previewContent, ...previewStrategyResult } = previewStrategy(
      isViewer,
      isPreviewExpanded,
      onPreviewExpand,
      preview,
      content
    );

    return {
      strategyProps: merge(strategyProps, previewStrategyResult),
      previewContent,
      rawCss,
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
      theme: { parentClass } = {},
    } = this.props;

    const { strategyProps, previewContent, rawCss } = this.runStrategies();

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
      <style type="text/css" key={'styleElement'}>
        {rawCss}
      </style>,
      <RicosModal
        ariaHiddenId={ariaHiddenId}
        isModalSuspended={previewContent && !isPreviewExpanded}
        parentClass={parentClass}
        {...mergedRCProps}
        key={'ricosElement'}
      >
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </RicosModal>,
    ];
  }
}

import React, { Component, Children, FunctionComponent, ReactElement } from 'react';

import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import { merge } from 'lodash';

import previewStrategy from './previewStrategy/previewStrategy';
import { PreviewConfig } from 'wix-rich-content-preview';
import { ThemeStrategyResult } from './themeTypes';
import {
  RicosEditorProps,
  RicosViewerProps,
  RichContentChild,
  RichContentProps,
  EditorPluginConfig,
  ViewerPluginConfig,
} from './types';

interface EngineProps extends RicosEditorProps, RicosViewerProps {
  children: RichContentChild;
  plugins?: (EditorPluginConfig & ViewerPluginConfig)[];
  RicosModal: FunctionComponent;
  isViewer: boolean;
  isPreviewExpanded?: boolean;
  onPreviewExpand?: PreviewConfig['onPreviewExpand'];
}

export class RicosEngine extends Component<EngineProps> {
  static defaultProps = { locale: 'en', isMobile: false };

  runStrategies() {
    const {
      cssOverride,
      plugins = [],
      isViewer = false,
      content,
      preview,
      theme: themeStrategy,
      isPreviewExpanded = false,
      onPreviewExpand,
      children,
    } = this.props;

    let themeStrategyResult: ThemeStrategyResult = { theme: {} };
    if (themeStrategy) {
      themeStrategyResult = themeStrategy({
        isViewer,
        plugins,
        cssOverride,
      });
    }

    const htmls: ReactElement[] = [];
    const { theme, html } = themeStrategyResult;
    if (html) {
      htmls.push(html);
    }

    const mergedTheme = { ...theme, ...cssOverride };

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
      htmls,
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

    const { strategyProps, previewContent, htmls } = this.runStrategies();

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
    // console.log(
    //   `${this.props.isViewer ? 'viewer' : 'editor'}'s theme`,
    //   JSON.stringify(mergedRCProps.theme)
    // );
    return [
      ...htmls,
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

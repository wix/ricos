import React, { Component, Children, FunctionComponent, ReactElement } from 'react';

import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import themeStrategy from './themeStrategy/themeStrategy';
import { merge } from 'lodash';

import previewStrategy from './previewStrategy/previewStrategy';
import { PreviewConfig } from 'wix-rich-content-preview';
import { RicosEditorProps, RicosViewerProps, RichContentProps, BasePlugin } from './types';

interface EngineProps extends RicosEditorProps, RicosViewerProps {
  children: ReactElement;
  plugins?: BasePlugin[];
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
      theme: ricosTheme,
      isPreviewExpanded = false,
      onPreviewExpand,
      children,
      _rcProps,
    } = this.props;

    const { theme, html } = themeStrategy({
      plugins,
      cssOverride,
      ricosTheme,
      experiments: _rcProps?.experiments,
    });
    const htmls: ReactElement[] = [];
    if (html) {
      htmls.push(html);
    }

    const strategiesProps = merge(
      { theme },
      pluginsStrategy({
        isViewer,
        plugins,
        childProps: children.props,
        cssOverride: theme,
        content,
        experiments: _rcProps?.experiments,
      })
    );

    const { initialState: previewContent, ...previewStrategyResult } = previewStrategy({
      isViewer,
      isPreviewExpanded,
      onPreviewExpand,
      previewConfig: preview,
      content,
      experiments: _rcProps?.experiments,
    });

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
      addAnchors,
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
      maxTextLength,
      textAlignment,
      onAtomicBlockFocus,
    } = this.props;

    const { strategyProps, previewContent, htmls } = this.runStrategies();

    const { useStaticTextToolbar, textToolbarContainer, getToolbarSettings } =
      toolbarSettings || {};

    const {
      openModal,
      closeModal,
      ariaHiddenId,
      container,
      onModalOpen,
      onModalClose,
    } = modalSettings;
    const { pauseMedia, disableRightClick, fullscreenProps } = mediaSettings;
    const { anchorTarget, relValue } = linkSettings;
    const disableDownload = mediaSettings?.disableDownload || disableRightClick;
    // any of ricos props that should be merged into child
    const isPreview = () => !!(previewContent && !isPreviewExpanded);
    const ricosPropsToMerge: RichContentProps = {
      addAnchors,
      isMobile,
      maxTextLength,
      textToolbarType:
        !isMobile && (textToolbarContainer || useStaticTextToolbar) ? 'static' : 'inline',
      config: {
        getToolbarSettings,
        uiSettings: { disableDownload, linkPanel: linkPanelSettings },
      },
      initialState: previewContent || content,
      placeholder,
      onError,
      helpers: {
        openModal,
        closeModal,
        isPreview,
      },
      disabled: pauseMedia,
      anchorTarget,
      relValue,
      textAlignment,
      onAtomicBlockFocus,
    };

    const mergedRCProps = merge(strategyProps, _rcProps, ricosPropsToMerge, children.props);

    return [
      ...htmls,
      <RicosModal
        ariaHiddenId={ariaHiddenId}
        isModalSuspended={isPreview()}
        container={container}
        fullscreenProps={fullscreenProps}
        {...mergedRCProps}
        key={'ricosElement'}
        onModalOpen={onModalOpen}
        onModalClose={onModalClose}
      >
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </RicosModal>,
    ];
  }
}

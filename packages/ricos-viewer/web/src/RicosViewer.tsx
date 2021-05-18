import React, { Component } from 'react';
import { RicosEngine, shouldRenderChild } from 'ricos-common';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { Version } from 'wix-rich-content-common';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosViewerProps } from './index';
import { getContentSummary } from 'wix-rich-content-common/libs/contentAnalytics';
import TextSelectionToolbarProvider from './textSelectionToolbar/TextSelectionToolbarProvider';

interface State {
  isPreviewExpanded: boolean;
  localeData: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
}

export class RicosViewer extends Component<RicosViewerProps, State> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewerRef!: HTMLElement;

  constructor(props: RicosViewerProps) {
    super(props);
    this.state = {
      isPreviewExpanded: false,
      localeData: { locale: props.locale },
      remountKey: false,
    };
  }

  static defaultProps = { locale: 'en' };

  getLocale = () => {
    const { children, locale } = this.props;
    return children?.props.locale || locale;
  };

  componentDidMount() {
    const { children } = this.props;

    const onViewerLoaded = this.getBiCallback('onViewerLoadedd');
    const isPreview = children?.props.helpers?.isPreview || this.props._rcProps?.helpers?.isPreview;
    const content =
      this.props.content || children?.props.initialState || this.props._rcProps?.initialState;
    const { pluginsCount } = (content && getContentSummary(content)) || {};
    onViewerLoaded?.({
      isPreview: !!isPreview?.(),
      version: Version.currentVersion,
      pluginsCount,
    });
  }

  onPreviewExpand = () => this.setState({ isPreviewExpanded: true });

  getBiCallback = key => {
    const { children, _rcProps } = this.props;
    return children?.props.helpers?.[key] || _rcProps?.helpers?.[key];
  };

  setRef = ref => ref && (this.viewerRef = ref);

  render() {
    const { children, seoSettings, textSelectionToolbar, ...props } = this.props;
    const { isPreviewExpanded, localeData } = this.state;
    const child =
      children && shouldRenderChild('RichContentViewer', children) ? (
        children
      ) : (
        <RichContentViewer />
      );
    const needTextSelectionToolbar = textSelectionToolbar && !this.props.isMobile;
    return [
      <RicosEngine
        key="viewer"
        RicosModal={RicosModal}
        isPreviewExpanded={isPreviewExpanded}
        onPreviewExpand={this.onPreviewExpand}
        isViewer
        {...props}
      >
        {React.cloneElement(child, {
          seoMode: seoSettings,
          setRef: this.setRef,
          ...localeData,
        })}
      </RicosEngine>,
      needTextSelectionToolbar ? (
        <TextSelectionToolbarProvider
          onButtonClick={this.getBiCallback('onViewerAction')}
          container={this.viewerRef}
        />
      ) : null,
    ];
  }
}

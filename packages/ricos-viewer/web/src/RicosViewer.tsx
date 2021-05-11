import React, { Component } from 'react';
import { RicosEngine, shouldRenderChild } from 'ricos-common';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { Version } from 'wix-rich-content-common';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosViewerProps } from './index';
import { getContentSummary } from 'wix-rich-content-common/libs/contentAnalytics';

interface State {
  isPreviewExpanded: boolean;
  localeData: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
}

export class RicosViewer extends Component<RicosViewerProps, State> {
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

    const onViewerLoaded =
      children?.props.helpers?.onViewerLoaded || this.props._rcProps?.helpers?.onViewerLoaded;
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

  render() {
    const { children, seoSettings, ...props } = this.props;
    const { isPreviewExpanded, localeData } = this.state;
    const child =
      children && shouldRenderChild('RichContentViewer', children) ? (
        children
      ) : (
        <RichContentViewer />
      );
    return (
      <RicosEngine
        RicosModal={RicosModal}
        isPreviewExpanded={isPreviewExpanded}
        onPreviewExpand={this.onPreviewExpand}
        isViewer
        {...props}
      >
        {React.cloneElement(child, {
          seoMode: seoSettings,
          ...localeData,
        })}
      </RicosEngine>
    );
  }
}

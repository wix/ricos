import React, { Component } from 'react';
import { RicosEngine, shouldRenderChild } from 'ricos-common';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { Version } from 'wix-rich-content-common';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosViewerProps } from './index';
import { getContentSummary } from 'wix-rich-content-common/libs/contentAnalytics';
import loadable from '@loadable/component';

const TextSelectionToolbar = loadable(() => import('./TextSelectionToolbar'));
interface State {
  isPreviewExpanded: boolean;
  localeData: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
  renderToolbar: boolean;
}

export class RicosViewer extends Component<RicosViewerProps, State> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewerRef!: HTMLElement;

  renderToolbar: boolean;

  constructor(props: RicosViewerProps) {
    super(props);
    this.state = {
      isPreviewExpanded: false,
      localeData: { locale: props.locale },
      remountKey: false,
      renderToolbar: false,
    };
    this.renderToolbar = false;
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

  loadTextSelection = () => {
    const { textSelectionToolbar, isMobile } = this.props;
    const needTextSelectionToolbar = textSelectionToolbar && !isMobile;
    if (needTextSelectionToolbar && !this.state.renderToolbar) {
      TextSelectionToolbar.preload();
      this.setState({ renderToolbar: true });
    }
  };

  render() {
    const { children, seoSettings, ...props } = this.props;
    const { isPreviewExpanded, localeData, renderToolbar } = this.state;
    const child =
      children && shouldRenderChild('RichContentViewer', children) ? (
        children
      ) : (
        <RichContentViewer />
      );
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
          onMouseOver: this.loadTextSelection,
          ...localeData,
        })}
      </RicosEngine>,
      renderToolbar ? (
        <TextSelectionToolbar
          onButtonClick={this.getBiCallback('onViewerAction')}
          container={this.viewerRef}
        />
      ) : null,
    ];
  }
}

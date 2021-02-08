import React, { Component } from 'react';
import { RicosEngine, shouldRenderChild, localeStrategy } from 'ricos-common';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RicosContent, Version } from 'wix-rich-content-common';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosViewerProps } from './index';
import { ensureDraftContent } from 'ricos-content/libs/migrateSchema';
import { compare } from 'ricos-content';

interface State {
  isPreviewExpanded: boolean;
  localeData: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
  draftContent?: RicosContent;
}

export class RicosViewer extends Component<RicosViewerProps, State> {
  constructor(props: RicosViewerProps) {
    super(props);
    this.state = {
      isPreviewExpanded: false,
      localeData: { locale: props.locale },
      remountKey: false,
      draftContent: props.content && ensureDraftContent(props.content),
    };
  }

  static defaultProps = { locale: 'en' };

  updateLocale = async () => {
    const { children, _rcProps } = this.props;
    const locale = children?.props.locale || this.props.locale;
    await localeStrategy(locale, _rcProps?.experiments).then(localeData =>
      this.setState({ localeData, remountKey: !this.state.remountKey })
    );
  };

  componentDidMount() {
    this.updateLocale();
    const { children } = this.props;
    const onViewerLoaded =
      children?.props.helpers?.onViewerLoaded || this.props._rcProps?.helpers?.onViewerLoaded;
    const isPreview = children?.props.helpers?.isPreview || this.props._rcProps?.helpers?.isPreview;
    onViewerLoaded?.(!!isPreview?.(), Version.currentVersion);
  }

  componentWillReceiveProps(newProps: RicosViewerProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
    if (newProps.content) {
      const diff = compare(this.props.content, newProps.content, { ignoredKeys: ['key'] });
      if (Object.keys(diff).length > 0) {
        this.setState({ draftContent: ensureDraftContent(newProps.content) });
      }
    }
  }

  onPreviewExpand = () => this.setState({ isPreviewExpanded: true });

  render() {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { children, seoSettings, content, ...props } = this.props;
    const { isPreviewExpanded, remountKey, localeData, draftContent } = this.state;
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
        key={`viewer-${remountKey}`}
        content={draftContent}
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

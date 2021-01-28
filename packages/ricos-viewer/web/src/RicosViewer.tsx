import React, { Component, Fragment, useEffect, useState } from 'react';
import { RicosEngine, shouldRenderChild, localeStrategy } from 'ricos-common';
import { RichContentViewer } from 'wix-rich-content-viewer';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosViewerProps } from './index';
import { Version } from 'wix-rich-content-common';

interface State {
  isPreviewExpanded: boolean;
  localeStrategy: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
}

export class RicosViewer extends Component<RicosViewerProps, State> {
  constructor(props: RicosViewerProps) {
    super(props);
    this.state = {
      isPreviewExpanded: false,
      localeStrategy: { locale: props.locale },
      remountKey: false,
    };
  }

  static defaultProps = { locale: 'en' };

  updateLocale = async () => {
    const { locale, children } = this.props;
    await localeStrategy(children?.props.locale || locale).then(localeData => {
      this.setState({ localeStrategy: localeData, remountKey: !this.state.remountKey });
    });
  };

  componentDidMount() {
    this.updateLocale();
  }

  componentWillReceiveProps(newProps: RicosViewerProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
  }

  onPreviewExpand = () => this.setState({ isPreviewExpanded: true });

  render() {
    const { children, seoSettings, ...props } = this.props;
    const { isPreviewExpanded, remountKey, localeStrategy } = this.state;
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
        {...props}
      >
        {React.cloneElement(child, {
          seoMode: seoSettings,
          ...localeStrategy,
        })}
      </RicosEngine>
    );
  }
}

const withFullscreenStyles = Component => props => {
  const [isLocal, setLocal] = useState(false);
  // onDidMount: if local env, renders fullscreen inline style, and prevents link render
  useEffect(() => {
    if (window.location.href.includes('localhost')) {
      console.debug('local env detected -- renders fullscreen style tag'); // eslint-disable-line no-console
      import('./fullscreen-styles.css').then(() => setLocal(true));
    }
  }, []);
  const getFullscreenCssUrl = () => {
    const version = Version.currentVersion;
    return `https://static.parastorage.com/unpkg/wix-rich-content-fullscreen@${version}/dist/styles.min.css`;
  };
  return (
    <>
      {!isLocal && <link href={getFullscreenCssUrl()} rel="stylesheet" />}
      <Component {...props} />
    </>
  );
};

export default withFullscreenStyles(RicosViewer);

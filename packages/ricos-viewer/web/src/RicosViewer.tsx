import React, { Component } from 'react';
import { RicosEngine, localeStrategy } from 'ricos-common';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosViewerProps } from './index';
import IoC from './render-infra/ioc-container';
import { ViewerTransitionManager } from './render-infra/types';

interface State {
  isPreviewExpanded: boolean;
  localeStrategy: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
}

export class RicosViewer extends Component<RicosViewerProps, State> {
  transitionManager: ViewerTransitionManager;
  constructor(props: RicosViewerProps) {
    super(props);
    this.transitionManager = IoC.getViewerTransitionManager();
    this.transitionManager.initialize(this.props.children);
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
    const { seoSettings, ...props } = this.props;
    const { isPreviewExpanded, remountKey, localeStrategy } = this.state;
    const child = this.transitionManager.getViewerChild();
    return (
      <RicosEngine
        strategies={this.transitionManager.getViewerStrategies()}
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

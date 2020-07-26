import React, { Component } from 'react';
import { RicosEngine, shouldRenderChild, localeStrategy } from 'ricos-common';
import { RichContentViewer } from 'wix-rich-content-viewer';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { merge } from 'lodash';
import { RicosViewerProps, RichContentProps } from './index';

interface State {
  isPreviewExpanded: boolean;
  localeStrategy: RichContentProps;
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
    const { children, seoSettings, _rcProps, ...props } = this.props;
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
        _rcProps={merge(_rcProps, localeStrategy)}
      >
        {React.cloneElement(child, {
          seoMode: seoSettings,
        })}
      </RicosEngine>
    );
  }
}

import React, { Component } from 'react';
import { RicosEngine, shouldRenderChild } from 'ricos-common';
import { RichContentViewer } from 'wix-rich-content-viewer';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosViewerProps } from './index';

interface State {
  isPreviewExpanded: boolean;
}

export class RicosViewer extends Component<RicosViewerProps, State> {
  constructor(props: RicosViewerProps) {
    super(props);
    this.state = {
      isPreviewExpanded: false,
    };
  }
  onPreviewExpand = () => this.setState({ isPreviewExpanded: true });
  render() {
    const { children, ...props } = this.props;
    const { isPreviewExpanded } = this.state;
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
        key={'viewer'}
        {...props}
      >
        {child}
      </RicosEngine>
    );
  }
}

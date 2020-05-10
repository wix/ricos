import React, { Component } from 'react';
import RicosEngine from './RicosEngine';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { shouldRenderChild } from './utils';

export class RicosViewer extends Component<RicosViewerProps> {
  render() {
    const { children, ...props } = this.props;
    const child =
      children && shouldRenderChild('RichContentViewer', children) ? (
        children
      ) : (
        <RichContentViewer />
      );

    return (
      <RicosEngine isViewer key={'viewer'} {...props}>
        {child}
      </RicosEngine>
    );
  }
}

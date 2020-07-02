import React, { Component } from 'react';
import { RicosEngine, shouldRenderChild } from 'ricos-common';
import { RichContentViewer } from 'wix-rich-content-viewer';
import RicosModal from './modals/RicosModal';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-viewer/dist/styles.min.css';
import 'wix-rich-content-fullscreen/dist/styles.min.css';
import { RicosViewerProps } from './index';

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
      <RicosEngine RicosModal={RicosModal} isViewer key={'viewer'} {...props}>
        {child}
      </RicosEngine>
    );
  }
}

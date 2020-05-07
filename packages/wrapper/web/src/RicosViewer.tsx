import React, { Component, Fragment } from 'react';
import RicosEngine from './RicosEngine';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { shouldRenderChild } from './utils';
import FullscreenProvider from './FullscreenProvider';

export class RicosViewer extends Component<RicosViewerProps> {
  render() {
    const { children, ...props } = this.props;
    const child =
      children && shouldRenderChild('RichContentViewer', children) ? (
        children
      ) : (
        <RichContentViewer />
      );

    const modalityProvider = !child.props.onExpand ? FullscreenProvider : Fragment;

    return (
      <RicosEngine isViewer key={'viewer'} {...props} modalityProvider={modalityProvider}>
        {child}
      </RicosEngine>
    );
  }
}

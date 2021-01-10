import React, { Component } from 'react';
import { mergeStyles, RichContentTheme, ComponentData } from 'wix-rich-content-common';
import styles from '../statics/styles/unsupported-blocks.scss';
import { UnsupportedBlocksPluginViewerConfig } from './types';

interface Props {
  componentData: ComponentData;
  settings: UnsupportedBlocksPluginViewerConfig;
  theme: RichContentTheme;
}

class UnsupportedBlocksViewer extends Component<Props> {
  styles: Record<string, string>;

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return <div>This is my new unsupported-blocks plugin!</div>;
  }
}

export default UnsupportedBlocksViewer;

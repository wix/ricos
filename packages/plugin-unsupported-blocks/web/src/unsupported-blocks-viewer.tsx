import React, { Component } from 'react';
import {
  mergeStyles,
  RichContentTheme,
  ComponentData,
  TranslationFunction,
} from 'wix-rich-content-common';
import styles from '../statics/styles/unsupported-blocks.scss';
import { UnsupportedBlocksPluginEditorConfig } from './types';
import CircleInfoIcon from './icons/CircleInfoIcon';

interface Props {
  componentData: ComponentData;
  settings: UnsupportedBlocksPluginEditorConfig;
  theme: RichContentTheme;
  unsupportedType: string;
  t: TranslationFunction;
}

class UnsupportedBlocksViewer extends Component<Props> {
  styles: Record<string, string>;

  render() {
    const { unsupportedType, t, theme } = this.props;
    const pluginName = t(unsupportedType);
    const unsupportedMessage = t('unsupported_plugin_message');
    this.styles = this.styles || mergeStyles({ styles, theme });

    return (
      <div className={styles.unsupportedBlocks_alert}>
        <CircleInfoIcon />
        <p>
          {pluginName} {unsupportedMessage}
        </p>
      </div>
    );
  }
}

export default UnsupportedBlocksViewer;

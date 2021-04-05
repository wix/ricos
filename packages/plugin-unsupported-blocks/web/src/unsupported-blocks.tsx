import React, { Component } from 'react';
import { mergeStyles, RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import styles from '../statics/styles/unsupported-blocks.scss';
import CircleInfoIcon from './icons/CircleInfoIcon';

interface Props {
  theme: RichContentTheme;
  t: TranslationFunction;
}
class UnsupportedBlocks extends Component<Props> {
  styles!: Record<string, string>;

  render() {
    const { t, theme } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });

    return (
      <div className={styles.unsupportedBlocks_alert}>
        <CircleInfoIcon />
        <div>{t('UnsupportedPlugin_message')}</div>
      </div>
    );
  }
}

export default UnsupportedBlocks;

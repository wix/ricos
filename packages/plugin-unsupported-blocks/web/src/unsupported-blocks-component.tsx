import React from 'react';
import UnsupportedBlocks from './unsupported-blocks';
import { UNSUPPORTED_BLOCKS_TYPE } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from './defaults';
import { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';

interface Props {
  theme: RichContentTheme;
  t: TranslationFunction;
}

class UnsupportedBlocksComponent extends React.Component<Props> {
  static type = { UNSUPPORTED_BLOCKS_TYPE };

  render() {
    const { theme, t } = this.props;
    return <UnsupportedBlocks theme={theme} t={t} />;
  }
}

export { UnsupportedBlocksComponent as Component, DEFAULTS };

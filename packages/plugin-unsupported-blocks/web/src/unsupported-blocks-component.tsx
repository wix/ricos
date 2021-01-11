import React from 'react';
import UnsupportedBlocksViewer from './unsupported-blocks-viewer';
import { UnsupportedBlocksPluginEditorConfig } from './types';
import { UNSUPPORTED_BLOCKS_TYPE } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from './defaults';
import { ComponentData, RichContentTheme, TranslationFunction } from 'wix-rich-content-common';

interface Props {
  componentData: ComponentData;
  settings: UnsupportedBlocksPluginEditorConfig;
  theme: RichContentTheme;
  t: TranslationFunction;
}

class UnsupportedBlocksComponent extends React.Component<Props> {
  static type = { UNSUPPORTED_BLOCKS_TYPE };

  render() {
    const { componentData, settings, theme, t } = this.props;
    return (
      <UnsupportedBlocksViewer
        componentData={componentData}
        settings={settings}
        theme={theme}
        t={t}
      />
    );
  }
}

export { UnsupportedBlocksComponent as Component, DEFAULTS };

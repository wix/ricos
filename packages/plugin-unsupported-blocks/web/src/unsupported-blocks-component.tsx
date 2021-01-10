import React from 'react';
import UnsupportedBlocksViewer from './unsupported-blocks-viewer';
import { UNSUPPORTED_BLOCKS_TYPE, UnsupportedBlocksPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { ComponentData, RichContentTheme } from 'wix-rich-content-common';

interface Props {
  componentData: ComponentData;
  settings: UnsupportedBlocksPluginEditorConfig;
  theme: RichContentTheme;
}

class UnsupportedBlocksComponent extends React.Component<Props> {
  static type = { UNSUPPORTED_BLOCKS_TYPE };
  render() {
    const { componentData, settings, theme } = this.props;
    return (
      <UnsupportedBlocksViewer componentData={componentData} settings={settings} theme={theme} />
    );
  }
}

export { UnsupportedBlocksComponent as Component, DEFAULTS };

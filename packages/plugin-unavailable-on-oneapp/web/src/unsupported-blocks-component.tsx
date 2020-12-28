import React from 'react';
import UnsupportedBlocksViewer from './unsupported-blocks-viewer';
import { UNSUPPORTED_BLOCKS_TYPE, UnsupportedBlocksPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { ComponentData, RichContentTheme } from 'wix-rich-content-common';

interface Props {
  componentData: ComponentData;
  settings: UnsupportedBlocksPluginEditorConfig;
  theme: RichContentTheme;
  blockProps: {
    unsupportedType: string;
  };
}

class UnsupportedBlocksComponent extends React.Component<Props> {
  static type = { UNSUPPORTED_BLOCKS_TYPE };
  render() {
    const { componentData, settings, theme, blockProps } = this.props;
    const { unsupportedType } = blockProps;
    return (
      <UnsupportedBlocksViewer
        componentData={componentData}
        settings={settings}
        theme={theme}
        unsupportedType={unsupportedType}
      />
    );
  }
}

export { UnsupportedBlocksComponent as Component, DEFAULTS };

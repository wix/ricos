// import React from 'react';
// import UnsupportedBlocksViewer from './unsupported-blocks-viewer';
// import { UnsupportedBlocksPluginEditorConfig } from './types';
// import { UNSUPPORTED_BLOCKS_TYPE } from 'wix-rich-content-plugin-commons';
// import { DEFAULTS } from './defaults';
// import { ComponentData, RichContentTheme, TranslationFunction } from 'wix-rich-content-common';

// interface Props {
//   componentData: ComponentData;
//   settings: UnsupportedBlocksPluginEditorConfig;
//   theme: RichContentTheme;
//   t: TranslationFunction;
//   blockProps: {
//     unsupportedType: string;
//   };
// }

// class UnsupportedBlocksComponent extends React.Component<Props> {
//   static type = { UNSUPPORTED_BLOCKS_TYPE };
//   render() {
//     const { componentData, settings, theme, blockProps, t } = this.props;
//     const { unsupportedType } = blockProps;
//     return (
//       <UnsupportedBlocksViewer
//         componentData={componentData}
//         settings={settings}
//         theme={theme}
//         t={t}
//         unsupportedType={unsupportedType}
//       />
//     );
//   }
// }

// export { UnsupportedBlocksComponent as Component, DEFAULTS };

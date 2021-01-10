// import { DEFAULTS } from '../unsupported-blocks-component';
// import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
// import InsertPluginIcon from '../icons/InsertPluginIcon';
// import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
// import { UnsupportedBlocksPluginEditorConfig } from '../types';

// const createInsertButtons: CreateInsertButtons = ({
//   t,
//   settings,
// }: {
//   t: TranslationFunction;
//   settings: UnsupportedBlocksPluginEditorConfig;
// }) => {
//   const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
//   return [
//     {
//       type: BUTTON_TYPES.BUTTON,
//       name: 'unsupported-blocks_InsertButton',
//       getLabel: () => t('unsupported-blocks_InsertButton'),
//       tooltip: t('unsupported-blocks_Tooltip'),
//       getIcon: () => icon,
//       isActive: () => false,
//       isDisabled: () => false,
//       componentData: DEFAULTS,
//       toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
//     },
//   ];
// };
// export default createInsertButtons;

// import { DEFAULTS } from '../unavailable-on-oneapp-component';
// import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
// import InsertPluginIcon from '../icons/InsertPluginIcon';
// import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
// import { UnavailableOnOneAppPluginEditorConfig } from '../types';

// const createInsertButtons: CreateInsertButtons = ({
//   t,
//   settings,
// }: {
//   t: TranslationFunction;
//   settings: UnavailableOnOneAppPluginEditorConfig;
// }) => {
//   const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
//   return [
//     {
//       type: BUTTON_TYPES.BUTTON,
//       name: 'unavailable on oneapp',
//       getLabel: () => t('unavailableononeapp_InsertButton'),
//       tooltip: t('unavailableononeapp_Tooltip'),
//       getIcon: () => icon,
//       isActive: () => false,
//       isDisabled: () => false,
//       componentData: DEFAULTS,
//       toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
//     },
//   ];
// };
// export default createInsertButtons;

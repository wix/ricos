import { TOOLBARS } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';

export default ({ helpers, t, settings, UndoButton, RedoButton }) => {
  const undoIcon = settings?.toolbar?.icons?.Undo || UndoIcon;
  const redoIcon = settings?.toolbar?.icons?.Redo || RedoIcon;
  return [
    {
      type: 'undo-redo',
      name: t('Mobile_UndoPlugin_InsertButton'),
      tooltipText: t('Undo Button'),
      toolbars: [TOOLBARS.FOOTER],
      Icon: undoIcon,
      componentData: {},
      wrappingComponent: UndoButton,
      helpers,
      t,
    },
    {
      type: 'undo-redo',
      name: t('Mobile_RedoPlugin_InsertButton'),
      tooltipText: t('Redo Button'),
      toolbars: [TOOLBARS.FOOTER],
      Icon: redoIcon,
      componentData: {},
      wrappingComponent: RedoButton,
      helpers,
      t,
    },
  ];
};

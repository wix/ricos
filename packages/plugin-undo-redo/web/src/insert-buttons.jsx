import { TOOLBARS } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';

export default ({ helpers, t, settings, UndoButton, RedoButton }) => {
  const undoIcon = settings?.toolbar?.icons?.Undo || UndoIcon;
  const redoIcon = settings?.toolbar?.icons?.Redo || RedoIcon;
  return [
    {
      type: 'undo-redo',
      name: 'Undo',
      tooltipText: t('Undo Button'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: undoIcon,
      componentData: {},
      wrappingComponent: UndoButton,
      helpers,
      t,
    },
    {
      type: 'undo-redo',
      name: 'Redo',
      tooltipText: t('Redo Button'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: redoIcon,
      componentData: {},
      wrappingComponent: RedoButton,
      helpers,
      t,
    },
  ];
};

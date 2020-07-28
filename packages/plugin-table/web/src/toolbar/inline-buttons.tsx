import { BUTTONS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { CreateInlineButtons } from 'wix-rich-content-common';
import { addColumn, addRow } from '../tableUtils';

const createInlineButtons: CreateInlineButtons<
  'settings' | 'isMobile' | 't' | 'getEditorState' | 'setEditorState'
> = ({ getEditorState, setEditorState }) => {
  return [
    {
      keyName: 'delete',
      type: BUTTONS.DELETE,
      mobile: true,
    },
    {
      keyName: 'addCol',
      type: BUTTONS.CUSTOM,
      icon: InsertPluginIcon,
      onClick: () => {
        const editorState = getEditorState();
        setEditorState(addColumn(editorState));
      },
      mobile: true,
      desktop: true,
      tooltipTextKey: 'Add a column',
    },
    {
      keyName: 'addRow',
      type: BUTTONS.CUSTOM,
      icon: InsertPluginIcon,
      onClick: () => {
        const editorState = getEditorState();
        setEditorState(addRow(editorState));
      },
      mobile: true,
      desktop: true,
      tooltipTextKey: 'Add a row',
    },
  ];
};

export default createInlineButtons;

import { translate } from 'react-i18next';
import { BUTTONS } from 'wix-rich-content-common';
import EditIcon from '../icons/edit.svg';
import EditPanel from './HtmlEditPanel';

export default () => {
  return [
    {
      keyName: 'edit',
      type: BUTTONS.INLINE_PANEL,
      panelContent: translate(null)(EditPanel),
      icon: EditIcon,
      tooltipTextKey: 'EditButton_Tooltip',
    },
    { type: BUTTONS.SEPARATOR },
    { type: BUTTONS.WIDTH, min: 35, max: 940 },
    { type: BUTTONS.HEIGHT, min: 35, max: 1200 },
    { type: BUTTONS.SEPARATOR },
    { type: BUTTONS.ALIGNMENT_LEFT },
    { type: BUTTONS.ALIGNMENT_CENTER },
    { type: BUTTONS.ALIGNMENT_RIGHT },
    { type: BUTTONS.SEPARATOR },
    { type: BUTTONS.DELETE, keyName: 'delete', mobile: true },
  ];
};
